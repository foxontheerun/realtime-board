import {
  ResizeHandles,
  type ManipulationBounds,
  type ResizeHandle,
} from "../../entities";

export const RESIZE_HANDLE_SIZE = 6;
export const RESIZE_HANDLE_HIT_SLOP = 4;

export const hitTestResizeHandle = (
  bounds: ManipulationBounds,
  point: { x: number; y: number },
  scale: number,
): ResizeHandle | null => {
  const { x, y, w, h } = bounds;
  const { x: px, y: py } = point;
  const delta = (RESIZE_HANDLE_SIZE + RESIZE_HANDLE_HIT_SLOP) / scale;

  const regions: [ResizeHandle, number, number, number, number][] = [
    [ResizeHandles.Top, x + delta, y - delta, w - delta * 2, delta * 2],
    [ResizeHandles.Bottom, x + delta, y + h - delta, w - delta * 2, delta * 2],
    [ResizeHandles.Left, x - delta, y + delta, delta * 2, h - delta * 2],
    [ResizeHandles.Right, x + w - delta, y + delta, delta * 2, h - delta * 2],
    [ResizeHandles.TopLeft, x - delta, y - delta, delta * 2, delta * 2],
    [ResizeHandles.TopRight, x + w - delta, y - delta, delta * 2, delta * 2],
    [ResizeHandles.BottomLeft, x - delta, y + h - delta, delta * 2, delta * 2],
    [
      ResizeHandles.BottomRight,
      x + w - delta,
      y + h - delta,
      delta * 2,
      delta * 2,
    ],
  ];

  for (const [handle, rx, ry, rw, rh] of regions) {
    if (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh) return handle;
  }

  return null;
};
