import { describe, expect, it } from "vitest";

import { md2html } from "../src/md2html.js";

describe("Markdown level to HTML element", () => {
  it("converts a level-1 heading to <h1> [R-H-01]", () => {
    expect(md2html("# Hello")).toBe("<h1>Hello</h1>");
  });

  it("converts a level-2 heading to <h2> [R-H-01]", () => {
    expect(md2html("## Hello")).toBe("<h2>Hello</h2>");
  });
});
