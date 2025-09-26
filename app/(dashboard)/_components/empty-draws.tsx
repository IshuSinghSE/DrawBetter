import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const EmptyDraws = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/note.svg" height={110} width={110} alt="Empty" />

      <h2 className="text-2xl font-semibold mt-6">Create your first draw!</h2>

      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a draw for your organization.
      </p>

      <div className="mt-6">
        <Button size={"lg"}>Create Draw</Button>
      </div>
    </div>
  );
};

export default EmptyDraws;
