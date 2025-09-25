"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export const NewButton = () => {
  const { openCreateOrganization } = useClerk();

  return (
    <div className="aspect-square">
      <Hint
      label="Create Organization"
      side="right"
      align="start"
      sideOffset={10}
      >
      <Button
        className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition"
        onClick={() => openCreateOrganization()}
      >
        <Plus className="text-white" />
      </Button>
      </Hint>
    </div>
  );
};
