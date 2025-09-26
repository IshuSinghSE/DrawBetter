import Image from "next/image";
import React from "react";

const EmptyFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/empty-favorites.svg" height={140} width={140} alt="Empty" />

      <h2 className="text-2xl font-semibold mt-6">No favorite draws yet.</h2>

      <p className="text-muted-foreground text-sm mt-2">
        Try favoriting some draws to see them here.
      </p>
    </div>
  );
};

export default EmptyFavorites;
