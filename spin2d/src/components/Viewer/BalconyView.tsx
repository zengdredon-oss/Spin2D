import React from 'react';
import { FiChevronLeft, FiMaximize2 } from 'react-icons/fi';
import { useStore } from '../../store/useStore';

interface BalconyViewProps {
  onBack: () => void;
}

export const BalconyView: React.FC<BalconyViewProps> = ({ onBack }) => {
  const { getSelectedApartment } = useStore();
  const apartment = getSelectedApartment();

  if (!apartment) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No apartment selected</p>
      </div>
    );
  }

  // Placeholder panorama image
  const panoramaUrl = apartment.balconyPanoramaUrl || 
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=2000';

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors shadow-lg"
        >
          <FiChevronLeft size={18} />
          <span className="text-sm font-medium">Back to building</span>
        </button>
      </div>

      {/* Apartment info */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <h3 className="text-sm font-bold text-gray-900">{apartment.index}</h3>
          <p className="text-xs text-gray-600">Balcony View</p>
        </div>
        
        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors">
          <FiMaximize2 size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Panorama image (in production, use 360 viewer) */}
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${panoramaUrl})`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* View info */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white text-sm font-medium mb-1">Floor {apartment.floor} View</p>
        <p className="text-white/70 text-xs">
          {apartment.hasBalcony && 'Balcony'}
          {apartment.hasBalcony && apartment.hasLoggia && ' & '}
          {apartment.hasLoggia && 'Loggia'}
          {!apartment.hasBalcony && !apartment.hasLoggia && 'Window View'}
        </p>
      </div>

      {/* Compass */}
      <div className="absolute bottom-6 right-6">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="relative">
            <span className="text-white text-xs font-bold">N</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalconyView;
