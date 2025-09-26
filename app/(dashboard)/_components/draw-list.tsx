"use client";

import EmptyDraws from "./empty-draws";
import EmptyFavorites from "./empty-favorites";
import EmptySearch from "./empty-search";

interface DrawListProps {
  orgId: string;
  query: { search?: string; favorites?: string };
}

export default function DrawList({ orgId, query }: DrawListProps) {

  const data = [];

  
  if (!data?.length && query.search) {
    return (
        <EmptySearch />
    );
  }


  if (!data?.length && query.favorites) {
    return (
        <EmptyFavorites />
    );
    }

    if (!data?.length) {
        return (
           <EmptyDraws />
        );
    }

  return (
    <div>
        {JSON.stringify(query)}
    </div>
  );
}
