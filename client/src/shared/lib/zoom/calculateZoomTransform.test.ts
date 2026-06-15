import { describe, it, expect } from "vitest";
import { calculateZoomTransform } from "./calculateZoomTransform";

describe("calculateZoomTransform", () => {
  it("multiplies zoom by zoomFactor", () => {
    const result = calculateZoomTransform({
      mouse: { x: 100, y: 100 },
      zoom: 1,
      offset: { x: 0, y: 0 },
      zoomFactor: 2,
    });

    expect(result.zoom).toBe(2);
  });

  it("leaves zoom and offset untouched when zoomFactor is 1", () => {
    const result = calculateZoomTransform({
      mouse: { x: 250, y: 80 },
      zoom: 1.5,
      offset: { x: 40, y: 10 },
      zoomFactor: 1,
    });

    expect(result.zoom).toBe(1.5);
    expect(result.offset).toEqual({ x: 40, y: 10 });
  });

  // The world point under the cursor must stay put — otherwise the canvas
  // jumps around the mouse while zooming.
  it("keeps the world point under the cursor when zooming in", () => {
    const mouse = { x: 300, y: 200 };
    const zoom = 1;
    const offset = { x: 50, y: 20 };

    const worldBefore = {
      x: (mouse.x - offset.x) / zoom,
      y: (mouse.y - offset.y) / zoom,
    };

    const result = calculateZoomTransform({ mouse, zoom, offset, zoomFactor: 1.25 });

    expect((mouse.x - result.offset.x) / result.zoom).toBeCloseTo(worldBefore.x, 10);
    expect((mouse.y - result.offset.y) / result.zoom).toBeCloseTo(worldBefore.y, 10);
  });

  it("keeps the world point under the cursor when zooming out", () => {
    const mouse = { x: 120, y: 90 };
    const zoom = 3;
    const offset = { x: -200, y: -150 };

    const worldBefore = {
      x: (mouse.x - offset.x) / zoom,
      y: (mouse.y - offset.y) / zoom,
    };

    const result = calculateZoomTransform({ mouse, zoom, offset, zoomFactor: 0.5 });

    expect((mouse.x - result.offset.x) / result.zoom).toBeCloseTo(worldBefore.x, 10);
    expect((mouse.y - result.offset.y) / result.zoom).toBeCloseTo(worldBefore.y, 10);
  });
});
