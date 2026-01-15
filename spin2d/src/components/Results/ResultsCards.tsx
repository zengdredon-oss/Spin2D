import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { Apartment } from '../../types';
import { useStore } from '../../store/useStore';
import { formatPrice, formatArea } from '../../utils/format';
import { StatusBadge } from '../Common';

interface ResultsCardsProps {
  apartments: Apartment[];
}

export const ResultsCards: React.FC<ResultsCardsProps> = ({ apartments }) => {
  const {
    setSelectedApartment,
    selectedApartmentId,
    hoveredApartmentId,
    setHoveredApartment,
    addToComparison,
    removeFromComparison,
    isInComparison,
  } = useStore();

  const handleFavoriteClick = (e: React.MouseEvent, apt: Apartment) => {
    e.stopPropagation();
    if (isInComparison(apt.id)) {
      removeFromComparison(apt.id);
    } else {
      addToComparison(apt.id);
    }
  };

  // Placeholder floor plan images
  const getFloorPlanImage = (apt: Apartment) => {
    const images = [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
    ];
    return images[apt.rooms % images.length];
  };

  return (
    <div className="p-4 space-y-4">
      {apartments.map((apt) => (
        <div
          key={apt.id}
          onClick={() => setSelectedApartment(apt.id)}
          onMouseEnter={() => setHoveredApartment(apt.id)}
          onMouseLeave={() => setHoveredApartment(null)}
          className={`
            flex bg-white rounded-xl overflow-hidden border transition-all cursor-pointer
            ${selectedApartmentId === apt.id ? 'border-primary-500 shadow-md' : 'border-gray-200'}
            ${hoveredApartmentId === apt.id ? 'shadow-md' : 'shadow-sm'}
            hover:shadow-md
          `}
        >
          {/* Left side - Info */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900">{apt.index}</h3>
              <StatusBadge status={apt.status} size="sm" />
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Area</span>
                <span className="font-medium text-gray-900">{formatArea(apt.area)}</span>
              </div>
              
              {apt.hasPromotion ? (
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Price</span>
                  <div className="text-right">
                    <span className="text-xs text-primary-500 font-medium block">Promotion!</span>
                    <span className="font-semibold text-primary-600">
                      {formatPrice(apt.price)}
                    </span>
                    {apt.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1">
                        {formatPrice(apt.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="font-semibold text-gray-900">{formatPrice(apt.price)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-500">Rooms</span>
                <span className="font-medium text-gray-900">{apt.rooms}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Floor</span>
                <span className="font-medium text-gray-900">{apt.floor}</span>
              </div>
            </div>
          </div>

          {/* Right side - Floor plan */}
          <div className="relative w-36 bg-gray-100">
            <img
              src={getFloorPlanImage(apt)}
              alt={`${apt.index} floor plan`}
              className="w-full h-full object-cover"
            />
            
            {/* Favorite button */}
            <button
              onClick={(e) => handleFavoriteClick(e, apt)}
              className={`
                absolute top-2 right-2 p-2 rounded-full transition-colors
                ${isInComparison(apt.id)
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/90 text-gray-400 hover:text-primary-500'
                }
              `}
            >
              <FiHeart 
                size={16} 
                fill={isInComparison(apt.id) ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsCards;
