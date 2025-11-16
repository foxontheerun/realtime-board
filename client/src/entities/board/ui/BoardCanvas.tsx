import { useState } from "react";
import { ContextMenu } from "../../../features/shape-context-menu/ui/ContextMenu";
import type { Tool } from "../../block/model/types";
import { ShapeBlock } from "../../block/ui/ShapeBlock";
import { TextBlock } from "../../block/ui/TextBlock";
import { ResizableDraggableShape } from "../../block/ui/ResizableDraggableShape";
import { useBoardShapes } from "../model/useBoardShapes";

interface BoardCanvasProps {
  boardId: string;
  activeTool: Tool;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export function BoardCanvas({ boardId, zoom, onZoomChange }: BoardCanvasProps) {
  const { shapes, loading, error, updateShape, broadcastShape } =
    useBoardShapes(boardId);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const zoomScale = zoom / 100;

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Определяем направление зума (вверх - увеличение, вниз - уменьшение)
    const zoomDirection = e.deltaY > 0 ? -1 : 1;

    // Шаг изменения зума
    const zoomStep = 10;

    // Вычисляем новый зум (ограничиваем от 25% до 200%)
    const newZoom = Math.max(
      25,
      Math.min(200, zoom + zoomDirection * zoomStep)
    );

    // Обновляем зум через callback
    onZoomChange(newZoom);
  };

  const handleShapeClick = (id: string) => {
    setSelectedId(id);
    setContextMenu(null);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // кликнули точно по канвасу, не по блоку
    if (e.target === e.currentTarget) {
      setSelectedId(null);
      setContextMenu(null);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setSelectedId(id);
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Загружаем доску…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500">
        Ошибка загрузки доски: {error.message}
      </div>
    );
  }

  return (
    <div className="flex-1 relative overflow-hidden " onWheel={handleWheel}>
      {/* Canvas container with shadow */}
      <div className="absolute inset-8 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Grid dots background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #E5E5E5 1px, transparent 1px)`,
            backgroundSize: "12px 12px",
            transform: `scale(${zoomScale})`,
            transformOrigin: "top left",
          }}
        />

        {/* Shapes container */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: "top left",
          }}
          onMouseDown={handleCanvasMouseDown}
        >
          {shapes.map((shape) => (
            <ResizableDraggableShape
              key={shape.id}
              shape={shape}
              zoom={zoom}
              isSelected={selectedId === shape.id}
              onDrag={(shape) => broadcastShape(shape)}
              onChange={(shape) => updateShape(shape)}
              onClick={() => handleShapeClick(shape.id)}
              onContextMenu={(e) => handleContextMenu(e, shape.id)}
            >
              {shape.type === "rectangle" ? (
                <ShapeBlock shape={shape} />
              ) : (
                <TextBlock content={shape.text || ""} />
              )}
            </ResizableDraggableShape>
          ))}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
}
