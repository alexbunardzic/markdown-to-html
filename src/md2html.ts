/**
 * Converts Markdown text to HTML.
 *
 * See `md2html-SPEC.md` — that document is the specification, and every
 * behaviour here must be traceable to a numbered rule in it.
 *
 * Implemented so far: R-H-01, level 1 only.
 */
export function md2html(markdown: string): string {
  const text = markdown.slice("# ".length);
  return `<h1>${text}</h1>`;
}
