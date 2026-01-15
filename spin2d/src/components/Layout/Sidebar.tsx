import React from 'react';
import { FiHome, FiMapPin, FiImage, FiColumns, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import { TabMode } from '../../types';
import { FilterPanel } from '../Filters';
import { ResultsPanel, ApartmentDetail } from '../Results';
import { CompareButton } from '../Comparison';

interface SidebarProps {
  className?: string;
}

const tabs: { mode: TabMode; icon: React.ReactNode; label: string }[] = [
  { mode: 'apartments', icon: <FiHome size={18} />, label: 'Apartments' },
  { mode: 'location', icon: <FiMapPin size={18} />, label: 'Location' },
  { mode: 'gallery', icon: <FiImage size={18} />, label: 'Gallery' },
  { mode: 'comparison', icon: <FiColumns size={18} />, label: 'Compare' },
];

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const {
    tabMode,
    setTabMode,
    isMenuCollapsed,
    setMenuCollapsed,
    selectedApartmentId,
    comparisonIds,
  } = useStore();

  if (isMenuCollapsed) {
    return (
      <div className={`w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4 ${className}`}>
        <button
          onClick={() => setMenuCollapsed(false)}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FiChevronRight size={20} />
        </button>
        
        <div className="flex-1 flex flex-col items-center gap-2 mt-4">
          {tabs.map(({ mode, icon }) => (
            <button
              key={mode}
              onClick={() => { setTabMode(mode); setMenuCollapsed(false); }}
              className={`p-2 rounded-lg transition-colors ${
                tabMode === mode
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              {icon}
              {mode === 'comparison' && comparisonIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                  {comparisonIds.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-96 bg-white border-r border-gray-200 flex flex-col ${className}`}>
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map(({ mode, icon, label }) => (
          <button
            key={mode}
            onClick={() => setTabMode(mode)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors relative ${
              tabMode === mode
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
            {mode === 'comparison' && comparisonIds.length > 0 && (
              <span className="w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                {comparisonIds.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tabMode === 'apartments' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Apartment detail (when selected) */}
          {selectedApartmentId && (
            <ApartmentDetail />
          )}
          
          {/* Filters */}
          {!selectedApartmentId && <FilterPanel />}
          
          {/* Results */}
          <div className="flex-1 overflow-hidden">
            <ResultsPanel />
          </div>
        </div>
      )}

      {tabMode !== 'apartments' && (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              {tabs.find(t => t.mode === tabMode)?.icon}
            </div>
            <p className="text-gray-500">
              {tabMode === 'location' && 'Click to view the location map'}
              {tabMode === 'gallery' && 'Click to browse the gallery'}
              {tabMode === 'comparison' && 'View your saved apartments'}
            </p>
          </div>
        </div>
      )}

      {/* Collapse button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => setMenuCollapsed(true)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
        >
          <FiChevronLeft size={16} />
          <span>Collapse menu</span>
        </button>
      </div>

      {/* Compare button */}
      <CompareButton />
    </div>
  );
};

export default Sidebar;
