"use client";

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
        <div>
            Draw Card
        </div>
    )
}