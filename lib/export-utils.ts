export type ExportFormat = "svg" | "png" | "jpg" | "pdf";
export type ExportQuality = "low" | "medium" | "high" | "ultra";
export type ExportTheme = "light" | "dark" | "transparent";

// Helper function to sanitize filename for downloads
function sanitizeFilename(filename: string): string {
  // Remove or replace unsafe characters and trim whitespace
  return filename
    .trim()
    .replace(/[<>:"/\\|?*]/g, '-') // Replace unsafe characters with dash
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .replace(/-{2,}/g, '-') // Replace multiple dashes with single
    .slice(0, 100) // Limit length to 100 characters
    || 'drawing'; // Fallback if filename becomes empty
}

// Convert OKLCH colors to RGB for better compatibility
function convertOklchToRgb(colorString: string): string {
  // Simple conversion map for common OKLCH values used in the app
  const oklchMap: { [key: string]: string } = {
    'oklch(0.962 0.013 106.47)': '#f8fafc',   // slate-50
    'oklch(0.902 0.029 106.423)': '#e2e8f0',  // slate-200
    'oklch(0.278 0.029 256.848)': '#334155',  // slate-700
    'oklch(0.152 0.017 267.218)': '#0f172a',  // slate-900
    'oklch(0.026 0.014 285.82)': '#020617',   // slate-950
    'oklch(0.998 0.001 106.49)': '#ffffff',   // white
    'oklch(0 0 0)': '#000000',                // black
  };
  
  return oklchMap[colorString] || '#000000';
}

// Clean SVG string to ensure compatibility
function cleanSVGForExport(svgString: string): string {
  let cleanedSvg = svgString;
  
  // Replace OKLCH colors with RGB equivalents
  cleanedSvg = cleanedSvg.replace(/oklch\([^)]+\)/g, (match) => {
    const converted = convertOklchToRgb(match);
    console.log(`🎨 Converted ${match} to ${converted}`);
    return converted;
  });
  
  // Ensure Google Fonts are properly imported in style tag
  if (!cleanedSvg.includes('@import') && cleanedSvg.includes('Kalam')) {
    cleanedSvg = cleanedSvg.replace(
      /<style>/,
      `<style>@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');`
    );
  }
  
  return cleanedSvg;
}

/**
 * Export utilities for DrawBetter canvas
 * 
 * DrawBetter uses a Liveblocks-based collaborative SVG canvas with the following architecture:
 * - Pure SVG rendering (no Fabric.js or Canvas API)
 * - Layer-based system where each drawing element is a React component
 * - Real-time collaboration through Liveblocks
 * - Camera system with transform (translate/scale) for pan/zoom
 * 
 * Layer types:
 * - Rectangle: <rect> elements with translate transforms
 * - Ellipse: <ellipse> elements with translate transforms  
 * - Path: <path> elements for free drawing with translate transforms
 * - Text: <foreignObject> containing div elements with translate transforms
 * 
 * All layers are children of a transform group that applies camera transformations.
 * This export system extracts individual layers and creates a clean SVG for export.
 */

// Get clean SVG string for export (reused by all export functions)
async function getCleanSVGString(theme: ExportTheme = 'light'): Promise<string> {
  // Find the main canvas SVG element
  const canvasSVG = document.querySelector('svg.h-\\[100vh\\]') as SVGElement;
  if (!canvasSVG) {
    throw new Error('Canvas SVG not found');
  }

  // Find the transform group that contains all layers
  const transformGroup = canvasSVG.querySelector('g[style*="transform"]') as SVGGElement;
  if (!transformGroup) {
    throw new Error('Canvas transform group not found. Make sure you have drawings on the canvas.');
  }

  // Get all layer elements (direct children of the transform group)
  const layerElements = Array.from(transformGroup.children).filter(child => {
    // Filter out non-layer elements (like selection boxes, cursors, etc.)
    const tagName = child.tagName.toLowerCase();
    return ['rect', 'ellipse', 'path', 'foreignobject'].includes(tagName);
  });

  if (layerElements.length === 0) {
    throw new Error('No drawing layers found in the canvas.');
  }

  // Calculate bounds by examining all layer elements
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  for (const element of layerElements) {
    const style = element.getAttribute('style') || '';
    const transformMatch = style.match(/transform:\s*translate\(([^)]+)\)/);
    
    if (transformMatch) {
      const [translateX, translateY] = transformMatch[1].split(',').map(val => 
        parseFloat(val.replace('px', '').trim())
      );
      
      // Get element dimensions based on type
      let width = 0, height = 0;
      const tagName = element.tagName.toLowerCase();
      
      if (tagName === 'ellipse') {
        const rx = parseFloat(element.getAttribute('rx') || '0');
        const ry = parseFloat(element.getAttribute('ry') || '0');
        width = rx * 2;
        height = ry * 2;
      } else if (tagName === 'rect') {
        width = parseFloat(element.getAttribute('width') || '0');
        height = parseFloat(element.getAttribute('height') || '0');
      } else if (tagName === 'foreignobject') {
        width = parseFloat(element.getAttribute('width') || '0');
        height = parseFloat(element.getAttribute('height') || '0');
      } else if (tagName === 'path') {
        // For paths, we'll try to get bounds from the path data
        try {
          const pathElement = element as SVGPathElement;
          const bbox = pathElement.getBBox();
          width = bbox.width;
          height = bbox.height;
        } catch {
          // Fallback if getBBox fails
          width = 200;
          height = 200;
        }
      }
      
      minX = Math.min(minX, translateX);
      minY = Math.min(minY, translateY);
      maxX = Math.max(maxX, translateX + width);
      maxY = Math.max(maxY, translateY + height);
    }
  }

  const padding = 0; 
  const scale = 1; 
  const scaledWidth = (maxX - minX) * scale;
  const scaledHeight = (maxY - minY) * scale;
  const exportWidth = Math.ceil(scaledWidth + padding * 2);
  const exportHeight = Math.ceil(scaledHeight + padding * 2);
  const viewBoxX = minX - padding;
  const viewBoxY = minY - padding;

  // Create a new SVG for export
  const exportSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  exportSVG.setAttribute('width', exportWidth.toString());
  exportSVG.setAttribute('height', exportHeight.toString());
  exportSVG.setAttribute('viewBox', `${viewBoxX} ${viewBoxY} ${exportWidth} ${exportHeight}`);
  exportSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  // Add CSS styles for fonts and shadows
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
    
    .drop-shadow-md {
      filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    }
    
    .drop-shadow-xl {
      filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
    }
    
    .shadow-md {
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
    
    /* Font styles for text elements */
    .text-element {
      font-family: 'Kalam', cursive;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      outline: none;
    }
  `;
  defs.appendChild(style);
  exportSVG.appendChild(defs);

  // Add background based on theme
  if (theme !== 'transparent') {
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('x', viewBoxX.toString());
    background.setAttribute('y', viewBoxY.toString());
    background.setAttribute('width', exportWidth.toString());
    background.setAttribute('height', exportHeight.toString());
    background.setAttribute('fill', theme === 'light' ? 'white' : '#1a1a1a');
    exportSVG.appendChild(background);
  }

  // Create a group with scaling transformation
  const scaledGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  // Calculate the center point for scaling
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  scaledGroup.setAttribute('transform', `translate(${centerX}, ${centerY}) scale(${scale}) translate(${-centerX}, ${-centerY})`);

  // Clone all layer elements (without the camera transform)
  for (const element of layerElements) {
    const clonedElement = element.cloneNode(true) as SVGElement;
    
    // Remove any selection-related styling
    clonedElement.removeAttribute('stroke');
    if (clonedElement.getAttribute('stroke') === 'transparent') {
      clonedElement.setAttribute('stroke', 'transparent');
    }
    
    // Ensure drop-shadow classes are preserved and add font class for text
    if (clonedElement.tagName.toLowerCase() === 'foreignobject') {
      const divElement = clonedElement.querySelector('div');
      if (divElement) {
        divElement.classList.add('text-element');
        // Ensure the Kalam font is applied
        divElement.style.fontFamily = 'Kalam, cursive';
      }
    }
    
    scaledGroup.appendChild(clonedElement);
  }

  exportSVG.appendChild(scaledGroup);

  // Convert to string and clean
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(exportSVG);
  
  // Clean the SVG to remove problematic elements
  return cleanSVGForExport(svgString);
}

// Convert SVG to different formats using direct canvas approach
async function convertSVGToFormat(svgString: string, format: 'png' | 'jpg' | 'pdf', quality: number = 0.95, theme: ExportTheme = 'light', filename: string = 'drawing'): Promise<void> {
  console.log(`🔄 Converting SVG to ${format.toUpperCase()} with quality: ${quality}...`);
  
  if (format === 'pdf') {
    // Use specialized PDF conversion with quality
    await convertSVGToPDF(svgString, theme, quality, filename);
    return;
  }
  
  // For PNG/JPG, use direct canvas approach for better reliability
  return new Promise((resolve, reject) => {
    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    const img = new Image();
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Calculate scale factor based on quality for PNG (for resolution improvement)
        // Low: 1x, Medium: 1.5x, High: 2x, Ultra: 3x resolution
        const getScaleFactor = (format: string, quality: number): number => {
          if (format !== 'png') return 1; // Only scale PNG for resolution
          
          if (quality <= 0.6) return 1;      // Low: 1x
          if (quality <= 0.8) return 1.5;   // Medium: 1.5x  
          if (quality <= 0.95) return 2;    // High: 2x
          return 3;                          // Ultra: 3x
        };
        
        const scaleFactor = getScaleFactor(format, quality);
        
        // Set canvas dimensions with quality scaling for PNG
        const baseWidth = img.naturalWidth || img.width;
        const baseHeight = img.naturalHeight || img.height;
        canvas.width = Math.floor(baseWidth * scaleFactor);
        canvas.height = Math.floor(baseHeight * scaleFactor);
        
        // For JPG or light theme, fill with background color first
        if (format === 'jpg' || (theme === 'light' && format !== 'png')) {
          ctx.fillStyle = theme === 'light' ? '#ffffff' : '#1a1a1a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Scale the context for high-quality rendering
        if (scaleFactor !== 1) {
          ctx.scale(scaleFactor, scaleFactor);
        }
        
        // Draw the image
        ctx.drawImage(img, 0, 0);
        
        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to convert canvas to blob'));
            return;
          }
          
          // Create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${sanitizeFilename(filename)}.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up
          URL.revokeObjectURL(url);
          resolve();
        }, format === 'jpg' ? 'image/jpeg' : 'image/png', quality);
        
      } catch (error) {
        console.error('Canvas conversion error:', error);
        reject(error);
      }
    };
    
    img.onerror = (error) => {
      console.error('SVG image load error:', error);
      reject(new Error('Failed to load SVG as image'));
    };
    
    // Set CORS to handle cross-origin fonts
    img.crossOrigin = 'anonymous';
    img.src = svgDataUrl;
  });
}

// Export functions using the shared SVG generation

// Improved PDF conversion using jsPDF and direct canvas approach
async function convertSVGToPDF(svgString: string, theme: ExportTheme = 'light', quality: number = 0.95, filename: string = 'drawing'): Promise<void> {
  try {
    console.log('🔄 Starting PDF conversion...');
    
    // Dynamic import to avoid SSR issues
    const { jsPDF } = await import('jspdf');
    
    // First, try to convert SVG to image using canvas
    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = async () => {
        try {
          // Create a temporary canvas to draw the image
          const tempCanvas = document.createElement('canvas');
          const ctx = tempCanvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          // Calculate scale factor based on quality for better resolution
          // Low: 1x, Medium: 1.5x, High: 2x, Ultra: 2.5x resolution for PDF
          const getScaleFactor = (quality: number): number => {
            if (quality <= 0.6) return 1;      // Low: 1x
            if (quality <= 0.8) return 1.5;   // Medium: 1.5x  
            if (quality <= 0.95) return 2;    // High: 2x
            return 2.5;                        // Ultra: 2.5x (reasonable for PDF)
          };
          
          const scaleFactor = getScaleFactor(quality);
          
          // Set canvas dimensions with quality scaling
          const baseWidth = img.naturalWidth || img.width;
          const baseHeight = img.naturalHeight || img.height;
          tempCanvas.width = Math.floor(baseWidth * scaleFactor);
          tempCanvas.height = Math.floor(baseHeight * scaleFactor);
          
          // Fill with background color for PDF based on theme
          ctx.fillStyle = theme === 'light' ? '#ffffff' : '#1a1a1a';
          ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          
          // Scale the context for high-quality rendering
          ctx.scale(scaleFactor, scaleFactor);
          
          // Draw the SVG image
          ctx.drawImage(img, 0, 0);
          
          // Get canvas dimensions for PDF calculation (use original dimensions for layout)
          const imgWidth = baseWidth;
          const imgHeight = baseHeight;
          
          // Calculate PDF page size based on canvas aspect ratio
          const aspectRatio = imgWidth / imgHeight;
          const a4Width = 210; // A4 width in mm
          const a4Height = 297; // A4 height in mm
          
          let pdfWidth, pdfHeight;
          
          if (aspectRatio > a4Width / a4Height) {
            // Wide canvas - fit to width
            pdfWidth = a4Width;
            pdfHeight = a4Width / aspectRatio;
          } else {
            // Tall canvas - fit to height
            pdfHeight = a4Height;
            pdfWidth = a4Height * aspectRatio;
          }
          
          // Create PDF with calculated dimensions
          const pdf = new jsPDF({
            orientation: aspectRatio > 1 ? 'landscape' : 'portrait',
            unit: 'mm',
            format: [pdfWidth, pdfHeight]
          });
          
          // Convert canvas to data URL with quality setting
          const imgData = tempCanvas.toDataURL('image/png', quality);
          
          // Add image to PDF (positioned at 0,0 and scaled to fit)
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          
          // Download the PDF
          pdf.save(`${sanitizeFilename(filename)}.pdf`);
          
          console.log('✅ PDF conversion successful');
          resolve();
          
        } catch (error) {
          console.error('PDF canvas conversion failed:', error);
          reject(error);
        }
      };
      
      img.onerror = (error) => {
        console.error('SVG image load failed:', error);
        reject(new Error('Failed to load SVG as image for PDF conversion'));
      };
      
      // Set CORS to handle cross-origin fonts
      img.crossOrigin = 'anonymous';
      img.src = svgDataUrl;
    });
    
  } catch (error) {
    console.error('PDF conversion failed:', error);
    throw new Error(`PDF export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Export functions using the shared SVG generation

// SVG Export - uses the shared SVG generation
export async function exportCanvasSVG(theme: ExportTheme = 'light', filename: string = 'drawing'): Promise<void> {
  try {
    console.log('🎯 Starting SVG export...');
    
    // Get the clean SVG string
    const cleanedSvgString = await getCleanSVGString(theme);
    
    // Create blob and download
    const blob = new Blob([cleanedSvgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizeFilename(filename)}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    console.log('✅ SVG export successful');
  } catch (error) {
    console.error('❌ SVG export failed:', error);
    throw error;
  }
}

// PNG Export - uses the shared SVG as source
export async function exportCanvasPNG(quality: ExportQuality = 'high', theme: ExportTheme = 'light', filename: string = 'drawing'): Promise<void> {
  try {
    console.log('🎯 Starting PNG export...');
    
    // Get the clean SVG string
    const svgString = await getCleanSVGString(theme);
    
    // Convert quality to number
    const qualityValue = getQualityValue(quality);
    
    // Convert SVG to PNG
    await convertSVGToFormat(svgString, 'png', qualityValue, theme, filename);
    
    console.log('✅ PNG export successful');
  } catch (error) {
    console.error('❌ PNG export failed:', error);
    throw error;
  }
}

// JPG Export - uses the shared SVG as source
export async function exportCanvasJPG(quality: ExportQuality = 'high', theme: ExportTheme = 'light', filename: string = 'drawing'): Promise<void> {
  try {
    console.log('🎯 Starting JPG export...');
    
    // Get the clean SVG string
    const svgString = await getCleanSVGString(theme);
    
    // Convert quality to number
    const qualityValue = getQualityValue(quality);
    
    // Convert SVG to JPG
    await convertSVGToFormat(svgString, 'jpg', qualityValue, theme, filename);
    
    console.log('✅ JPG export successful');
  } catch (error) {
    console.error('❌ JPG export failed:', error);
    throw error;
  }
}

// PDF Export - uses the shared SVG as source
export async function exportCanvasPDF(quality: ExportQuality = 'high', theme: ExportTheme = 'light', filename: string = 'drawing'): Promise<void> {
  try {
    console.log('🎯 Starting PDF export...');
    
    // Get the clean SVG string
    const svgString = await getCleanSVGString(theme);
    
    // Convert quality to number
    const qualityValue = getQualityValue(quality);
    
    // Convert SVG to PDF with quality
    await convertSVGToFormat(svgString, 'pdf', qualityValue, theme, filename);
    
    console.log('✅ PDF export successful');
  } catch (error) {
    console.error('❌ PDF export failed:', error);
    throw error;
  }
}

// Helper function to convert quality enum to number
function getQualityValue(quality: ExportQuality): number {
  switch (quality) {
    case 'low': return 0.6;
    case 'medium': return 0.8;
    case 'high': return 0.95;
    case 'ultra': return 1.0;
    default: return 0.95;
  }
}