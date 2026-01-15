import { create } from 'zustand';
import type { Apartment, FilterState, SidebarTab, ViewMode, ResultViewMode } from '../types';
import { MOCK_APARTMENTS } from '../data/mockData';

interface AppState {
  apartments: Apartment[];
  
  // Sidebar State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  
  // Viewer State
  selectedApartmentId: string | null;
  selectApartment: (id: string | null) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  currentFrame: number;
  setFrame: (frame: number) => void;
  isHighlightingEnabled: boolean;
  toggleHighlighting: () => void;
  
  // Filters
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  
  // Results
  resultViewMode: ResultViewMode;
  setResultViewMode: (mode: ResultViewMode) => void;
  
  // Comparison
  comparisonIds: string[];
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  
  // Computed (helper)
  getFilteredApartments: () => Apartment[];
}

const initialFilters: FilterState = {
  area: [0, 200],
  price: [0, 1000000],
  rooms: [1, 5],
  floors: [1, 20],
  status: [],
  garden: false,
  terrace: false,
  balcony: false,
  loggia: false,
  ac: false,
  smartHome: false,
};

export const useStore = create<AppState>((set, get) => ({
  apartments: MOCK_APARTMENTS,
  
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  activeTab: 'filters',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  selectedApartmentId: null,
  selectApartment: (id) => {
    set({ selectedApartmentId: id });
    if (id) {
       // Also rotate to the apartment's frame
       const apt = get().apartments.find(a => a.id === id);
       if (apt) {
         set({ currentFrame: apt.frameNumber });
       }
    }
  },
  
  viewMode: 'building',
  setViewMode: (mode) => set({ viewMode: mode }),
  
  currentFrame: 0,
  setFrame: (frame) => set({ currentFrame: frame }),
  
  isHighlightingEnabled: true,
  toggleHighlighting: () => set((state) => ({ isHighlightingEnabled: !state.isHighlightingEnabled })),
  
  filters: initialFilters,
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  resetFilters: () => set({ filters: initialFilters }),
  
  resultViewMode: 'cards',
  setResultViewMode: (mode) => set({ resultViewMode: mode }),
  
  comparisonIds: [],
  addToComparison: (id) => set((state) => ({ comparisonIds: [...state.comparisonIds, id] })),
  removeFromComparison: (id) => set((state) => ({ comparisonIds: state.comparisonIds.filter(i => i !== id) })),
  clearComparison: () => set({ comparisonIds: [] }),
  
  getFilteredApartments: () => {
    const { apartments, filters } = get();
    return apartments.filter(apt => {
      if (apt.area < filters.area[0] || apt.area > filters.area[1]) return false;
      if (apt.price < filters.price[0] || apt.price > filters.price[1]) return false;
      if (apt.rooms < filters.rooms[0] || apt.rooms > filters.rooms[1]) return false;
      if (apt.floor < filters.floors[0] || apt.floor > filters.floors[1]) return false;
      
      if (filters.status.length > 0 && !filters.status.includes(apt.status)) return false;
      
      if (filters.garden && !apt.garden) return false;
      if (filters.terrace && !apt.terrace) return false;
      if (filters.balcony && !apt.balcony) return false;
      if (filters.loggia && !apt.loggia) return false;
      if (filters.ac && !apt.ac) return false;
      if (filters.smartHome && !apt.smartHome) return false;
      
      return true;
    });
  }
}));
