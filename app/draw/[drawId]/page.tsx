import React from "react";
import Canvas from "./_components/canvas";
import { Room } from "@/components/room";
import Loading from "./_components/loading";

interface DrawIdPageProps {
  params: Promise<{
    drawId: string;
  }>;
}

const DrawIdPage = async ({ params }: DrawIdPageProps) => {
  const { drawId } = await params;

  return (
    <Room roomId={drawId} fallback={<Loading />}>
      <Canvas drawId={drawId} />
    </Room>
  );
};

export default DrawIdPage;
