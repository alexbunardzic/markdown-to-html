import { describe, expect, it } from "vitest";

import { md2html } from "../src/md2html.js";

describe("Markdown level to HTML element", () => {
  it("converts a level-1 heading to <h1> [R-H-01]", () => {
    expect(md2html("# Hello")).toBe("<h1>Hello</h1>");
  });

  it("converts a level-2 heading to <h2> [R-H-01]", () => {
    expect(md2html("## Hello")).toBe("<h2>Hello</h2>");
  });

  it("converts a level-3 heading to <h3> [R-H-01]", () => {
    expect(md2html("### Hello")).toBe("<h3>Hello</h3>");
  });

  it("converts a level-4 heading to <h4> [R-H-01]", () => {
    expect(md2html("#### Hello")).toBe("<h4>Hello</h4>");
  });

  it("converts a level-5 heading to <h5> [R-H-01]", () => {
    expect(md2html("##### Hello")).toBe("<h5>Hello</h5>");
  });

  it("converts a level-6 heading to <h6> [R-H-01]", () => {
    expect(md2html("###### Hello")).toBe("<h6>Hello</h6>");
  });
});

describe("Long runs of hashes", () => {
  // NOTE: this contradicts R-H-03 / E-01, which require a paragraph here.
  // Documents current behaviour at the mob's direction; the spec has not
  // been amended.
  it("maps fifteen hashes to <h15>", () => {
    expect(md2html("############### Hello")).toBe("<h15>Hello</h15>");
  });
});

describe("Exactly one space required after the hashes", () => {
  it("treats a hash run with no following space as a paragraph [R-H-02, E-02]", () => {
    expect(md2html("#Foo")).toBe("<p>#Foo</p>");
  });
});

describe("Hashes must start the line", () => {
  it("treats a hash run inside a line as a paragraph [R-H-01]", () => {
    expect(md2html("a # b")).toBe("<p>a # b</p>");
  });
});

describe("A heading occupies exactly one line", () => {
  it("converts a heading followed immediately by a paragraph [R-H-08, E-14]", () => {
    expect(md2html("# Title\nParagraph")).toBe("<h1>Title</h1><p>Paragraph</p>");
  });
});

describe("Blank lines separate blocks", () => {
  it("emits no element for a blank line between blocks", () => {
    expect(md2html("# A\n\n# B")).toBe("<h1>A</h1><h1>B</h1>");
  });
});
