"use client";

import React, { useState } from "react";
import Info from "./info";
import Participants from "./participants";
import ToolBar from "./toolbar";
import { CanvasMode, CanvasState } from "@/types/canvas";
import { useHistory, useCanRedo, useCanUndo } from "@/liveblocks.config";
import { useSelf } from "@liveblocks/react/suspense";

interface CanvasProps {
  drawId: string;
}

const Canvas = ({ drawId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info drawId={drawId} />
      <Participants />
      <ToolBar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </main>
  );
};

export default Canvas;
