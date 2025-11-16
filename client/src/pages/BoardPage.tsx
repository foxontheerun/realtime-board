import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

type ShapeType = "rect" | "text";

type Shape = {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
};

const initialShapes: Shape[] = [
  {
    id: "1",
    type: "rect",
    x: 120,
    y: 120,
    width: 160,
    height: 80,
  },
  {
    id: "2",
    type: "text",
    x: 340,
    y: 200,
    width: 220,
    height: 60,
    text: "Привет! Я текстовый блок 😊",
  },
];

const BoardPage: React.FC = () => {
  const { id } = useParams();
  const [shapes, setShapes] = useState<Shape[]>(initialShapes);

  const draggingId = useRef<string | null>(null);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  function handleMouseDown(
    e: React.MouseEvent<HTMLDivElement>,
    shapeId: string
  ) {
    draggingId.current = shapeId;

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    offsetX.current = e.clientX - rect.left;
    offsetY.current = e.clientY - rect.top;

    (e.currentTarget as HTMLDivElement).style.cursor = "grabbing";
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!draggingId.current) return;

    const canvasRect = (
      e.currentTarget as HTMLDivElement
    ).getBoundingClientRect();
    const x = e.clientX - canvasRect.left - offsetX.current;
    const y = e.clientY - canvasRect.top - offsetY.current;

    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === draggingId.current ? { ...shape, x, y } : shape
      )
    );
  }

  function handleMouseUp() {
    draggingId.current = null;
  }

  return (
    <div className="board-root">
      <div className="board-toolbar">
        <div>Board ID: {id}</div>
      </div>

      <div
        className="board-canvas"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`shape shape-${shape.type}`}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.width,
              height: shape.height,
            }}
            onMouseDown={(e) => handleMouseDown(e, shape.id)}
          >
            {shape.type === "text" ? shape.text : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
