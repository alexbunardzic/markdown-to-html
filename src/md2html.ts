/**
 * Converts Markdown text to HTML.
 *
 * See `md2html-SPEC.md` — that document is the specification, and every
 * behaviour here must be traceable to a numbered rule in it.
 *
 * Implemented so far: R-H-01 (level mapping), R-H-02 (a space must
 * follow the hash run), R-H-11 (at most three leading spaces allowed),
 * R-ESC-01 (ampersand escaped in paragraph text),
 * E-10 (less-than / greater-than escaped in heading text).
 * Anything that is not a heading falls back to a paragraph.
 */
const HEADING = /^ {0,3}(#+) (.*)$/;

export function md2html(markdown: string): string {
  const match = HEADING.exec(markdown);
  if (match === null) {
    return `<p>${escapeHtml(markdown)}</p>`;
  }

  const [, hashes = "", text = ""] = match;
  const level = hashes.length;
  return `<h${level}>${escapeHtml(text)}</h${level}>`;
}

/** Escapes characters that carry meaning in HTML. */
function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")   // R-ESC-01 — must come first
    .replaceAll("<", "&lt;")    // E-10
    .replaceAll(">", "&gt;");   // E-10
}
