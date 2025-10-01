import { colorToCss } from "@/lib/utils";
import { StarLayer } from "@/types/canvas";

interface StarProps {
  id: string;
  layer: StarLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Star = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: StarProps) => {
  const { x, y, width, height, fill } = layer;

  // Create a 5-pointed star
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = Math.min(width, height) / 2;
  const innerRadius = outerRadius * 0.4;

  let points = "";
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const pointX = centerX + radius * Math.cos(angle - Math.PI / 2);
    const pointY = centerY + radius * Math.sin(angle - Math.PI / 2);
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