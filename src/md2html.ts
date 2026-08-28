/**
 * Converts Markdown text to HTML.
 *
 * See `md2html-SPEC.md` — that document is the specification, and every
 * behaviour here must be traceable to a numbered rule in it.
 *
 * Implemented so far: R-H-01, levels 1 and 2.
 */
export function md2html(markdown: string): string {
  const hashes = markdown.slice(0, markdown.indexOf(" "));
  const level = hashes.length;
  const text = markdown.slice(hashes.length + 1);
  return `<h${level}>${text}</h${level}>`;
}
