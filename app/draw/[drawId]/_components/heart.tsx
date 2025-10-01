import { colorToCss } from "@/lib/utils";
import { HeartLayer } from "@/types/canvas";

interface HeartProps {
  id: string;
  layer: HeartLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Heart = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: HeartProps) => {
  const { x, y, width, height, fill } = layer;

  // Create a proper heart shape using the mathematical heart curve
  // This creates a more accurate and beautiful heart shape
  
  const centerX = width / 2;
  const scale = Math.min(width, height) / 16; // Scale factor for the heart
  
  // Heart shape using proper mathematical curves
  // Two circles for the top lobes and a curved bottom
  const pathData = `
    M ${centerX},${height * 0.3}
    C ${centerX},${height * 0.3} ${centerX - (4 * scale)},${height * 0.1} ${centerX - (7 * scale)},${height * 0.2}
    C ${centerX - (10 * scale)},${height * 0.3} ${centerX - (10 * scale)},${height * 0.5} ${centerX - (7 * scale)},${height * 0.6}
    C ${centerX - (4 * scale)},${height * 0.7} ${centerX},${height * 0.9} ${centerX},${height * 0.9}
    C ${centerX},${height * 0.9} ${centerX + (4 * scale)},${height * 0.7} ${centerX + (7 * scale)},${height * 0.6}
    C ${centerX + (10 * scale)},${height * 0.5} ${centerX + (10 * scale)},${height * 0.3} ${centerX + (7 * scale)},${height * 0.2}
    C ${centerX + (4 * scale)},${height * 0.1} ${centerX},${height * 0.3} ${centerX},${height * 0.3}
    Z
  `;

  return (
    <path
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      d={pathData}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
    />
  );
};