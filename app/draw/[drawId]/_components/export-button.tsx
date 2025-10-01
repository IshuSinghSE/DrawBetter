"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Hint } from "@/components/hint";
import { exportCanvasSVG, exportCanvasPNG, exportCanvasJPG, exportCanvasPDF } from "@/lib/export-utils";

interface ExportButtonProps {
  drawTitle?: string;
  variant?: "default" | "outline" | "ghost" | "draw";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
  className?: string;
}

export const ExportButton = ({ 
  drawTitle = "drawing", 
  variant = "draw",
  size = "icon",
  showLabel = false,
  className = ""
}: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'svg' | 'png' | 'jpg' | 'pdf') => {
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      switch (format) {
        case 'svg':
          await exportCanvasSVG();
          break;
        case 'png':
          await exportCanvasPNG();
          break;
        case 'jpg':
          await exportCanvasJPG();
          break;
        case 'pdf':
          await exportCanvasPDF();
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Hint label="Export as SVG" side="bottom" sideOffset={10}>
      <Button
        variant={variant}
        size={size}
        onClick={() => handleExport('svg')}
        disabled={isExporting}
        className={className}
      >
        <Download className="h-4 w-4" />
        {showLabel && (
          <span className="ml-2">
            {isExporting ? "Exporting..." : "Export"}
          </span>
        )}
      </Button>
    </Hint>
  );
};