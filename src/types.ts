export type ApartmentStatus = 'available' | 'reserved' | 'sold';

export interface Apartment {
  id: string;
  index: string; // A.1, A.2, etc.
  floor: number;
  area: number;
  rooms: number;
  price: number;
  pricePerSqm: number;
  status: ApartmentStatus;
  
  // Boolean attributes
  garden: boolean;
  terrace: boolean;
  balcony: boolean;
  loggia: boolean;
  
  // Additional options
  ac: boolean; // Air conditioning
  smartHome: boolean;
  
  // Technical
  frameNumber: number; // The frame index where this apartment is best visible/centered
  
  // Layout images (mock paths)
  layoutImage2d: string;
  layoutImage3d: string;
}

export interface FilterState {
  area: [number, number];
  price: [number, number];
  rooms: [number, number];
  floors: [number, number];
  
  status: ApartmentStatus[]; // empty means all
  
  // Advanced filters
  garden: boolean;
  terrace: boolean;
  balcony: boolean;
  loggia: boolean;
  ac: boolean;
  smartHome: boolean;
}

export type ViewMode = 'building' | 'plan' | 'tour' | 'balcony';
export type SidebarTab = 'filters' | 'location' | 'gallery' | 'comparison';
export type ResultViewMode = 'table' | 'cards';
