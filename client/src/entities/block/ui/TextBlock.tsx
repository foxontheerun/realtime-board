import type { Shape } from "../model/types";

interface TextBlockProps {
  shape: Shape;
}

export function TextBlock({ shape }: TextBlockProps) {
  return (
    <div className="relative w-full h-full group">
      <div
        style={{
          background: shape.fill || "auto",
        }}
        className={`w-full h-full bg-white rounded-lg  p-4 flex items-center justify-center transition-all `}
      >
        <p className="text-[#666666] text-center">{shape.text}</p>
      </div>
    </div>
  );
}
