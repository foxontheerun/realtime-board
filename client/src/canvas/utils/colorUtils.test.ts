import { describe, it, expect } from "vitest";
import { adjustHexBrightness, hexToRgba } from "./colorUtils";

describe("adjustHexBrightness", () => {
  it("returns the color unchanged at 0%", () => {
    expect(adjustHexBrightness("#808080", 0)).toBe("#808080");
  });

  it("darkens to black at 100%", () => {
    expect(adjustHexBrightness("#808080", 100, "darken")).toBe("#000000");
  });

  it.todo("clamps channels at 255 when lightening (#ffffff stays #ffffff)");
  it.todo("expands shorthand #fff to #ffffff");
  it.todo("strips the alpha channel from #rrggbbaa");
  it.todo("parses rgb(128,128,128) the same as #808080");
  it.todo("returns invalid input ('hello') unchanged");
  it.todo("returns an incomplete hex ('#12') unchanged");
});

describe("hexToRgba", () => {
  it("converts #ff0000 to rgba with alpha 1 by default", () => {
    expect(hexToRgba("#ff0000")).toBe("rgba(255, 0, 0, 1)");
  });

  it.todo("forwards the given alpha");
  it.todo("works without a leading '#'");
  it.todo("expands shorthand #0f0");
  it.todo("alpha from #rrggbbaa overrides the alpha argument");
});
