import React from "react";
import type { IBlock } from "../model/types";

type BlockProps = {
  block: IBlock;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
};

export const Block: React.FC<BlockProps> = ({ block, onMouseDown }) => {
  const isText = block.type === "text";

  return (
    <div
      className={`
        absolute 
        select-none
        rounded-md border border-border text-foreground shadow-sm
        transition-[box-shadow,border-color,transform] duration-150
        active:scale-[0.98]
        hover:shadow-md
        ${isText ? "p-3 text-sm leading-snug" : ""}
      `}
      style={{
        left: block.x,
        top: block.y,
        width: block.width,
        height: block.height,
        whiteSpace: "pre-wrap",
        backgroundColor: "var(--chart-3)",
      }}
      onMouseDown={(e) => onMouseDown(e, block.id)}
    >
      {isText && block.text}
    </div>
  );
};
