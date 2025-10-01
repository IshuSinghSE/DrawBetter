"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface DrawCardProps {
  id: string;
  title: string;
  authorId: string;
  imageUrl: string;
  authorName: string;
  orgId: string;
  createdAt: number;
  isFavorite: boolean;
}

export const DrawCard = ({
  id,
  title,
  authorId,
  imageUrl,
  authorName,
  orgId,
  createdAt,
  isFavorite,
}: DrawCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId == authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.draw.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.draw.unfavorite
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => {
        toast.error("Failed to remove from favorites");
      });
    } else {
      onFavorite({ id, orgId }).catch(() => {
        toast.error("Failed to add to favorites");
      });
    }
  };

  return (
    <Link href={`/draw/${id}`}>
      <div
        className="group aspect-[100/127] border rounded-lg
           flex flex-col overflow-hidden justify-between
           "
      >
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

DrawCard.Skeleton = function DrawCardSkeleton() {
  return (
    <div
      className="aspect-[100/127] border rounded-lg
           flex flex-col overflow-hidden justify-between
           "
    >
      <div className="relative flex-1 bg-amber-50">
        <Skeleton className="h-full w-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Loading"
              width={40}
              height={40}
              className="animate-pulse opacity-50"
            />
            <span className="text-xs text-muted-foreground animate-pulse">
              Loading...
            </span>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
};
