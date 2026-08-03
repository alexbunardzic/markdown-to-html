# `md2html` — Specification

A converter that takes Markdown text and produces HTML.

This specification defines **what the output must be**, not how to produce it.
Every behavioural claim below is stated precisely enough that a test can be
derived from it and a reviewer can check the test against it.

## How this document is used

- **Tests derive from this document.** Every test should be traceable to a
  numbered section or a stated edge case. A test asserting behaviour not
  specified here is either testing an implementation detail or the spec needs
  amending — decide which, in review.
- **This document is a protected artefact** (see `practice.json`). Changing it
  requires the same review as changing a specification, because it *is* the
  specification.
- **If an implementation and this document disagree, this document is
  correct** until the mob amends it. Amend first, then change the code.

## Out of scope

The following Markdown features are **not** handled by `md2html`. The converter
makes no promise about how they are treated — they may pass through as raw text,
produce garbled output, or be silently dropped. Do not write tests that depend
on their behaviour.

- **Ordered lists** — `1. item`, `2. item`, …
- **Block quotes** — lines prefixed with `>`
- **Fenced code blocks** — triple-backtick or tilde fences (` ``` ` / `~~~`)
- **Tables** — pipe-delimited GFM table syntax
- **Images** — `![alt](url)` syntax
- **Reference-style links** — `[text][id]` with a separate `[id]: url` definition
- **Horizontal rules** — `---`, `***`, or `___` on their own line
- **HTML block passthrough** — raw HTML blocks embedded in the source
- **Footnotes** — `[^label]` / `[^label]: …` syntax
- **Autolinks** — bare URLs or angle-bracket autolinks (`<https://example.com>`)
- **Hard line breaks** — two trailing spaces before a newline
- **Setext headings** — headings underlined with `===` or `---`
