"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewDrawButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewDrawButton = ({ orgId, disabled }: NewDrawButtonProps) => {
  const { mutate, pending } = useApiMutation(api.draw.create);
  const OnClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Draw created");
      })
      .catch(() => {
        toast.error("Error creating draw");
      });
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={OnClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-xs text-white font-light">New Draw</p>
    </button>
  );
};
