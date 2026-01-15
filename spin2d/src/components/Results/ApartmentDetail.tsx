import React from 'react';
import { FiX, FiHeart, FiShare2, FiHome, FiLayout, FiCompass, FiSun, FiCheck, FiX as FiNo } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import { formatPrice, formatArea } from '../../utils/format';
import { StatusBadge, Button } from '../Common';
import { ViewMode } from '../../types';

export const ApartmentDetail: React.FC = () => {
  const {
    getSelectedApartment,
    setSelectedApartment,
    addToComparison,
    removeFromComparison,
    isInComparison,
    viewMode,
    setViewMode,
  } = useStore();

  const apartment = getSelectedApartment();

  if (!apartment) return null;

  const handleFavoriteClick = () => {
    if (isInComparison(apartment.id)) {
      removeFromComparison(apartment.id);
    } else {
      addToComparison(apartment.id);
    }
  };

  const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'building', icon: <FiHome size={16} />, label: 'Building' },
    { mode: 'floorplan', icon: <FiLayout size={16} />, label: 'Floor Plan' },
    { mode: 'tour360', icon: <FiCompass size={16} />, label: '360° Tour' },
    { mode: 'balcony', icon: <FiSun size={16} />, label: 'Balcony' },
  ];

  // Placeholder floor plan image
  const floorPlanImage = `https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600`;

  return (
    <div className="bg-white border-t border-gray-200 shadow-lg animate-slide-in-left">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-gray-900">{apartment.index}</h3>
          <StatusBadge status={apartment.status} size="sm" />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-lg transition-colors ${
              isInComparison(apartment.id)
                ? 'bg-primary-100 text-primary-500'
                : 'hover:bg-gray-100 text-gray-400'
            }`}
          >
            <FiHeart size={18} fill={isInComparison(apartment.id) ? 'currentColor' : 'none'} />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
            <FiShare2 size={18} />
          </button>
          
          <button
            onClick={() => setSelectedApartment(null)}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Floor plan thumbnail */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
          <img
            src={floorPlanImage}
            alt={`${apartment.index} floor plan`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-2 left-2 text-white text-xs">
            Click view mode to see larger
          </div>
        </div>

        {/* View mode buttons */}
        <div className="flex gap-2 mb-4">
          {viewModes.map(({ mode, icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Main info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Area</p>
            <p className="text-lg font-bold text-gray-900">{formatArea(apartment.area)}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Rooms</p>
            <p className="text-lg font-bold text-gray-900">{apartment.rooms}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Floor</p>
            <p className="text-lg font-bold text-gray-900">{apartment.floor}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Building</p>
            <p className="text-lg font-bold text-gray-900">{apartment.building}</p>
          </div>
        </div>

        {/* Price */}
        <div className="p-4 bg-primary-50 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-primary-600">Price</p>
              {apartment.hasPromotion ? (
                <div>
                  <p className="text-xl font-bold text-primary-600">{formatPrice(apartment.price)}</p>
                  {apartment.originalPrice && (
                    <p className="text-sm text-gray-400 line-through">{formatPrice(apartment.originalPrice)}</p>
                  )}
                  {apartment.promotionLabel && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-primary-500 text-white text-xs rounded">
                      {apartment.promotionLabel}
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-xl font-bold text-primary-600">{formatPrice(apartment.price)}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-primary-600">Price per m²</p>
              <p className="text-lg font-semibold text-primary-700">{formatPrice(apartment.pricePerM2)}</p>
            </div>
          </div>
        </div>

        {/* Additional features */}
        <div className="space-y-2 mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Features</p>
          <div className="flex flex-wrap gap-2">
            {apartment.hasGarden && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                <FiCheck size={12} /> Garden
              </span>
            )}
            {apartment.hasTerrace && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                <FiCheck size={12} /> Terrace
              </span>
            )}
            {apartment.hasBalcony && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                <FiCheck size={12} /> Balcony
              </span>
            )}
            {apartment.hasLoggia && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                <FiCheck size={12} /> Loggia
              </span>
            )}
            {apartment.hasAirConditioning && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                <FiCheck size={12} /> AC
              </span>
            )}
            {apartment.hasSmartHome && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                <FiCheck size={12} /> Smart Home
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button variant="primary" size="md" className="flex-1">
            Contact Sales
          </Button>
          <Button 
            variant={isInComparison(apartment.id) ? 'primary' : 'outline'} 
            size="md"
            onClick={handleFavoriteClick}
          >
            <FiHeart size={16} fill={isInComparison(apartment.id) ? 'currentColor' : 'none'} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetail;
