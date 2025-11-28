import { Rnd } from "react-rnd";
import type { Shape } from "../model/types";

interface ResizableDraggableShapeProps {
  shape: Shape;
  isSelected: boolean;
  zoom: number;

  onDragLocal: (next: Shape) => void;
  onDragEnd: (next: Shape) => void;

  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

export function ResizableDraggableShape({
  shape,
  isSelected,
  zoom,
  onDragLocal,
  onDragEnd,
  onClick,
  onContextMenu,
  children,
}: ResizableDraggableShapeProps) {
  const scale = zoom / 100;

  const handleSize = 10;

  return (
    <Rnd
      size={{ width: shape.width, height: shape.height }}
      position={{ x: shape.x, y: shape.y }}
      // drag
      onDrag={(_e, d) => {
        onClick?.();
        onDragLocal({
          ...shape,
          x: d.x,
          y: d.y,
        });
      }}
      onDragStop={(_e, d) => {
        onDragEnd({
          ...shape,
          x: d.x,
          y: d.y,
        });
      }}
      // resize
      onResize={(_e, _dir, ref, _delta, position) => {
        onClick?.();
        onDragLocal({
          ...shape,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        });
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        onDragEnd({
          ...shape,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        });
      }}
      enableResizing={{
        right: true,
        bottom: true,
        bottomRight: true,
        top: true,
        left: true,
        topLeft: true,
        topRight: true,
        bottomLeft: true,
      }}
      resizeHandleStyles={
        isSelected
          ? {
              topLeft: {
                borderRadius: "50%",
                border: "1px solid #2563eb",
                background: "#ffffff",
              },
              topRight: {
                borderRadius: "50%",
                border: "1px solid #2563eb",
                background: "#ffffff",
              },
              bottomLeft: {
                borderRadius: "50%",
                border: "1px solid #2563eb",
                background: "#ffffff",
              },
              bottomRight: {
                borderRadius: "50%",
                border: "1px solid #2563eb",
                background: "#ffffff",
              },
            }
          : {
              top: { display: "none" },
              bottom: { display: "none" },
              left: { display: "none" },
              right: { display: "none" },
              topLeft: { display: "none" },
              topRight: { display: "none" },
              bottomLeft: { display: "none" },
              bottomRight: { display: "none" },
            }
      }
      style={{
        border: isSelected ? "1px solid #2563eb" : "none",
        boxSizing: "border-box",
        borderRadius: 6,
        background: "transparent",
      }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClick?.();
      }}
      onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onContextMenu?.(e);
      }}
      scale={scale}
    >
      {children}
    </Rnd>
  );
}
