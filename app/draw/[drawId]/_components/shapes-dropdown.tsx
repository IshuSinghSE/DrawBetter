'use client';
import React, { useState, useEffect } from "react";
import { 
  Square, 
  Circle, 
  Triangle, 
  Diamond, 
  Hexagon, 
  Star, 
  ArrowRight, 
  Heart,
  Pentagon,
  ChevronDown,
  LucideIcon
} from "lucide-react";
import { LayerType, CanvasMode, CanvasState } from "@/types/canvas";

type ShapeLayerType = LayerType.Rectangle | LayerType.Ellipse | LayerType.Triangle | LayerType.Diamond | LayerType.Hexagon | LayerType.Star | LayerType.Arrow | LayerType.Heart | LayerType.Pentagon;

interface ShapesDropdownProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
}

const shapes: { type: ShapeLayerType; icon: LucideIcon; label: string }[] = [
  { type: LayerType.Rectangle, icon: Square, label: "Rectangle" },
  { type: LayerType.Ellipse, icon: Circle, label: "Circle" },
  { type: LayerType.Triangle, icon: Triangle, label: "Triangle" },
  { type: LayerType.Diamond, icon: Diamond, label: "Diamond" },
  { type: LayerType.Hexagon, icon: Hexagon, label: "Hexagon" },
  { type: LayerType.Star, icon: Star, label: "Star" },
  { type: LayerType.Arrow, icon: ArrowRight, label: "Arrow" },
  { type: LayerType.Heart, icon: Heart, label: "Heart" },
  { type: LayerType.Pentagon, icon: Pentagon, label: "Pentagon" },
];

export const ShapesDropdown: React.FC<ShapesDropdownProps> = ({
  canvasState,
  setCanvasState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState<ShapeLayerType>(LayerType.Rectangle);

  // Update selected shape when canvas state changes
  useEffect(() => {
    if (canvasState.mode === CanvasMode.Inserting && 
        canvasState.layerType !== LayerType.Text && 
        canvasState.layerType !== LayerType.Note) {
      setSelectedShape(canvasState.layerType as ShapeLayerType);
    }
  }, [canvasState]);

  const currentShape = shapes.find(shape => shape.type === selectedShape) || shapes[0];

  const handleShapeSelect = (shapeType: ShapeLayerType) => {
    setSelectedShape(shapeType);
    setCanvasState({
      mode: CanvasMode.Inserting,
      layerType: shapeType,
    });
    setIsOpen(false);
  };

  const isShapeActive = canvasState.mode === CanvasMode.Inserting && 
    canvasState.layerType !== LayerType.Text && 
    canvasState.layerType !== LayerType.Note;

  return (
    <div className="relative">
      {/* Combined shape button with dropdown */}
      <div className="flex items-center bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors">
        {/* Main shape button */}
        <button
          onClick={() => handleShapeSelect(selectedShape)}
          className={`flex items-center justify-center w-10 h-10 rounded-l-md transition-colors duration-200 ${
            isShapeActive 
              ? "bg-blue-500 text-white" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
          title={`${currentShape.label} (S)`}
        >
          <currentShape.icon className="h-4 w-4" />
        </button>
        
        {/* Dropdown arrow button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-6 h-10 border-l border-gray-200 rounded-r-md transition-colors duration-200 ${
            isShapeActive 
              ? "bg-blue-500 text-white border-blue-400" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
          title="More shapes"
        >
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-full -top-1/20 ml-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-[100] min-w-[240px] animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="text-xs font-medium text-gray-500 mb-2 px-1">Choose a shape</div>
          <div className="grid grid-cols-3 gap-2">
            {shapes.map((shape) => (
              <button
                key={shape.type}
                onClick={() => handleShapeSelect(shape.type)}
                className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 border-2 hover:scale-105 ${
                  selectedShape === shape.type
                    ? "bg-blue-50 text-blue-600 border-blue-200 shadow-sm"
                    : "hover:bg-gray-50 text-gray-600 border-transparent hover:border-gray-200"
                }`}
                title={shape.label}
              >
                <shape.icon className="h-5 w-5" />
                <span className="text-xs font-medium cursor-none">{shape.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};