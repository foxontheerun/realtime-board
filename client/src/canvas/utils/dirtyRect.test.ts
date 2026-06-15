import { describe, it, expect } from "vitest";
import { unionRects, selectionBoxToRect } from "./dirtyRect";

describe("unionRects", () => {
  it("covers two disjoint rectangles", () => {
    const a = { x: 0, y: 0, w: 10, h: 10 };
    const b = { x: 20, y: 20, w: 10, h: 10 };
    expect(unionRects(a, b)).toEqual({ x: 0, y: 0, w: 30, h: 30 });
  });

  it.todo("leaves the outer rect unchanged when one contains the other");
  it.todo("is commutative: union(a, b) === union(b, a)");
});

describe("selectionBoxToRect", () => {
  it("adds 4px padding when dragging right and down", () => {
    const rect = selectionBoxToRect({
      startX: 10,
      startY: 10,
      currentX: 110,
      currentY: 60,
    });
    expect(rect).toEqual({ x: 6, y: 6, w: 108, h: 58 });
  });

  it.todo("gives the same rect when dragging in the opposite direction");
  it.todo("collapses to padding only when start === current (w = h = 8)");
});

// Pass a fake camera instead of the real CameraController (which needs DOMMatrix):
//   const camera = { worldToScreen: (x, y) => ({ x, y }), getScale: () => 1 } as unknown as CameraController
describe("computeShapesBoundingRect", () => {
  it.todo("covers a single shape plus padding");
  it.todo("covers the extreme corners of multiple shapes");
});
