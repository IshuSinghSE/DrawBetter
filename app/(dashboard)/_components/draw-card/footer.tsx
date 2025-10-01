import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <div className="relative bg-white p-4 border-t border-gray-100">
      <p className="text-[14px] font-semibold truncate max-w-[calc(100%-20px)] text-gray-800">
        {title}
      </p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[12px] text-muted-foreground truncate mt-1">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-4 right-4 text-gray-400 hover:text-yellow-500 hover:scale-110",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-5 w-5 transition-all duration-200",
            isFavorite && "fill-yellow-500 text-yellow-500 animate-pulse-glow"
          )}
        />
      </button>
    </div>
  );
};

export default Footer;
