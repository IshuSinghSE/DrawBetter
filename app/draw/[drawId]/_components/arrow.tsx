import { colorToCss } from "@/lib/utils";
import { ArrowLayer } from "@/types/canvas";

interface ArrowProps {
  id: string;
  layer: ArrowLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Arrow = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: ArrowProps) => {
  const { x, y, width, height, fill } = layer;

  // Create arrow pointing right
  const arrowHeight = height * 0.6;
  const arrowWidth = width * 0.8;

  const points = `
    0,${(height - arrowHeight) / 2}
    ${arrowWidth},${(height - arrowHeight) / 2}
    ${arrowWidth},0
    ${width},${height / 2}
    ${arrowWidth},${height}
    ${arrowWidth},${(height + arrowHeight) / 2}
    0,${(height + arrowHeight) / 2}
  `;

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