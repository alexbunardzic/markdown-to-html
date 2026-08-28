/**
 * Converts Markdown text to HTML.
 *
 * See `md2html-SPEC.md` — that document is the specification, and every
 * behaviour here must be traceable to a numbered rule in it.
 *
 * Implemented so far: R-H-01 (level mapping) and R-H-02 (a space must
 * follow the hash run). Anything that is not a heading falls back to a
 * paragraph.
 */
const HEADING = /^(#+) (.*)$/;

export function md2html(markdown: string): string {
  const match = HEADING.exec(markdown);
  if (match === null) {
    return `<p>${markdown}</p>`;
  }

  const [, hashes = "", text = ""] = match;
  const level = hashes.length;
  return `<h${level}>${text}</h${level}>`;
}
