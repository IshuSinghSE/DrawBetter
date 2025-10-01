"use client";

import { Actions } from "@/components/actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ExportDialog } from "./export-dialog";

interface InfoProps {
  drawId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

const Info = ({ drawId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.draw.get, {
    id: drawId as Id<"draw">,
  });

  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 glass rounded-xl px-2 flex items-center shadow-medium h-14 hover:shadow-strong transition-all duration-300">
      <Hint label="Go to Draws" side="bottom" sideOffset={10}>
        <Button className="px-2 bg-transparent" variant={"draw"}>
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg shadow-sm">
              <Image
                src="/onlylogo.svg"
                alt="Draw Logo"
                width={28}
                height={28}
              />
            </div>
            <span
              className={cn(
                "font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent",
                font.className
              )}
            >
              Draw Better
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit Title" side="bottom" sideOffset={10}>
        <Button
          onClick={() => onOpen(data._id, data.title)}
          className="text-base font-semibold px-3 hover:bg-blue-50"
          variant={"draw"}
        >
          {data.title}
        </Button>
      </Hint>

      <TabSeparator />
      
      <ExportDialog 
        drawTitle={data.title} 
        variant="outline" 
        showLabel={true}
        size="sm"
      />

      <TabSeparator />
      <Actions
      id={data._id}
      title={data.title}
      side="bottom"
      sideOffset={10}
      >
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <Button size={"icon"} variant={"draw"} className="hover:bg-blue-50">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export default Info;

export const InfoSkeleton = () => {
  return (
    <div
      className="absolute top-2 left-2
       bg-white rounded-md px-1.5 flex items-center shadow-md h-12
       w-[300px]
       "
    />
  );
};
