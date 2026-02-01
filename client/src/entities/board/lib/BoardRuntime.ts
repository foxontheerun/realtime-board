import { CameraController } from "./CameraController";
import { GridLayer } from "../layers/GridLayer";
import { StaticLayer } from "../layers/StaticLayer";

export class BoardRuntime {
  camera = new CameraController();

  private ctx: CanvasRenderingContext2D;
  private rafId: number | null = null;
  private canvas: HTMLCanvasElement;

  gridLayer = new GridLayer();
  staticLayer = new StaticLayer();
  //   dragLayer = new DragLayer()
  //   overlayLayer = new OverlayLayer()

  constructor(canvas: HTMLCanvasElement) {
    this.camera.updateViewport(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.resize();
    this.loop();
  }

  loop = () => {
    this.draw();
    this.rafId = requestAnimationFrame(this.loop);
  };

  draw() {
    const camera = this.camera.state;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, camera.viewportWidth, camera.viewportHeight);

    this.gridLayer.draw(ctx, camera);
    this.staticLayer.draw(ctx, camera);
  }

  resize() {
    const dpr = window.devicePixelRatio;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  dispose() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
