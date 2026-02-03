import type { Shape } from "../../block";
import { CanvasPainter } from "../lib/CanvasPainter";
import type { _Shape } from "../model/EntityManager";
import type { CameraState } from "./GridLayer";

const BORDER_COLOR = "#92c1ffff";
const STROKE_WIDTH = 3;
export class Overlay {
  drawBorder(
    ctx: CanvasRenderingContext2D,
    camera: CameraState,
    shape: _Shape
  ) {
    ctx.save();

    const borderFigure = {
      ...shape,
      fill: null,
      strokeWidth: STROKE_WIDTH,
      stroke: BORDER_COLOR,
      radius: 0,
      x: shape.x - 0.5,
      y: shape.y - 0.5,
      width: shape.width + 1,
      height: shape.height + 1,
    };

    CanvasPainter.drawRectShape(ctx, borderFigure as unknown as Shape, camera);

    ctx.restore();
  }
}
