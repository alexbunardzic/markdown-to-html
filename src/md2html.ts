/**
 * Converts Markdown text to HTML.
 *
 * See `md2html-SPEC.md` — that document is the specification, and every
 * behaviour here must be traceable to a numbered rule in it.
 *
 * Implemented so far: R-H-01 (level mapping), R-H-02 (a space must follow
 * the hash run) and R-H-08 (a heading is one line). Anything that is not a
 * heading falls back to a paragraph.
 */
const HEADING_PREFIX = /^#+ /;

export function md2html(markdown: string): string {
  return markdown
    .split("\n")
    .filter((line) => line !== "")
    .map(convertLine)
    .join("");
}

function convertLine(line: string): string {
  const prefix = HEADING_PREFIX.exec(line)?.[0];
  if (prefix === undefined) {
    return `<p>${line}</p>`;
  }

  const level = prefix.length - 1;
  const text = line.slice(prefix.length);
  return `<h${level}>${text}</h${level}>`;
}
