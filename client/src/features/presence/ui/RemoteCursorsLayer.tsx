import { useEffect, useReducer } from "react";
import type { CameraController } from "../../../canvas";
import type { RemoteCursor } from "../../../canvas/types";
import { colorFromId } from "../lib/colorFromId";

interface RemoteCursorsLayerProps {
  cursors: RemoteCursor[];
  camera: CameraController;
}

// DOM overlay (like Miro): cursors live above the canvas, positioned via
// world->screen, smoothed by CSS transition between throttled updates.
export function RemoteCursorsLayer({
  cursors,
  camera,
}: RemoteCursorsLayerProps) {
  // Re-render on camera changes so cursors track pan/zoom.
  const [, tick] = useReducer((n: number) => n + 1, 0);
  useEffect(() => camera.subscribe(tick), [camera]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {cursors.map((c) => {
        const screen = camera.worldToScreen(c.x, c.y);
        return (
          <div
            key={c.clientId}
            className="absolute top-0 left-0"
            style={{
              transform: `translate(${screen.x}px, ${screen.y}px)`,
              transition: "transform 80ms linear",
              willChange: "transform",
            }}
          >
            <CursorArrow color={colorFromId(c.clientId)} />
          </div>
        );
      })}
    </div>
  );
}

function CursorArrow({ color }: { color: string }) {
  // Tip is at (0,0) so `translate(x, y)` puts it exactly on the pointer spot,
  // like a native cursor. overflow: visible keeps the white outline at the tip.
  return (
    <svg
      width="15"
      height="24"
      viewBox="0 0 12 19"
      fill="none"
      style={{ display: "block", overflow: "visible" }}
    >
      <path
        d="M0 0 L0 16 L3.5 12.7 L6 18 L8.2 17 L5.7 11.9 L10 11.9 Z"
        fill={color}
        stroke="black"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
