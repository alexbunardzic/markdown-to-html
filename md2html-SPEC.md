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
