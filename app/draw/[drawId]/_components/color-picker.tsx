"use client";

import { cn, colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
  currentColor?: Color;
}

export const ColorPicker = ({ onChange, currentColor }: ColorPickerProps) => {
  return (
    <div className="flex flex-nowrap gap-2.5 items-center pr-3 mr-3 border-r border-gray-300">
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 0, b: 0 }}
        currentColor={currentColor}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 0, g: 255, b: 0 }}
        currentColor={currentColor}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 0, g: 0, b: 255 }}
        currentColor={currentColor}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 255, b: 0 }}
        currentColor={currentColor}
      />
      {/* <ColorButton onClick={onChange} color={{ r: 0, g: 255, b: 255 }} currentColor={currentColor} /> */}
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 255, b: 255 }}
        currentColor={currentColor}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 128, g: 0, b: 128 }}
        currentColor={currentColor}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 0, g: 0, b: 0 }}
        currentColor={currentColor}
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 252, g: 142, b: 172 }}
        currentColor={currentColor}
      />
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
  currentColor?: Color;
}

const ColorButton = ({ onClick, color, currentColor }: ColorButtonProps) => {
  const isSelected =
    currentColor &&
    currentColor.r === color.r &&
    currentColor.g === color.g &&
    currentColor.b === color.b;

  return (
    <button
      className={cn(
        "w-9 h-9 items-center flex justify-center rounded-lg",
        "hover:scale-110 transition-all duration-200",
        "hover:shadow-md active:scale-95",
        isSelected && "ring-2 ring-blue-500 ring-offset-2 scale-110"
      )}
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-lg border-2 border-white shadow-sm"
        style={{
          background: colorToCss(color),
          boxShadow: isSelected ? `0 0 0 2px ${colorToCss(color)}` : undefined,
        }}
      />
    </button>
  );
};
