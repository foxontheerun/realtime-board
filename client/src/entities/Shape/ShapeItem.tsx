import { memo, useCallback, useState } from "react";
import { EllipseBlock } from "./EllipseBlock";
import { ResizableDraggableShape } from "./ResizableDraggableShape";
import { ShapeBlock } from "./ShapeBlock";
import { TextBlock } from "./TextBlock";
import type { Shape } from "./types";

interface ShapeItemProps {
  shape: Shape;
  zoom: number;
  isSelected: boolean;
  onDragLocal: (next: Shape) => void;
  onDragEnd: (next: Shape) => void;

  onShapeClick: (id: string) => void;
  onShapeContextMenu: (id: string, e: React.MouseEvent<HTMLDivElement>) => void;
  onTextChange: (shape: Shape, text: string) => void;
}

function ShapeItemComponent({
  shape,
  zoom,
  isSelected,
  onDragLocal,
  onDragEnd,
  onShapeClick,
  onShapeContextMenu,
  onTextChange,
}: ShapeItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    onShapeClick(shape.id);
  }, [onShapeClick, shape.id]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onShapeContextMenu(shape.id, e);
    },
    [onShapeContextMenu, shape.id],
  );

  const handleChangeText = useCallback(
    (text: string) => {
      onTextChange(shape, text);
    },
    [onTextChange, shape],
  );

  const handlenSetEditing = (isEdit: boolean) => {
    setIsEditing(isEdit);
  };

  return (
    <ResizableDraggableShape
      shape={shape}
      zoom={zoom}
      isSelected={isSelected}
      onDragLocal={onDragLocal}
      onDragEnd={onDragEnd}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      disableDrag={isEditing}
    >
      {shape.type === "RECT" && <ShapeBlock shape={shape} />}
      {shape.type === "TEXT" && (
        <TextBlock
          shape={shape}
          onChangeText={handleChangeText}
          onSetEditing={handlenSetEditing}
        />
      )}
      {shape.type === "ELLIPSE" && <EllipseBlock shape={shape} />}
    </ResizableDraggableShape>
  );
}

export const ShapeItem = memo(ShapeItemComponent);
