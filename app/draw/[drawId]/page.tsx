import React from "react";
import Canvas from "./_components/canvas";
import { Room } from "@/components/room";

interface DrawIdPageProps {
  params: {
    drawId: string;
  };
}

const DrawIdPage = ({ params }: DrawIdPageProps) => {
  return (
    <Room roomId={params.drawId}>
      <Canvas drawId={params.drawId} />
    </Room>
  );
};

export default DrawIdPage;
