import { colorToCss } from "@/lib/utils";
import { PentagonLayer } from "@/types/canvas";

interface PentagonProps {
  id: string;
  layer: PentagonLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Pentagon = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: PentagonProps) => {
  const { x, y, width, height, fill } = layer;

  // Create pentagon points
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;

  let points = "";
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2; // Start from top
    const pointX = centerX + radius * Math.cos(angle);
    const pointY = centerY + radius * Math.sin(angle);
    points += `${pointX},${pointY} `;
  }

  return (
    <polygon
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      points={points.trim()}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
    />
  );
};