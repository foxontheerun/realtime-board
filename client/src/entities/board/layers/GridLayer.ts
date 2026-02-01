import {
  BASE_GRID_COLOR,
  buildGridLayers,
  type GridLayerConfig,
} from "./models/buildGridLayers";

export type CameraState = {
  zoom: number;
  offsetX: number;
  offsetY: number;
  viewportWidth: number;
  viewportHeight: number;
};

export class GridLayer {
  draw(ctx: CanvasRenderingContext2D, camera: CameraState) {
    const layers = buildGridLayers(camera.zoom);

    ctx.save();
    ctx.lineCap = "butt";
    ctx.strokeStyle = `rgb(${BASE_GRID_COLOR})`;

    layers.forEach((layer) => {
      this.drawLayer(ctx, camera, layer);
    });

    ctx.restore();
  }

  private drawLayer(
    ctx: CanvasRenderingContext2D,
    camera: CameraState,
    layer: GridLayerConfig
  ) {
    const { size, opacity, lineWidth } = layer;

    ctx.globalAlpha = opacity;
    ctx.lineWidth = lineWidth;

    const width = camera.viewportWidth;
    const height = camera.viewportHeight;

    const startX = -((camera.offsetX * camera.zoom) % size);
    const startY = -((camera.offsetY * camera.zoom) % size);

    // vertical
    for (let x = startX; x < width; x += size) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
      ctx.stroke();
    }

    // horizontal
    for (let y = startY; y < height; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
      ctx.stroke();
    }
  }
}
