import { describe, it, expect } from "vitest";
import { hitTestResizeHandle } from "./mouseEventHandlingHelpers";
import { ResizeHandles } from "../../entities";

const bounds = { x: 0, y: 0, w: 100, h: 100 };

describe("hitTestResizeHandle", () => {
  it("hits a corner handle at scale 1", () => {
    expect(hitTestResizeHandle(bounds, { x: 0, y: 0 }, 1)).toBe(
      ResizeHandles.TopLeft,
    );
  });

  it("shrinks the hit area when zoomed in (scale > 1)", () => {
    expect(hitTestResizeHandle(bounds, { x: 8, y: 8 }, 1)).toBe(
      ResizeHandles.TopLeft,
    );
    expect(hitTestResizeHandle(bounds, { x: 8, y: 8 }, 2)).toBeNull();
  });

  it("grows the hit area when zoomed out (scale < 1)", () => {
    expect(hitTestResizeHandle(bounds, { x: 12, y: 12 }, 1)).toBeNull();
    expect(hitTestResizeHandle(bounds, { x: 12, y: 12 }, 0.5)).toBe(
      ResizeHandles.TopLeft,
    );
  });

  it("returns null in the middle of the shape", () => {
    expect(hitTestResizeHandle(bounds, { x: 50, y: 50 }, 1)).toBeNull();
  });
});
