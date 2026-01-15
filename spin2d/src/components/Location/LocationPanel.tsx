import React, { useState } from 'react';
import { FiMapPin, FiNavigation, FiChevronLeft } from 'react-icons/fi';
import { pointsOfInterest, poiCategoryLabels, poiCategoryIcons } from '../../data/poi';
import { POICategory } from '../../types';
import { formatDistance } from '../../utils/format';
import { Checkbox, Button } from '../Common';

interface LocationPanelProps {
  onBack: () => void;
}

export const LocationPanel: React.FC<LocationPanelProps> = ({ onBack }) => {
  const [enabledCategories, setEnabledCategories] = useState<Set<POICategory>>(
    new Set(['school', 'kindergarten', 'hospital', 'metro', 'park'])
  );
  const [routeAddress, setRouteAddress] = useState('');
  const [showRoute, setShowRoute] = useState(false);

  const toggleCategory = (category: POICategory) => {
    const newCategories = new Set(enabledCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setEnabledCategories(newCategories);
  };

  const filteredPOIs = pointsOfInterest.filter(poi => enabledCategories.has(poi.category));

  const handleRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (routeAddress.trim()) {
      setShowRoute(true);
    }
  };

  const allCategories = Object.keys(poiCategoryLabels) as POICategory[];

  return (
    <div className="flex h-full">
      {/* Left panel - POI filters */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Location</h2>
          <p className="text-sm text-gray-500">Explore nearby amenities</p>
        </div>

        {/* Route planner */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleRouteSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan your route
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={routeAddress}
                onChange={(e) => setRouteAddress(e.target.value)}
                placeholder="Enter your address..."
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button type="submit" variant="primary" size="md">
                <FiNavigation size={16} />
              </Button>
            </div>
          </form>
          
          {showRoute && (
            <div className="mt-3 p-3 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-700">
                <span className="font-medium">Route calculated:</span> ~15 min by car, ~25 min by public transport
              </p>
            </div>
          )}
        </div>

        {/* POI categories */}
        <div className="flex-1 overflow-auto p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Points of Interest</p>
          
          <div className="space-y-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  enabledCategories.has(category)
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-xl">{poiCategoryIcons[category]}</span>
                <span className="text-sm font-medium">{poiCategoryLabels[category]}</span>
                <span className="ml-auto text-xs text-gray-400">
                  {pointsOfInterest.filter(p => p.category === category).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Nearby POIs list */}
        <div className="border-t border-gray-200 max-h-64 overflow-auto">
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
              Nearby ({filteredPOIs.length})
            </p>
            <div className="space-y-2">
              {filteredPOIs.map((poi) => (
                <div
                  key={poi.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-lg">{poiCategoryIcons[poi.category]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{poi.name}</p>
                    <p className="text-xs text-gray-500">{formatDistance(poi.distance)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Map */}
      <div className="flex-1 relative bg-gray-100">
        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiChevronLeft size={18} />
            <span className="text-sm font-medium">Main view</span>
          </button>
        </div>

        {/* Placeholder map (in production, integrate with Google Maps or similar) */}
        <div className="w-full h-full flex items-center justify-center">
          <div 
            className="w-full h-full bg-cover bg-center opacity-50"
            style={{ 
              backgroundImage: `url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200)` 
            }}
          />
          
          {/* Map markers overlay */}
          <div className="absolute inset-0">
            {/* Building marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                <FiMapPin className="text-white" size={24} />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="px-2 py-1 bg-white rounded text-sm font-medium shadow">
                  Your new home
                </span>
              </div>
            </div>

            {/* POI markers */}
            {filteredPOIs.slice(0, 5).map((poi, index) => {
              const positions = [
                { top: '30%', left: '30%' },
                { top: '25%', left: '60%' },
                { top: '60%', left: '25%' },
                { top: '65%', left: '70%' },
                { top: '40%', left: '75%' },
              ];
              const pos = positions[index % positions.length];
              
              return (
                <div
                  key={poi.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm">{poiCategoryIcons[poi.category]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map controls placeholder */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900">
            +
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900">
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPanel;
