import React from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import { ResultsTable } from './ResultsTable';
import { ResultsCards } from './ResultsCards';
import { Button } from '../Common';

export const ResultsPanel: React.FC = () => {
  const { resultsViewMode, setResultsViewMode, getFilteredApartments, sortConfig, setSortConfig } = useStore();
  const filteredApartments = getFilteredApartments();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">{filteredApartments.length}</span>
          <span className="text-sm text-gray-600">results</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setResultsViewMode('table')}
            className={`p-2 rounded transition-colors ${
              resultsViewMode === 'table'
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            title="Table view"
          >
            <FiList size={18} />
          </button>
          <button
            onClick={() => setResultsViewMode('cards')}
            className={`p-2 rounded transition-colors ${
              resultsViewMode === 'cards'
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            title="Card view"
          >
            <FiGrid size={18} />
          </button>
        </div>
      </div>

      {/* Sorting (for table view) */}
      {resultsViewMode === 'table' && (
        <div className="px-4 py-2 border-b border-gray-100">
          <select
            value={`${sortConfig.field}-${sortConfig.direction}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split('-');
              setSortConfig({ field: field as any, direction: direction as any });
            }}
            className="text-sm text-gray-600 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="rooms-desc">Rooms: Descending</option>
            <option value="rooms-asc">Rooms: Ascending</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="area-asc">Area: Low to High</option>
            <option value="area-desc">Area: High to Low</option>
            <option value="floor-asc">Floor: Low to High</option>
            <option value="floor-desc">Floor: High to Low</option>
          </select>
        </div>
      )}

      {/* Results */}
      <div className="flex-1 overflow-auto">
        {filteredApartments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FiGrid className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-600 font-medium">No apartments found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : resultsViewMode === 'table' ? (
          <ResultsTable apartments={filteredApartments} />
        ) : (
          <ResultsCards apartments={filteredApartments} />
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
