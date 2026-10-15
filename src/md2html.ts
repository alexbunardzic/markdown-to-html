/**
 * Converts Markdown text to HTML.
 *
 * See `md2html-SPEC.md` — that document is the specification, and every
 * behaviour here must be traceable to a numbered rule in it.
 *
 * Implemented so far: R-H-01 (level mapping), R-H-02 (a space must
 * follow the hash run), R-H-11 (at most three leading spaces allowed),
 * R-ESC-01 (ampersand escaped in paragraph text),
 * E-10 (less-than / greater-than escaped in heading text),
 * E-12 (double-quote escaped in heading text).
 * Anything that is not a heading falls back to a paragraph.
 */
const MAX_HEADING_INDENT = 3;
const LINE_TERMINATORS = ["\r", "\u2028", "\u2029"];

export function md2html(markdown: string): string {
  return markdown
    .split("\n")
    .map(stripTrailingCarriageReturn)
    .filter((line) => line.trim() !== "")
    .map(convertLine)
    .join("");
}

function stripTrailingCarriageReturn(line: string): string {
  return line.endsWith("\r") ? line.slice(0, -1) : line;
}

type Heading = { readonly level: number; readonly text: string };

function parseHeading(line: string): Heading | null {
  const indent = countRun({ text: line, from: 0, char: " " });
  if (indent > MAX_HEADING_INDENT) {
    return null;
  }

  const level = countRun({ text: line, from: indent, char: "#" });
  const spacePosition = indent + level;
  if (level === 0 || line[spacePosition] !== " ") {
    return null;
  }

  const text = line.slice(spacePosition + 1);
  if (LINE_TERMINATORS.some((terminator) => text.includes(terminator))) {
    return null;
  }

  return { level, text };
}

type CountRunOptions = { text: string; from: number; char: string };

function countRun({ text, from, char }: CountRunOptions): number {
  let end = from;
  while (text[end] === char) {
    end++;
  }
  return end - from;
}

function convertLine(line: string): string {
  const heading = parseHeading(line);
  if (heading === null) {
    return `<p>${escapeHtml(line)}</p>`;
  }

  return `<h${heading.level}>${escapeHtml(heading.text)}</h${heading.level}>`;
}

/** Escapes characters that carry meaning in HTML. */
function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")   // R-ESC-01 — must come first
    .replaceAll("<", "&lt;")    // E-10
    .replaceAll(">", "&gt;")    // E-10
    .replaceAll('"', "&quot;"); // E-12
}
