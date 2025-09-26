"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";

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
        </div>
        <Footer 
        isFavorite={isFavorite}
        title={title}
        authorLabel={authorLabel}
        createdAtLabel={createdAtLabel}
        onClick={() => {}}
        disabled={false}
        
        />

      </div>
    </Link>
  );
};
