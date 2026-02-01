import type { CameraState } from "../layers/GridLayer";

export class CameraController {
  zoom = 1;
  offsetX = 0;
  offsetY = 0;

  viewportWidth = 0;
  viewportHeight = 0;

  updateViewport(canvas: HTMLCanvasElement) {
    this.viewportWidth = canvas.clientWidth;
    this.viewportHeight = canvas.clientHeight;
  }

  get state(): CameraState {
    return {
      zoom: this.zoom,
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      viewportWidth: this.viewportWidth,
      viewportHeight: this.viewportHeight,
    };
  }
}
