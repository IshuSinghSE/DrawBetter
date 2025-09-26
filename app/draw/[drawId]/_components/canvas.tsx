"use client";

import React from "react";
import Info from "./info";
import Participants from "./participants";
import ToolBar from "./toolbar";

import { useSelf } from "@liveblocks/react/suspense";

interface CanvasProps {
  drawId: string;
}

const Canvas = ({ drawId }: CanvasProps) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info drawId={drawId} />
      <Participants />
      <ToolBar />
    </main>
  );
};

export default Canvas;
