"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export const NewButton = () => {
  const { openCreateOrganization } = useClerk();

  return (
    <div className="aspect-square">
      <Button
        className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition"
        onClick={() => openCreateOrganization()}
      >
        <Plus className="text-white" />
      </Button>
    </div>
  );
};
