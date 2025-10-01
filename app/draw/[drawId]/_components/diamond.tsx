import { colorToCss } from "@/lib/utils";
import { DiamondLayer } from "@/types/canvas";

interface DiamondProps {
  id: string;
  layer: DiamondLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Diamond = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: DiamondProps) => {
  const { x, y, width, height, fill } = layer;

  // Diamond points: top, right, bottom, left
  const points = `${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2}`;

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