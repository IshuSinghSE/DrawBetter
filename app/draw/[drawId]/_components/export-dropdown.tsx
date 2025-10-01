"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportCanvasSVG, exportCanvasPNG, exportCanvasJPG, exportCanvasPDF } from "@/lib/export-utils";

interface ExportDropdownProps {
  drawTitle?: string;
  variant?: "default" | "outline" | "ghost" | "draw";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
  className?: string;
}

export const ExportDropdown = ({ 
  variant = "draw",
  size = "icon",
  showLabel = false,
  className = ""
}: ExportDropdownProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);

  const handleExport = async (format: 'svg' | 'png' | 'jpg' | 'pdf') => {
    if (isExporting) return;
    
    setIsExporting(true);
    setExportingFormat(format);
    
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
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
      
    } catch (error) {
      
      const errorMessage = error instanceof Error ? error.message : "Export failed. Please try again.";
      
      if (typeof window !== 'undefined') {
        alert(`Export failed: ${errorMessage}`);
      }
    } finally {
      setIsExporting(false);
      setExportingFormat(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={isExporting}
          className={`${className} flex items-center gap-1`}
          title="Export canvas"
        >
          <Download className="h-4 w-4" />
          {showLabel && (
            <span className="ml-1">
              {isExporting ? `Exporting ${exportingFormat?.toUpperCase()}...` : "Export"}
            </span>
          )}
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40" side="bottom" sideOffset={5}>
        <DropdownMenuItem 
          onClick={() => {
            handleExport('svg');
          }}
          disabled={isExporting}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Export as SVG
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            handleExport('png');
          }}
          disabled={isExporting}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            handleExport('jpg');
          }}
          disabled={isExporting}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Export as JPG
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            handleExport('pdf');
          }}
          disabled={isExporting}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};