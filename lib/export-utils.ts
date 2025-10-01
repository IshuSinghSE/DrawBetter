export type ExportFormat = "svg" | "png" | "pdf";
export type ExportQuality = "low" | "medium" | "high" | "ultra";

interface ExportOptions {
  format: ExportFormat;
  quality: ExportQuality;
  filename?: string;
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
 * - Text: <foreignObject> containing contenteditable divs
 * - Path: <path> elements using perfect-freehand for drawing
 * - Note: Special text elements
 */

// Export function that works with Liveblocks layer system
// Export function that works with Liveblocks layer system
export async function exportCanvasSVG(): Promise<void> {
  try {
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

    // Add white background
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('x', viewBoxX.toString());
    background.setAttribute('y', viewBoxY.toString());
    background.setAttribute('width', exportWidth.toString());
    background.setAttribute('height', exportHeight.toString());
    background.setAttribute('fill', 'white');
    exportSVG.appendChild(background);

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

    // Convert to string and create blob
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(exportSVG);
    
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `canvas-export-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}

// Placeholder functions for future PNG/PDF export
export async function exportCanvasPNG(): Promise<void> {
  alert('PNG export not yet implemented');
}

export async function exportCanvasPDF(): Promise<void> {
  alert('PDF export not yet implemented');
}