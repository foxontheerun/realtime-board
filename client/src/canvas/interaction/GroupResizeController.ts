import type {
  _Shape,
  ResizeHandle,
  ManipulationBounds,
} from "../entities";
import type { Point } from "../types";
import { ResizeCalculator } from "./ResizeCalculator";

interface Snapshot {
  shape: _Shape;
  x: number;
  y: number;
  width: number;
  height: number;
}

export class GroupResizeController {
  private startBounds: ManipulationBounds | null = null;
  private handle: ResizeHandle | null = null;
  private startPointer: Point | null = null;
  private snapshots: Snapshot[] = [];

  begin(shapes: _Shape[], handle: ResizeHandle, pointer: Point) {
    this.startBounds = ResizeCalculator.getGroupBounds(shapes);
    this.handle = handle;
    this.startPointer = { ...pointer };
    this.snapshots = shapes.map((shape) => ({
      shape,
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    }));
    shapes.forEach((shape) => (shape.state = "resizing"));
  }

  update(pointer: Point): _Shape[] {
    if (!this.startBounds || !this.handle || !this.startPointer) return [];

    const delta = {
      x: pointer.x - this.startPointer.x,
      y: pointer.y - this.startPointer.y,
    };

    const sb = this.startBounds;
    const resized = ResizeCalculator.resize(boundsToShape(sb), this.handle, delta);
    const nb = normalizeBounds(resized);

    const scaleX = sb.w !== 0 ? nb.w / sb.w : 1;
    const scaleY = sb.h !== 0 ? nb.h / sb.h : 1;

    const updated: _Shape[] = [];
    for (const snap of this.snapshots) {
      snap.shape.x = nb.x + (snap.x - sb.x) * scaleX;
      snap.shape.y = nb.y + (snap.y - sb.y) * scaleY;
      snap.shape.width = snap.width * scaleX;
      snap.shape.height = snap.height * scaleY;
      updated.push(snap.shape);
    }
    return updated;
  }

  end(): _Shape[] {
    const updated = this.snapshots.map((s) => s.shape);
    updated.forEach((shape) => (shape.state = "static"));
    this.startBounds = null;
    this.handle = null;
    this.startPointer = null;
    this.snapshots = [];
    return updated;
  }
}

function boundsToShape(b: ManipulationBounds): _Shape {
  return { x: b.x, y: b.y, width: b.w, height: b.h } as _Shape;
}

function normalizeBounds(shape: _Shape): ManipulationBounds {
  return {
    x: Math.min(shape.x, shape.x + shape.width),
    y: Math.min(shape.y, shape.y + shape.height),
    w: Math.abs(shape.width),
    h: Math.abs(shape.height),
  };
}
