export type Point = { x: number; y: number };

export function calculateZoomTransform(params: {
  mouse: Point;
  zoom: number;
  offset: Point;
  zoomFactor: number;
}) {
  const { mouse, zoom, offset, zoomFactor } = params;

  const worldX = (mouse.x - offset.x) / zoom;
  const worldY = (mouse.y - offset.y) / zoom;

  const newZoom = zoom * zoomFactor;

  const newOffsetX = mouse.x - worldX * newZoom;
  const newOffsetY = mouse.y - worldY * newZoom;

  return {
    zoom: newZoom,
    offset: { x: newOffsetX, y: newOffsetY },
  };
}
