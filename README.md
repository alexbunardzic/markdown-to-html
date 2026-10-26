# markdown-to-html

`md2html` is a small TypeScript function that converts Markdown text to HTML.
It covers a deliberately limited subset of Markdown, defined in
[`md2html-SPEC.md`](md2html-SPEC.md).

The project is built test-first by a mob, one rule at a time. The commit history
shows each rule as a failing test followed by the code that makes it pass.

## Usage

```ts
import { md2html } from "./src/md2html.js";

md2html("# Title\nCats & dogs");
// => "<h1>Title</h1><p>Cats &amp; dogs</p>"
```

The function takes a string and returns a string. Output elements are concatenated
with no separators or newlines. There is no command-line tool and no npm package.

## What is implemented

| Feature | Rules | Status |
|---|---|---|
| ATX headings `#` … `######` → `<h1>` … `<h6>` | R-H-01 | Done |
| Space required after the `#` run | R-H-02 | Done |
| Up to three leading spaces before `#` | R-H-11 | Done |
| Escape `&`, `<`, `>`, `"` | R-H-06 | Done |
| Heading followed by a paragraph | R-H-08, E-14 | Done |
| Blank lines separate paragraphs | R-P-01 | Done |
| Whitespace-only lines produce no output | R-P-02 | Done |
| Seven or more `#` is not a heading | R-H-03 | Not yet |
| Trim heading text; strip trailing `#` | R-H-04, R-H-05 | Not yet |
| Unordered lists, inline code, bold, italic, links | — | Not yet specified in detail |

Any line that is not a heading becomes its own `<p>` element.

The spec also lists features that are out of scope, such as ordered lists,
fenced code blocks, tables, and images. Their output is undefined.

## Getting started

Requires Node.js and npm.

```sh
npm install
npm test              # run the tests once
npm run test:watch    # rerun tests on change
npm run typecheck     # type-check with tsc
npm run mutate        # mutation testing with Stryker; report in reports/mutation/
```

## Project layout

| Path | Purpose |
|---|---|
| `md2html-SPEC.md` | The specification. Every behaviour has a numbered rule. |
| `src/md2html.ts` | The implementation. |
| `tests/md2html.test.ts` | Tests. Each test names the rule it checks, e.g. `[R-H-01]`. |
| `practice.json` | Team working rules: protected files and commit attestation. |
| `stryker.config.json` | Mutation testing configuration. |

## How changes are made

1. **The spec comes first.** If the code and `md2html-SPEC.md` disagree, the spec is
   correct. To change behaviour, amend the spec, then write a failing test, then change
   the code.
2. **Every test traces to the spec.** A test names a rule (`R-…`) or edge case (`E-…`).
   A test for behaviour the spec does not describe means either the test is wrong or the
   spec needs amending.
3. **Some files are protected.** `practice.json` marks `tests/**`, `spec/**`, and
   `practice.json` as protected. Changing them requires the same review as changing
   the spec.
4. **Agent contributions are declared.** When an AI agent contributed materially to a
   commit (see `practice.json` for the definition), the commit message ends with:

   ```
   Agent-Authored: true
   Tool: <tool-slug>
   Model: <model-slug>
   ```

   Commits with no material agent contribution carry no trailer.

## Known gaps

- A test asserts that fifteen `#` characters produce `<h15>`. This contradicts R-H-03,
  which requires a paragraph. The test records current behaviour; the spec has not been
  amended.
- Tests cite edge cases E-19 and E-20, which are not yet in the spec's edge-case table.
