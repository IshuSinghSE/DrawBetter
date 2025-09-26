"use client";

import { useQuery } from "convex/react";
import EmptyDraws from "./empty-draws";
import EmptyFavorites from "./empty-favorites";
import EmptySearch from "./empty-search";
import { api } from "@/convex/_generated/api";
import { DrawCard } from "./draw-card";
import { NewDrawButton } from "./new-draw-button";

interface DrawListProps {
  orgId: string;
  query: { search?: string; favorites?: string };
}

export default function DrawList({ orgId, query }: DrawListProps) {
  const data = useQuery(api.draws.get, { orgId , search: query.search });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite Draws" : "Team Draws"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewDrawButton orgId={orgId} disabled />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
          <DrawCard.Skeleton />
        </div>

      </div>
    );
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyDraws />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite Draws" : "Team Draws"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewDrawButton orgId={orgId} />

        {data.map((draw) => (
          <DrawCard
            key={draw._id}
            id={draw._id}
            title={draw.title}
            imageUrl={draw.imageUrl}
            authorId={draw.authorId}
            authorName={draw.authorName}
            createdAt={draw._creationTime}
            orgId={draw.orgId}
            isFavorite={draw.isFavorite}
          />
        ))}
      </div>
    </div>
  );
}
