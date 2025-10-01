import { colorToCss } from "@/lib/utils";
import { HexagonLayer } from "@/types/canvas";

interface HexagonProps {
  id: string;
  layer: HexagonLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Hexagon = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: HexagonProps) => {
  const { x, y, width, height, fill } = layer;

  // Create hexagon points
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;

  let points = "";
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
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