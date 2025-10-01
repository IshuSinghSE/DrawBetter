"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, FileImage, FileText, Image, Palette, Settings } from "lucide-react";
import { exportCanvasSVG, exportCanvasPNG, exportCanvasJPG, exportCanvasPDF } from "@/lib/export-utils";

interface ExportDialogProps {
  drawTitle: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | null | undefined;
  showLabel?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  className?: string;
}

type ExportFormat = 'svg' | 'png' | 'jpg' | 'pdf';
type ExportQuality = 'low' | 'medium' | 'high' | 'ultra';
type ExportTheme = 'light' | 'dark' | 'transparent';

export const ExportDialog = ({ 
  drawTitle = "drawing", 
  variant = "default",
  size = "icon",
  showLabel = false,
  className = ""
}: ExportDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);
  

  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');
  const [selectedQuality, setSelectedQuality] = useState<ExportQuality>('high');
  const [selectedTheme, setSelectedTheme] = useState<ExportTheme>('light');

  const formatOptions = [
    { value: 'svg', label: 'SVG Vector', icon: FileText, description: 'Scalable vector format, perfect quality' },
    { value: 'png', label: 'PNG Image', icon: Image, description: 'High quality with transparency support' },
    { value: 'jpg', label: 'JPG Image', icon: FileImage, description: 'Compressed format, smaller file size' },
    { value: 'pdf', label: 'PDF Document', icon: FileText, description: 'Professional document format' },
  ];

  const getQualityDescription = (quality: string) => {
    const baseDescriptions = {
      'low': 'Low quality - Smaller file size, faster export',
      'medium': 'Medium quality - Balanced size & quality',
      'high': 'High quality - Best balance (recommended)',
      'ultra': 'Ultra quality - Maximum resolution & detail',
    };
    
    const formatSpecific = selectedFormat === 'png' 
      ? ' (affects resolution)' 
      : selectedFormat === 'jpg' 
        ? ' (affects compression)' 
        : ' (affects resolution & compression)';
    
    return baseDescriptions[quality as keyof typeof baseDescriptions] + formatSpecific;
  };

  const qualityOptions = [
    { value: 'low', label: 'Low Quality', description: getQualityDescription('low') },
    { value: 'medium', label: 'Medium Quality', description: getQualityDescription('medium') },
    { value: 'high', label: 'High Quality', description: getQualityDescription('high') },
    { value: 'ultra', label: 'Ultra Quality', description: getQualityDescription('ultra') },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light Theme', description: 'White background (recommended)' },
    { value: 'transparent', label: 'Transparent', description: 'No background (PNG/SVG only)' },
  ];

  const handleExport = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    setExportingFormat(selectedFormat);
    
    try {
      switch (selectedFormat) {
        case 'svg':
          await exportCanvasSVG(selectedTheme, drawTitle);
          break;
        case 'png':
          await exportCanvasPNG(selectedQuality, selectedTheme, drawTitle);
          break;
        case 'jpg':
          await exportCanvasJPG(selectedQuality, selectedTheme, drawTitle);
          break;
        case 'pdf':
          await exportCanvasPDF(selectedQuality, selectedTheme, drawTitle);
          break;
        default:
          throw new Error(`Unsupported format: ${selectedFormat}`);
      }
      
      setOpen(false); 
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

  const selectedFormatOption = formatOptions.find(f => f.value === selectedFormat);
  const Icon = selectedFormatOption?.icon || Download;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`${className} flex items-center gap-1`}
          title="Export canvas"
        >
          <Download className="h-4 w-4" />
          {showLabel && <span className="ml-1">Export</span>}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Drawing
          </DialogTitle>
          <DialogDescription>
            Choose your export format, quality, and theme settings
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export Format
            </Label>
            <Select value={selectedFormat} onValueChange={(value: ExportFormat) => setSelectedFormat(value)}>
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {selectedFormatOption?.label}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((format) => {
                  const FormatIcon = format.icon;
                  return (
                    <SelectItem key={format.value} value={format.value}>
                      <div className="flex items-center gap-3">
                        <FormatIcon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{format.label}</div>
                          <div className="text-xs text-muted-foreground">{format.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Quality Selection - Hidden for SVG since it's vector-based */}
          {selectedFormat !== 'svg' && (
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Export Quality
              </Label>
              <Select value={selectedQuality} onValueChange={(value: ExportQuality) => setSelectedQuality(value)}>
                <SelectTrigger>
                  <SelectValue>
                    {qualityOptions.find(q => q.value === selectedQuality)?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {qualityOptions.map((quality) => (
                    <SelectItem key={quality.value} value={quality.value}>
                      <div>
                        <div className="font-medium">{quality.label}</div>
                        <div className="text-xs text-muted-foreground">{quality.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Theme Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Background Theme
            </Label>
            <Select value={selectedTheme} onValueChange={(value: ExportTheme) => setSelectedTheme(value)}>
              <SelectTrigger>
                <SelectValue>
                  {themeOptions.find(t => t.value === selectedTheme)?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {themeOptions.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    <div>
                      <div className="font-medium">{theme.label}</div>
                      <div className="text-xs text-muted-foreground">{theme.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preview/Info */}
          <div className="rounded-lg border p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  Export Preview: {selectedFormatOption?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  Quality: {selectedQuality} • Theme: {selectedTheme} • Filename: {drawTitle}.{selectedFormat}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedFormatOption?.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Download className="mr-2 h-4 w-4 animate-spin" />
                Exporting {exportingFormat?.toUpperCase()}...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export {selectedFormat.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};