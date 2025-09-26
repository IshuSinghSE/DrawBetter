"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const EmptyDraws = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.draw.create);

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Draw created!");
      })
      .catch(() => {
        toast.error("Failed to create draw");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/note.svg" height={110} width={110} alt="Empty" />

      <h2 className="text-2xl font-semibold mt-6">Create your first draw!</h2>

      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a draw for your organization.
      </p>

      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size={"lg"}>
          Create Draw
        </Button>
      </div>
    </div>
  );
};

export default EmptyDraws;
