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
