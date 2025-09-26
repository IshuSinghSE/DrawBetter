import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const EmptyOrg = () => {
  const { openCreateOrganization } = useClerk();
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/elements.svg" alt="Empty" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to DrawBetter</h2>

      <p className="text-muted-foreground text-sm mt-2">
        Create or join an organization to get started with collaborative
        drawing!
      </p>
      <div className="mt-6">
        <Button size={"lg"} onClick={() => openCreateOrganization()}>
          Create Organization
        </Button>
      </div>
    </div>
  );
};

export default EmptyOrg;
