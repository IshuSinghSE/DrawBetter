"use client";

import { Color } from "@/types/canvas";
import { ColorPicker } from "./color-picker";

interface ColorPaletteProps {
  onChange: (color: Color) => void;
  currentColor: Color;
}

export const ColorPalette = ({ onChange, currentColor }: ColorPaletteProps) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-white rounded-md p-1.5 shadow-md">
        <ColorPicker onChange={onChange} currentColor={currentColor} />
      </div>
    </div>
  );
};

export default ColorPalette;