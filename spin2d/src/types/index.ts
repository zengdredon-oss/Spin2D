// Apartment status
export type ApartmentStatus = 'available' | 'reserved' | 'sold';

// Apartment interface
export interface Apartment {
  id: string;
  index: string; // e.g., "A.1", "A.2", "F.5.1"
  building: string; // Building letter/name
  floor: number;
  area: number; // m²
  rooms: number;
  price: number;
  pricePerM2: number;
  status: ApartmentStatus;
  
  // Additional attributes
  hasGarden: boolean;
  hasTerrace: boolean;
  hasBalcony: boolean;
  hasLoggia: boolean;
  
  // Additional options
  hasAirConditioning: boolean;
  hasSmartHome: boolean;
  
  // Technical
  frameNumber: number; // Frame number for animation
  maskColor: string; // Color in mask image for this apartment
  
  // Images
  floorPlanImage?: string;
  floorPlan3DImage?: string;
  tour360Url?: string;
  balconyPanoramaUrl?: string;
  
  // Promotion
  hasPromotion?: boolean;
  originalPrice?: number;
  promotionLabel?: string;
}

// Point of Interest types
export type POICategory = 'school' | 'kindergarten' | 'hospital' | 'metro' | 'park' | 'shop' | 'restaurant' | 'gym' | 'pharmacy' | 'bank';

export interface PointOfInterest {
  id: string;
  name: string;
  category: POICategory;
  distance: number; // in meters
  maskColor: string;
  frameNumber: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Filter state
export interface FilterState {
  areaRange: [number, number];
  priceRange: [number, number];
  roomsRange: [number, number];
  floorRange: [number, number];
  status: ApartmentStatus | 'all';
  
  // Additional filters
  hasGarden: boolean | null;
  hasTerrace: boolean | null;
  hasBalcony: boolean | null;
  hasLoggia: boolean | null;
  hasAirConditioning: boolean | null;
  hasSmartHome: boolean | null;
}

// View modes
export type ViewMode = 'building' | 'floorplan' | 'floorplan3d' | 'tour360' | 'balcony';
export type ResultsViewMode = 'table' | 'cards';
export type TabMode = 'apartments' | 'location' | 'gallery' | 'comparison';

// Building data
export interface Building {
  id: string;
  name: string;
  label: string;
  apartments: Apartment[];
  frameCount: number;
  imagesBasePath: string;
  masksBasePath: string;
}

// Gallery item
export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  thumbnailUrl: string;
}

// Color mapping for masks
export interface ColorMapping {
  color: string; // hex color
  entityId: string; // apartment or POI id
  entityType: 'apartment' | 'poi';
}

// Comparison state
export interface ComparisonState {
  apartmentIds: string[];
  maxItems: number;
}

// Sort configuration
export interface SortConfig {
  field: keyof Apartment;
  direction: 'asc' | 'desc';
}
