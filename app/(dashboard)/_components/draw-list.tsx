"use client";

interface DrawListProps {
  orgId: string;
  query: { search?: string; favorites?: string };
}

export default function DrawList({ orgId, query }: DrawListProps) {

  const data = [];

  
  if (!data?.length && query.search) {
    return (
        <div>
            Try searching for something else.
        </div>
    );
  }


  if (!data?.length && query.favorites) {
    return (
        <div>
            You have no favorite draws.
        </div>
    );
    }

    if (!data?.length) {
        return (
            <div>
                You have no draws yet.
            </div>
        );
    }

  return (
    <div>
        {JSON.stringify(query)}
    </div>
  );
}
