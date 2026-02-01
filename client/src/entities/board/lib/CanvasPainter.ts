import type { Shape } from "../../block";

export class CanvasPainter {
  static drawidthStyledRect(ctx: CanvasRenderingContext2D, rect: Shape) {
    const { fill = "blue", stroke = "black" } = rect;
    const radius = 8;

    if (radius <= 0) {
      ctx.fillStyle = fill as string;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      ctx.strokeStyle = stroke as string;
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.width);
    } else {
      ctx.beginPath();
      ctx.moveTo(rect.x + radius, rect.y);
      ctx.lineTo(rect.x + rect.width - radius, rect.y);
      ctx.quadraticCurveTo(
        rect.x + rect.width,
        rect.y,
        rect.x + rect.width,
        rect.y + radius
      );
      ctx.lineTo(rect.x + rect.width, rect.y + rect.height - radius);
      ctx.quadraticCurveTo(
        rect.x + rect.width,
        rect.y + rect.height,
        rect.x + rect.width - radius,
        rect.y + rect.height
      );
      ctx.lineTo(rect.x + radius, rect.y + rect.height);
      ctx.quadraticCurveTo(
        rect.x,
        rect.y + rect.height,
        rect.x,
        rect.y + rect.height - radius
      );
      ctx.lineTo(rect.x, rect.y + radius);
      ctx.quadraticCurveTo(rect.x, rect.y, rect.x + radius, rect.y);
      ctx.closePath();

      ctx.fillStyle = fill as string;
      ctx.fill();
      ctx.strokeStyle = stroke as string;
      ctx.stroke();
    }
  }
}
