import { Loader } from "lucide-react";
import Image from "next/image";

import React from "react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolBarSkeleton } from "./toolbar";

const Loading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logo.svg"
          alt="Loading"
          width={80}
          height={80}
          className="animate-pulse"
        />
        <div className="flex items-center gap-2">
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading canvas...
          </span>
        </div>
      </div>
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolBarSkeleton />
    </main>
  );
};

export default Loading;
