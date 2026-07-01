import {
  ResizeHandles,
  type _Shape,
  type ManipulationBounds,
  type ResizeHandle,
} from "../entities";

export class ResizeCalculator {
  static getShapeManipulationBounds(shape: _Shape): ManipulationBounds {
    switch (shape?.type) {
      default:
        return this.getRectBounds(shape);
    }
  }

  private static getRectBounds(shape: _Shape) {
    return {
      x: shape.x,
      y: shape.y,
      w: shape.width,
      h: shape.height,
    };
  }

  static getGroupBounds(shapes: _Shape[]): ManipulationBounds {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const shape of shapes) {
      const b = this.getShapeManipulationBounds(shape);
      minX = Math.min(minX, b.x, b.x + b.w);
      minY = Math.min(minY, b.y, b.y + b.h);
      maxX = Math.max(maxX, b.x, b.x + b.w);
      maxY = Math.max(maxY, b.y, b.y + b.h);
    }
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }

  static resize(
    shape: _Shape,
    handle: ResizeHandle,
    worldPoint: { x: number; y: number },
  ): _Shape {
    switch (shape.type) {
      case "RECT":
      default:
        return this.resizeSimpleShape(shape, handle, worldPoint);
    }
  }

  private static resizeSimpleShape(
    shape: _Shape,
    handle: ResizeHandle,
    worldPoint: { x: number; y: number },
  ): _Shape {
    let newShape = { ...shape };
    switch (handle) {
      case ResizeHandles.Right: {
        newShape.width = newShape.width + worldPoint.x;
        return newShape;
      }

      case ResizeHandles.Left: {
        newShape.x = newShape.x + worldPoint.x;
        newShape.width = newShape.width - worldPoint.x;
        return newShape;
      }

      case ResizeHandles.Bottom: {
        newShape.height = newShape.height + worldPoint.y;
        return newShape;
      }

      case ResizeHandles.Top: {
        newShape.y = newShape.y + worldPoint.y;
        newShape.height = newShape.height - worldPoint.y;
        return newShape;
      }

      case ResizeHandles.TopLeft: {
        newShape.y = newShape.y + worldPoint.y;
        newShape.height = newShape.height - worldPoint.y;
        newShape.x = newShape.x + worldPoint.x;
        newShape.width = newShape.width - worldPoint.x;
        return newShape;
      }

      case ResizeHandles.TopRight: {
        newShape.y = newShape.y + worldPoint.y;
        newShape.height = newShape.height - worldPoint.y;
        newShape.width = newShape.width + worldPoint.x;
        return newShape;
      }

      case ResizeHandles.BottomLeft: {
        newShape.height = newShape.height + worldPoint.y;
        newShape.x = newShape.x + worldPoint.x;
        newShape.width = newShape.width - worldPoint.x;
        return newShape;
      }

      case ResizeHandles.BottomRight: {
        newShape.height = newShape.height + worldPoint.y;
        newShape.width = newShape.width + worldPoint.x;
        return newShape;
      }
    }
  }
}
