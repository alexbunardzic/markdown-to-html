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

## Scope

The following Markdown structures are **in scope** and must be converted to
their HTML equivalents by `md2html`:

- **ATX headings** — `#` through `######` → `<h1>` … `<h6>`
- **Paragraphs** — blank-line-separated blocks of text → `<p>`
- **Unordered lists** — lines prefixed with `-`, `*`, or `+` → `<ul>` / `<li>`
- **Inline code** — backtick-wrapped spans → `<code>`
- **Bold** — `**text**` or `__text__` → `<strong>`
- **Italic** — `*text*` or `_text_` → `<em>`
- **Inline links** — `[text](url)` → `<a href="url">`
- **Escaping and HTML safety**

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

---

## Feature specs

---

### 1. ATX Headings

An ATX heading is a line that begins with one to six `#` characters followed
by at least one space and then heading text. The converter maps each level to
its HTML counterpart:

| Markdown level | HTML element |
|----------------|--------------|
| `#`            | `<h1>`       |
| `##`           | `<h2>`       |
| `###`          | `<h3>`       |
| `####`         | `<h4>`       |
| `#####`        | `<h5>`       |
| `######`       | `<h6>`       |

#### Input / Output table

| # | Input (Markdown)      | Expected output (HTML)                              |
|---|-----------------------|-----------------------------------------------------|
| 1 | `# Hello`             | `<h1>Hello</h1>`                                    |
| 2 | `## Hello`            | `<h2>Hello</h2>`                                    |
| 3 | `### Hello`           | `<h3>Hello</h3>`                                    |
| 4 | `#### Hello`          | `<h4>Hello</h4>`                                    |
| 5 | `##### Hello`         | `<h5>Hello</h5>`                                    |
| 6 | `###### Hello`        | `<h6>Hello</h6>`                                    |
| 7 | `# Hello World`       | `<h1>Hello World</h1>`                              |
| 8 | `## Café & Résumé`    | `<h2>Café &amp; Résumé</h2>`                        |
| 9 | `# Say <b>hi</b>`     | `<h1>Say &lt;b&gt;hi&lt;/b&gt;</h1>`                |

#### Normative rules

**R-H-01 — Level mapping**
Each sequence of one to six uninterrupted `#` characters at the start of a
line, followed by one or more spaces, followed by non-empty text, MUST produce
the corresponding `<h1>` – `<h6>` element wrapping that text.

**R-H-02 — Exactly one space required**
The `#` sequence MUST be followed by at least one ASCII space (U+0020) before
the heading text. Input where the `#` sequence is immediately followed by a
non-space character (e.g. `#Hello`) MUST NOT be treated as a heading; it MUST
be treated as a paragraph.

**R-H-03 — Seven or more hashes are not headings**
A line beginning with seven or more consecutive `#` characters MUST NOT
produce a heading element. It MUST be treated as a paragraph regardless of
what follows.

**R-H-04 — Leading and trailing whitespace stripped**
The heading text MUST be trimmed of leading and trailing ASCII whitespace
before being placed inside the element. `#   Hello   ` produces
`<h1>Hello</h1>`, not `<h1>   Hello   </h1>`.

**R-H-05 — Trailing hashes stripped**
If the heading text ends with one or more `#` characters optionally preceded
by spaces, those trailing `#` characters and their preceding spaces MUST be
stripped. `## Foo ##` produces `<h2>Foo</h2>`. `## Foo ###` also produces
`<h2>Foo</h2>`. `## Foo#` does NOT strip the `#` because it is not preceded
by a space — it produces `<h2>Foo#</h2>`.

**R-H-06 — HTML special characters escaped**
Characters that carry meaning in HTML MUST be escaped in the heading text
before output:

| Character | Escaped form |
|-----------|--------------|
| `&`       | `&amp;`      |
| `<`       | `&lt;`       |
| `>`       | `&gt;`       |
| `"`       | `&quot;`     |

**R-H-07 — Empty heading text is not a heading**
A line that consists solely of `#` characters and optional whitespace — with
no heading text after trimming — MUST NOT produce a heading element. It MUST
be treated as a paragraph (or empty line, whichever the paragraph rule
dictates).

**R-H-08 — Heading occupies exactly one line**
A heading is always a single line. The content ends at the newline character.
There is no multi-line heading syntax in scope for `md2html`.
When multiple lines are present, each line is converted to its own HTML element
and the resulting elements are concatenated without any separator between them.

**R-H-09 — No inline markup processed inside headings (current scope)**
Inline formatting features (bold, italic, inline code, links) inside heading
text are out of scope for this rule. Their handling is governed by the
respective inline-feature rules. A heading test MUST NOT assert anything about
the rendering of inline markup within heading text.

**R-H-10 — Setext headings are out of scope**
Underline-style headings (`===` / `---` on the following line) are explicitly
out of scope for `md2html` (see § Out of scope above). No test should rely on
setext behaviour.

**R-H-11 — At most three leading spaces allowed before the hash run**
A heading line MAY be preceded by up to three ASCII spaces (U+0020). If the
line has four or more leading spaces before the `#` run, it MUST NOT be treated
as a heading; it MUST be treated as a paragraph. `   # Hello` (three spaces)
produces `<h1>Hello</h1>`. `    # Hello` (four spaces) produces
`<p>    # Hello</p>`.

#### Edge cases

Each row is normative and must have at least one corresponding test.

| #    | Edge case description                              | Input example        | Expected output                      | Rule    |
|------|----------------------------------------------------|----------------------|--------------------------------------|---------|
| E-01 | Seven hashes — not a heading                       | `####### Foo`        | `<p>####### Foo</p>`                 | R-H-03  |
| E-02 | No space after hash — not a heading                | `#Foo`               | `<p>#Foo</p>`                        | R-H-02  |
| E-03 | Only hashes, no text — not a heading               | `###`                | `<p>###</p>`                         | R-H-07  |
| E-04 | Hashes and spaces, no text — not a heading         | `###   `             | treated as empty/paragraph           | R-H-07  |
| E-05 | Leading spaces in heading text stripped            | `#   Hello`          | `<h1>Hello</h1>`                     | R-H-04  |
| E-06 | Trailing spaces in heading text stripped           | `# Hello   `         | `<h1>Hello</h1>`                     | R-H-04  |
| E-07 | Trailing hashes with preceding space stripped      | `## Foo ##`          | `<h2>Foo</h2>`                       | R-H-05  |
| E-08 | Trailing hashes without preceding space kept       | `## Foo##`           | `<h2>Foo##</h2>`                     | R-H-05  |
| E-09 | Ampersand escaped                                  | `# A & B`            | `<h1>A &amp; B</h1>`                 | R-H-06  |
| E-10 | Less-than escaped                                  | `# <script>`         | `<h1>&lt;script&gt;</h1>`            | R-H-06  |
| E-11 | Greater-than escaped                               | `# a > b`            | `<h1>a &gt; b</h1>`                  | R-H-06  |
| E-12 | Double-quote escaped                               | `# Say "hi"`         | `<h1>Say &quot;hi&quot;</h1>`        | R-H-06  |
| E-13 | All six levels present in one document             | `# A` … `###### F`   | `<h1>A</h1>` … `<h6>F</h6>`         | R-H-01  |
| E-14 | Heading followed immediately by paragraph          | `# Title\nParagraph` | `<h1>Title</h1><p>Paragraph</p>`     | R-H-08  |
| E-15 | Hash inside heading text is kept                   | `# C# language`      | `<h1>C# language</h1>`               | R-H-05  |
| E-16 | Multiple spaces between `#` and text               | `#     Foo`          | `<h1>Foo</h1>`                       | R-H-04  |
| E-17 | Heading text that is a single character            | `# X`                | `<h1>X</h1>`                         | R-H-01  |
| E-18 | Heading text with only digits                      | `# 42`               | `<h1>42</h1>`                        | R-H-01  |

---

### 2. Special character escaping

Text that is emitted into the HTML output must not be able to change the
document's structure. Characters that carry meaning in HTML are replaced with
their entity form.

#### Normative rules

**R-ESC-01 — Ampersand escaped in paragraph text**
Every `&` in paragraph text MUST be emitted as `&amp;`. `Cats & dogs`
produces `<p>Cats &amp; dogs</p>`.

The remaining HTML special characters (`<`, `>`, `"`) are not yet covered by a
normative rule for paragraphs; see R-H-06 for the heading case.
