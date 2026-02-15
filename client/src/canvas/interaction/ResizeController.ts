import type { _Shape, ResizeHandle } from "../entities";
import { ResizeCalculator } from "./ResizeCalculator";

export class ResizeController {
  private shapeId: string | null = null;
  private startPointer: { x: number; y: number } | null = null;
  private startShape: _Shape | null = null;
  private handle: ResizeHandle | null = null;
  private last: _Shape | null = null;

  begin(
    shape: _Shape,
    handle: ResizeHandle,
    pointer: { x: number; y: number },
  ) {
    this.shapeId = shape.id;
    this.handle = handle;
    this.startPointer = { ...pointer };
    this.startShape = { ...shape };
    this.last = { ...shape };
  }

  update(pointer: { x: number; y: number }): _Shape | null {
    if (!this.shapeId || !this.startShape || !this.startPointer || !this.handle)
      return null;

    const dx = pointer.x - this.startPointer.x;
    const dy = pointer.y - this.startPointer.y;

    const next = ResizeCalculator.resize(this.startShape, this.handle, {
      x: dx,
      y: dy,
    });

    this.last = { ...next, id: this.shapeId };
    return this.last;
  }

  end(): _Shape | null {
    const out = this.last;
    this.shapeId = null;
    this.startPointer = null;
    this.startShape = null;
    this.handle = null;
    this.last = null;
    return out;
  }
}
