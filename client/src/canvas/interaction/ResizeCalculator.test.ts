import { describe, it, expect } from "vitest";
import { ResizeCalculator } from "./ResizeCalculator";
import { ResizeHandles } from "../entities";
import type { _Shape } from "../entities";

// worldPoint is a delta (dx, dy) in world coordinates, not an absolute point.
const baseShape = (): _Shape => ({
  id: "1",
  x: 100,
  y: 100,
  width: 200,
  height: 100,
  fill: "#ffffff",
  stroke: "#000000",
  state: "static",
  type: "RECT",
});

describe("ResizeCalculator.resize", () => {
  it("Right grows width by dx and leaves the rest", () => {
    const result = ResizeCalculator.resize(baseShape(), ResizeHandles.Right, {
      x: 50,
      y: 0,
    });

    expect(result.width).toBe(250);
    expect(result.x).toBe(100);
    expect(result.y).toBe(100);
    expect(result.height).toBe(100);
  });

  it("Left moves x and shrinks width", () => {
    const result = ResizeCalculator.resize(baseShape(), ResizeHandles.Left, {
      x: 50,
      y: 0,
    });

    expect(result.x).toBe(150);
    expect(result.width).toBe(150);
  });

  it.todo("Bottom grows height by dy");
  it.todo("Top moves y and shrinks height");
  it.todo("TopLeft changes x, y, width and height at once");
  it.todo("TopRight changes y, height and width (not x)");
  it.todo("BottomLeft changes x, width and height (not y)");
  it.todo("BottomRight changes width and height (not x, y)");

  it.todo("does not mutate the original shape");
  it.todo("returns an equal shape for a zero delta");
  it.todo("documents that a negative delta can drive width below 0");
});

describe("ResizeCalculator.getShapeManipulationBounds", () => {
  it.todo("RECT bounds match the shape's x/y/width/height");
});
