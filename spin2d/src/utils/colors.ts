import { ApartmentStatus } from '../types';

// Highlight colors for different statuses
export const statusColors: Record<ApartmentStatus, string> = {
  available: 'rgba(34, 197, 94, 0.6)',   // Green
  reserved: 'rgba(234, 179, 8, 0.6)',    // Yellow
  sold: 'rgba(239, 68, 68, 0.6)',        // Red
};

// Hover highlight (lighter version)
export const hoverHighlight = 'rgba(255, 255, 255, 0.3)';

// Selected highlight (gray with pulse)
export const selectedHighlight = 'rgba(107, 114, 128, 0.7)';

// POI highlight
export const poiHighlight = 'rgba(237, 115, 33, 0.7)'; // Primary orange

// Parse hex color to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Compare two colors with tolerance
export const colorsMatch = (
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number },
  tolerance: number = 5
): boolean => {
  return (
    Math.abs(color1.r - color2.r) <= tolerance &&
    Math.abs(color1.g - color2.g) <= tolerance &&
    Math.abs(color1.b - color2.b) <= tolerance
  );
};

// Get color at pixel from ImageData
export const getPixelColor = (
  imageData: ImageData,
  x: number,
  y: number
): { r: number; g: number; b: number; a: number } => {
  const index = (y * imageData.width + x) * 4;
  return {
    r: imageData.data[index],
    g: imageData.data[index + 1],
    b: imageData.data[index + 2],
    a: imageData.data[index + 3],
  };
};

// Blend two colors
export const blendColors = (
  baseColor: string,
  overlayColor: string,
  opacity: number
): string => {
  const base = hexToRgb(baseColor);
  const overlay = hexToRgb(overlayColor);
  
  if (!base || !overlay) return baseColor;
  
  const r = Math.round(base.r * (1 - opacity) + overlay.r * opacity);
  const g = Math.round(base.g * (1 - opacity) + overlay.g * opacity);
  const b = Math.round(base.b * (1 - opacity) + overlay.b * opacity);
  
  return `rgb(${r}, ${g}, ${b})`;
};
