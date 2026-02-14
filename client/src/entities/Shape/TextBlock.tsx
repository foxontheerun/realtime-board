import React, { useEffect, useRef, useState } from "react";
import type { Shape } from "./types";
import { EditableText } from "../../shared/ui/editable-text/EditableText";

interface TextBlockProps {
  shape: Shape;
  onChangeText?: (text: string) => void;
  onSetEditing?: (isEdit: boolean) => void;
}

export const TextBlock = React.memo(
  ({ shape, onChangeText, onSetEditing }: TextBlockProps) => {
    const fill = shape.fill || "#FFFFFF";
    const stroke = shape.stroke || "#E5E5E5";
    const strokeWidth = shape.strokeWidth || 1;

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(shape.text || "Текст...");
    const [fontSize, setFontSize] = useState(() => calcFontSize(shape.width));

    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      setValue(shape.text || "");
    }, [shape.text]);

    useEffect(() => {
      setFontSize(calcFontSize(shape.width));
    }, [shape.width]);

    function calcFontSize(width?: number) {
      const baseWidth = 160;
      const baseFontSize = 14;
      const w = width || baseWidth;

      return Math.max(12, (w / baseWidth) * baseFontSize);
    }

    const handleDoubleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
      setIsEditing(true);
      onSetEditing?.(true);
    };

    const handleBlur = () => {
      setIsEditing(false);
      onSetEditing?.(false);
      onChangeText?.(value);
    };

    return (
      <div className="relative w-full h-full group">
        <div
          className="w-full h-full rounded-[8px] p-4 flex items-center justify-center transition-all"
          style={{
            backgroundColor: fill,
            border: `${strokeWidth}px solid ${stroke}`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
          onDoubleClick={handleDoubleClick}
        >
          <EditableText
            ref={textRef}
            value={value}
            onChange={(next) => {
              setValue(next);
              onChangeText?.(next);
            }}
            editable={isEditing}
            autoFocus={isEditing}
            onBlur={handleBlur}
            className="editable-text w-full bg-transparent outline-none text-[#1A1A1A] text-center"
            placeholder="Текст..."
            style={{
              fontSize,
              lineHeight: 1.2,
            }}
          />
        </div>
      </div>
    );
  },
);
