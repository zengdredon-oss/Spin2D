import { create } from 'zustand';
import { 
  Apartment, 
  FilterState, 
  ViewMode, 
  ResultsViewMode, 
  TabMode, 
  SortConfig,
  ApartmentStatus
} from '../types';
import { allApartments, filterBounds, buildings } from '../data/apartments';

interface AppState {
  // Current building
  currentBuildingId: string;
  setCurrentBuilding: (id: string) => void;
  
  // Selected apartment
  selectedApartmentId: string | null;
  setSelectedApartment: (id: string | null) => void;
  
  // Hovered apartment
  hoveredApartmentId: string | null;
  setHoveredApartment: (id: string | null) => void;
  
  // Current frame
  currentFrame: number;
  setCurrentFrame: (frame: number) => void;
  
  // View modes
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  resultsViewMode: ResultsViewMode;
  setResultsViewMode: (mode: ResultsViewMode) => void;
  tabMode: TabMode;
  setTabMode: (mode: TabMode) => void;
  
  // Filters
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  
  // Sort
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  
  // Comparison
  comparisonIds: string[];
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
  
  // UI State
  isMenuCollapsed: boolean;
  setMenuCollapsed: (collapsed: boolean) => void;
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  isRotating: boolean;
  setIsRotating: (rotating: boolean) => void;
  
  // Computed
  getFilteredApartments: () => Apartment[];
  getSelectedApartment: () => Apartment | undefined;
  getCurrentBuilding: () => typeof buildings[0] | undefined;
}

const defaultFilters: FilterState = {
  areaRange: [filterBounds.area.min, filterBounds.area.max],
  priceRange: [filterBounds.price.min, filterBounds.price.max],
  roomsRange: [filterBounds.rooms.min, filterBounds.rooms.max],
  floorRange: [filterBounds.floor.min, filterBounds.floor.max],
  status: 'all',
  hasGarden: null,
  hasTerrace: null,
  hasBalcony: null,
  hasLoggia: null,
  hasAirConditioning: null,
  hasSmartHome: null,
};

export const useStore = create<AppState>((set, get) => ({
  // Current building
  currentBuildingId: 'building-f',
  setCurrentBuilding: (id) => set({ currentBuildingId: id }),
  
  // Selected apartment
  selectedApartmentId: null,
  setSelectedApartment: (id) => {
    set({ selectedApartmentId: id });
    if (id) {
      const apartment = allApartments.find(a => a.id === id);
      if (apartment) {
        set({ currentFrame: apartment.frameNumber });
      }
    }
  },
  
  // Hovered apartment
  hoveredApartmentId: null,
  setHoveredApartment: (id) => set({ hoveredApartmentId: id }),
  
  // Current frame
  currentFrame: 0,
  setCurrentFrame: (frame) => set({ currentFrame: frame }),
  
  // View modes
  viewMode: 'building',
  setViewMode: (mode) => set({ viewMode: mode }),
  resultsViewMode: 'table',
  setResultsViewMode: (mode) => set({ resultsViewMode: mode }),
  tabMode: 'apartments',
  setTabMode: (mode) => set({ tabMode: mode }),
  
  // Filters
  filters: defaultFilters,
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  resetFilters: () => set({ filters: defaultFilters }),
  
  // Sort
  sortConfig: { field: 'index', direction: 'asc' },
  setSortConfig: (config) => set({ sortConfig: config }),
  
  // Comparison
  comparisonIds: [],
  addToComparison: (id) => set((state) => {
    if (state.comparisonIds.length >= 4) return state;
    if (state.comparisonIds.includes(id)) return state;
    return { comparisonIds: [...state.comparisonIds, id] };
  }),
  removeFromComparison: (id) => set((state) => ({
    comparisonIds: state.comparisonIds.filter(i => i !== id)
  })),
  clearComparison: () => set({ comparisonIds: [] }),
  isInComparison: (id) => get().comparisonIds.includes(id),
  
  // UI State
  isMenuCollapsed: false,
  setMenuCollapsed: (collapsed) => set({ isMenuCollapsed: collapsed }),
  showOverlay: true,
  setShowOverlay: (show) => set({ showOverlay: show }),
  isRotating: false,
  setIsRotating: (rotating) => set({ isRotating: rotating }),
  
  // Computed
  getFilteredApartments: () => {
    const { filters, sortConfig, currentBuildingId } = get();
    const building = buildings.find(b => b.id === currentBuildingId);
    let apartments = building ? building.apartments : allApartments;
    
    // Apply filters
    apartments = apartments.filter(apt => {
      // Area filter
      if (apt.area < filters.areaRange[0] || apt.area > filters.areaRange[1]) return false;
      
      // Price filter
      if (apt.price < filters.priceRange[0] || apt.price > filters.priceRange[1]) return false;
      
      // Rooms filter
      if (apt.rooms < filters.roomsRange[0] || apt.rooms > filters.roomsRange[1]) return false;
      
      // Floor filter
      if (apt.floor < filters.floorRange[0] || apt.floor > filters.floorRange[1]) return false;
      
      // Status filter
      if (filters.status !== 'all' && apt.status !== filters.status) return false;
      
      // Additional filters
      if (filters.hasGarden !== null && apt.hasGarden !== filters.hasGarden) return false;
      if (filters.hasTerrace !== null && apt.hasTerrace !== filters.hasTerrace) return false;
      if (filters.hasBalcony !== null && apt.hasBalcony !== filters.hasBalcony) return false;
      if (filters.hasLoggia !== null && apt.hasLoggia !== filters.hasLoggia) return false;
      if (filters.hasAirConditioning !== null && apt.hasAirConditioning !== filters.hasAirConditioning) return false;
      if (filters.hasSmartHome !== null && apt.hasSmartHome !== filters.hasSmartHome) return false;
      
      return true;
    });
    
    // Apply sorting
    apartments = [...apartments].sort((a, b) => {
      const aVal = a[sortConfig.field];
      const bVal = b[sortConfig.field];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
    
    return apartments;
  },
  
  getSelectedApartment: () => {
    const { selectedApartmentId } = get();
    if (!selectedApartmentId) return undefined;
    return allApartments.find(a => a.id === selectedApartmentId);
  },
  
  getCurrentBuilding: () => {
    const { currentBuildingId } = get();
    return buildings.find(b => b.id === currentBuildingId);
  },
}));
