import { colorToCss } from "@/lib/utils";
import { TriangleLayer } from "@/types/canvas";

interface TriangleProps {
  id: string;
  layer: TriangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Triangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TriangleProps) => {
  const { x, y, width, height, fill } = layer;

  // Triangle points: top center, bottom left, bottom right
  const points = `${width / 2},0 0,${height} ${width},${height}`;

  return (
    <polygon
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      points={points}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
    />
  );
};