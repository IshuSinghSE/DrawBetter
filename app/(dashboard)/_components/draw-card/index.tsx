"use client";

import Image from "next/image";
import Link from "next/link";

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

export const DrawCard = ({ id, title, authorId, imageUrl, authorName, orgId, createdAt, isFavorite }: DrawCardProps) => {
    return (
        <Link href={`/draw/${id}`}>
           < div className="group aspect-[100/127] border rounded-lg
           flex flex-col overflow-hidden justify-between
           ">
            <div className="relative flex-1 bg-amber-50">
                <Image 
                src={imageUrl}
                alt="Draw Image"
                fill
                className="object-fit"
                />
            </div>
            </div>
        </Link>
    )
}