import React from "react";
import type { Shape } from "../model/types";

type BlockProps = {
  shape: Shape;
  isSelected?: boolean;
};

export const ShapeBlock: React.FC<BlockProps> = ({ shape }) => {
  return (
    <div
      className={"w-full h-full rounded-lg  bg-white shadow-sm transition "}
      style={{
        background: shape.fill || "auto",
      }}
    ></div>
  );
};
