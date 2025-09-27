import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { Kalam } from "next/font/google";
import { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "@/types/canvas";
import ContentEditable from "react-contenteditable";

const font = Kalam({
  weight: "400",
  subsets: ["latin"],
});


const calculateFontSize = (height: number , width: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.5; 
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;
    return Math.min(maxFontSize, fontSizeBasedOnHeight, fontSizeBasedOnWidth);
}


interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TextProps) => {
  
  
    const { x, y, width, height, fill, value } = layer;

    const updateValue = useMutation((
        {storage},
        newValue: string
    )=>{

        const liveLayers = storage.get("layers");

        liveLayers.get(id)?.set("value", newValue);

    },[])

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    }





  return (
    <foreignObject
    x={x}
    y={y}
    width={width}
    height={height}
    onPointerDown={(e) => onPointerDown(e, id)}
    style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
    }}
    
    >
      <ContentEditable
      className={cn(
        "w-full h-full flex items-center justify-center text-center drop-shadow-md outline-none",
        font.className,
      )}
      style={{
        color: fill? colorToCss(fill) : "#000",
        fontSize: calculateFontSize(height, width),
      }}

      html={value || "Text"} 
      onChange={handleContentChange} />


    </foreignObject>
  );
};
