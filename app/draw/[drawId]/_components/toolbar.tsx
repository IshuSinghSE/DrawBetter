import React from "react";
import { ToolButton } from "./tool-button";
import { ExportDialog } from "./export-dialog";
import { ShapesDropdown } from "./shapes-dropdown";
import {
  Hand,
  MousePointer2,
  Pencil,
  Redo2,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface ToolBarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  drawTitle?: string;
}

const ToolBar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
  drawTitle = "drawing",
}: ToolBarProps) => {
  return (
    <div
      className="absolute top-[50%]
    -translate-y-[50%] left-2 flex flex-col gap-y-4 animate-slide-in
    "
    >
      <div className="glass rounded-xl p-2 flex flex-col gap-y-1.5 items-center shadow-medium hover:shadow-strong transition-all duration-300">
        <ToolButton
          label="Select (V)"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />

        <ToolButton
          label="Pan (H)"
          icon={Hand}
          onClick={() => setCanvasState({ mode: CanvasMode.Panning })}
          isActive={canvasState.mode === CanvasMode.Panning}
        />

        <ToolButton
          label="Text (T)"
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />

        <ToolButton
          label="Sticky Note (N)"
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />

        <ShapesDropdown
          canvasState={canvasState}
          setCanvasState={setCanvasState}
        />

        <ToolButton
          label="Pen (P)"
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
      </div>

      <div className="glass rounded-xl p-2 flex flex-col items-center shadow-medium hover:shadow-strong transition-all duration-300 z-10">
        <ToolButton
          label="Undo (Ctrl+Z)"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />

        <ToolButton
          label="Redo (Ctrl+Shift+Z)"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>

      {/* Export Section */}
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ExportDialog drawTitle={drawTitle} />
      </div>
    </div>
  );
};

export default ToolBar;

export const ToolBarSkeleton = () => {
  return (
    <div
      className="absolute top-[50%]
    -translate-y-[50%] left-2 flex flex-col gap-y-4
    glass
    h-[360px]
    w-[52px]
    shadow-medium
    rounded-xl
    "
    />
  );
};
