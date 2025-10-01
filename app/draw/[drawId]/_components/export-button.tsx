"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Hint } from "@/components/hint";
import { exportCanvasSVG } from "@/lib/export-utils";

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

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportCanvasSVG();
      
      console.log(`✅ SVG export successful: ${drawTitle}.svg`);
    } catch (error) {
      console.error("Export failed:", error);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : "Export failed. Please try again.";
      
      if (typeof window !== 'undefined') {
        alert(`Export failed: ${errorMessage}`);
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Hint label="Export as SVG" side="bottom" sideOffset={10}>
      <Button
        variant={variant}
        size={size}
        onClick={handleExport}
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