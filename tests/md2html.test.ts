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

describe("All six heading levels in one document [R-H-01]", () => {
  it("converts each heading level when all six appear in the same text", () => {
    const input = [
      "# Heading One",
      "## Heading Two",
      "### Heading Three",
      "#### Heading Four",
      "##### Heading Five",
      "###### Heading Six",
    ].join("\n");

    const expected = [
      "<h1>Heading One</h1>",
      "<h2>Heading Two</h2>",
      "<h3>Heading Three</h3>",
      "<h4>Heading Four</h4>",
      "<h5>Heading Five</h5>",
      "<h6>Heading Six</h6>",
    ].join("\n");

    expect(md2html(input)).toBe(expected);
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

describe("Special character escaping", () => {
  it("escapes an ampersand as &amp; in a paragraph [R-ESC-01]", () => {
    expect(md2html("Cats & dogs")).toBe("<p>Cats &amp; dogs</p>");
  });

  it("escapes less-than signs as &lt; in a heading [E-10]", () => {
    expect(md2html("# <script>")).toBe("<h1>&lt;script&gt;</h1>");
  });

  it("escapes double quotes as &quot; in a heading [E-12]", () => {
    expect(md2html('# Say "hi"')).toBe("<h1>Say &quot;hi&quot;</h1>");
  });
});

describe("Leading spaces before the hash run [R-H-11]", () => {
  it("treats four leading spaces before # as a paragraph [E-20]", () => {
    expect(md2html("    # Hello")).toBe("<p>    # Hello</p>");
  });

  it("strips three leading spaces and treats as a heading [E-19]", () => {
    expect(md2html("   # Hello")).toBe("<h1>Hello</h1>");
  });
});
