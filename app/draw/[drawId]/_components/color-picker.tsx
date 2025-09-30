"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
  currentColor?: Color;
}

export const ColorPicker = ({ onChange, currentColor }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton onClick={onChange} color={{ r: 255, g: 0, b: 0 }} currentColor={currentColor} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 255, b: 0 }} currentColor={currentColor} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 255 }} currentColor={currentColor} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 0 }} currentColor={currentColor} />
      {/* <ColorButton onClick={onChange} color={{ r: 0, g: 255, b: 255 }} currentColor={currentColor} /> */}
      <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 255 }} currentColor={currentColor} />
      <ColorButton onClick={onChange} color={{ r: 128, g: 0, b: 128 }} currentColor={currentColor} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 0 }} currentColor={currentColor} />
      <ColorButton onClick={onChange} color={{ r: 252 , g: 142, b: 172 }} currentColor={currentColor} />
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
  currentColor?: Color;
}

const ColorButton = ({ onClick, color, currentColor }: ColorButtonProps) => {
  const isSelected = currentColor && 
    currentColor.r === color.r && 
    currentColor.g === color.g && 
    currentColor.b === color.b;

  return (
    <button
      className={`w-8 h-8 items-center flex justify-center 
       hover:opacity-75 transition ${isSelected ? 'ring-2 ring-blue-500' : ''}
       `}
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{
          background: colorToCss(color),
        }}
      />
    </button>
  );
};
