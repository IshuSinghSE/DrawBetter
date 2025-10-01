"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewDrawButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewDrawButton = ({ orgId, disabled }: NewDrawButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.draw.create);
  const OnClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Draw created");
        router.push(`/draw/${id}`);
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
        "col-span-1 aspect-[100/127] bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 flex flex-col items-center justify-center py-6 shadow-soft hover:shadow-strong transition-all duration-300 group hover:scale-[1.02] border border-blue-500",
        (pending || disabled) &&
          "opacity-75 hover:from-blue-600 hover:to-blue-700 cursor-not-allowed hover:scale-100"
      )}
    >
      <div />
      <div className="bg-white/10 rounded-full p-3 mb-3 group-hover:bg-white/20 transition-colors duration-200">
        <Plus className="h-12 w-12 text-white stroke-[1.5]" />
      </div>
      <p className="text-sm text-white font-semibold tracking-wide">
        Create New Draw
      </p>
    </button>
  );
};
