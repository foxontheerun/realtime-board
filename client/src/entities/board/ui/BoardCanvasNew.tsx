import { useRef, useEffect } from "react";
import { BoardRuntime } from "../lib/BoardRuntime";

export function BoardCanvasNew() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<BoardRuntime | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    runtimeRef.current = new BoardRuntime(canvasRef.current);

    return () => runtimeRef.current?.dispose();
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
}
