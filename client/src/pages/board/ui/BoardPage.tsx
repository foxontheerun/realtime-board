import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import type { StickyColorId, Tool } from "../../../entities/Shape";
import { TopBar, Toolbar } from "../../../widgets";
import type { CameraController } from "../../../canvas";
import { CameraContext } from "../../../entities/Board/CameraContext";
import { BoardCanvasNew } from "../../../entities/Board/BoardCanvasNew";

export function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTool, setActiveTool] = useState<Tool>("pointer");
  const [activeStickyColorId, setActiveStickyColorId] =
    useState<StickyColorId>("yellow");
  const [camera, setCamera] = useState<CameraController | null>(null);

  // Ref to canvas so Toolbar can push color changes directly to runtime
  // without causing a re-render on every color pick.
  const canvasRef = useRef<{
    setShapeColor: (fill: string, stroke: string) => void;
  } | null>(null);

  if (!id) return <div>Board not found</div>;

  return (
    <div className="board-root">
      {camera && (
        <CameraContext.Provider value={camera}>
          <TopBar />
        </CameraContext.Provider>
      )}

      <div className="flex-1 flex relative overflow-hidden bg-[#F5F5F5]">
        <Toolbar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          activeStickyColorId={activeStickyColorId}
          setActiveStickyColorId={setActiveStickyColorId}
          onShapeColorChange={(fill, stroke) => {
            canvasRef.current?.setShapeColor(fill, stroke);
          }}
        />

        <BoardCanvasNew
          ref={canvasRef}
          boardId={id}
          setCamera={setCamera}
          activeTool={activeTool}
          activeStickyColor={activeStickyColorId}
          onToolComplete={() => setActiveTool("pointer")}
        />
      </div>
    </div>
  );
}
