import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiShare2, FiX } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import { RangeSlider, Button, Checkbox } from '../Common';
import { filterBounds } from '../../data/apartments';
import { formatPrice, formatArea, copyToClipboard, generateShareUrl } from '../../utils/format';
import { buildings } from '../../data/apartments';

export const FilterPanel: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const {
    filters,
    setFilters,
    resetFilters,
    currentBuildingId,
    setCurrentBuilding,
  } = useStore();

  const handleShare = async () => {
    const url = generateShareUrl(filters);
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasActiveFilters = () => {
    return (
      filters.areaRange[0] !== filterBounds.area.min ||
      filters.areaRange[1] !== filterBounds.area.max ||
      filters.priceRange[0] !== filterBounds.price.min ||
      filters.priceRange[1] !== filterBounds.price.max ||
      filters.roomsRange[0] !== filterBounds.rooms.min ||
      filters.roomsRange[1] !== filterBounds.rooms.max ||
      filters.floorRange[0] !== filterBounds.floor.min ||
      filters.floorRange[1] !== filterBounds.floor.max ||
      filters.status !== 'all' ||
      filters.hasGarden !== null ||
      filters.hasTerrace !== null ||
      filters.hasBalcony !== null ||
      filters.hasLoggia !== null ||
      filters.hasAirConditioning !== null ||
      filters.hasSmartHome !== null
    );
  };

  return (
    <div className="p-4 space-y-6">
      {/* Building selector and share button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800">Building</span>
          <select
            value={currentBuildingId}
            onChange={(e) => setCurrentBuilding(e.target.value)}
            className="ml-2 px-3 py-1.5 text-lg font-bold text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleShare}
          className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
          title="Share filters"
        >
          {copied ? (
            <span className="text-xs text-green-500">Copied!</span>
          ) : (
            <FiShare2 size={18} />
          )}
        </button>
      </div>

      {/* Range sliders */}
      <div className="space-y-5">
        <RangeSlider
          label="Area:"
          min={filterBounds.area.min}
          max={filterBounds.area.max}
          value={filters.areaRange}
          onChange={(value) => setFilters({ areaRange: value })}
          formatValue={(v) => formatArea(v)}
        />

        <RangeSlider
          label="Rooms:"
          min={filterBounds.rooms.min}
          max={filterBounds.rooms.max}
          value={filters.roomsRange}
          onChange={(value) => setFilters({ roomsRange: value })}
          step={1}
        />

        <RangeSlider
          label="Floor:"
          min={filterBounds.floor.min}
          max={filterBounds.floor.max}
          value={filters.floorRange}
          onChange={(value) => setFilters({ floorRange: value })}
          step={1}
        />

        <RangeSlider
          label="Price:"
          min={filterBounds.price.min}
          max={filterBounds.price.max}
          value={filters.priceRange}
          onChange={(value) => setFilters({ priceRange: value })}
          formatValue={(v) => `${Math.round(v / 1000)} тыс.`}
          step={10000}
        />
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {(['available', 'reserved', 'sold', 'all'] as const).map((status) => (
          <Button
            key={status}
            variant="outline"
            size="sm"
            isActive={filters.status === status}
            onClick={() => setFilters({ status })}
            className={`
              ${status === 'available' && filters.status === status ? 'border-green-500 bg-green-50 text-green-700' : ''}
              ${status === 'reserved' && filters.status === status ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : ''}
              ${status === 'sold' && filters.status === status ? 'border-red-500 bg-red-50 text-red-700' : ''}
              ${status === 'all' && filters.status === status ? 'border-primary-500 bg-primary-50 text-primary-700' : ''}
            `}
          >
            {status === 'available' && 'Available'}
            {status === 'reserved' && 'Reserved'}
            {status === 'sold' && 'Sold'}
            {status === 'all' && 'All'}
          </Button>
        ))}
      </div>

      {/* Advanced filters toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>Advanced filters</span>
          {showAdvanced ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </button>
        
        {hasActiveFilters() && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 transition-colors"
          >
            <span>Clear filters</span>
            <span className="w-4 h-4 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
              {Object.values(filters).filter(v => v !== null && v !== 'all').length}
            </span>
          </button>
        )}
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="space-y-4 pt-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Additional attributes</p>
            <div className="flex flex-wrap gap-3">
              <Checkbox
                checked={filters.hasGarden}
                onChange={(v) => setFilters({ hasGarden: v })}
                label="Garden"
                triState
              />
              <Checkbox
                checked={filters.hasTerrace}
                onChange={(v) => setFilters({ hasTerrace: v })}
                label="Terrace"
                triState
              />
              <Checkbox
                checked={filters.hasBalcony}
                onChange={(v) => setFilters({ hasBalcony: v })}
                label="Balcony"
                triState
              />
              <Checkbox
                checked={filters.hasLoggia}
                onChange={(v) => setFilters({ hasLoggia: v })}
                label="Loggia"
                triState
              />
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Amenities</p>
            <div className="flex flex-wrap gap-3">
              <Checkbox
                checked={filters.hasAirConditioning}
                onChange={(v) => setFilters({ hasAirConditioning: v })}
                label="Air conditioning"
                triState
              />
              <Checkbox
                checked={filters.hasSmartHome}
                onChange={(v) => setFilters({ hasSmartHome: v })}
                label="Smart Home"
                triState
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
