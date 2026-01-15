import React from 'react';
import { FiChevronLeft, FiExternalLink } from 'react-icons/fi';
import { useStore } from '../../store/useStore';

interface Tour360ViewProps {
  onBack: () => void;
}

export const Tour360View: React.FC<Tour360ViewProps> = ({ onBack }) => {
  const { getSelectedApartment } = useStore();
  const apartment = getSelectedApartment();

  if (!apartment) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No apartment selected</p>
      </div>
    );
  }

  // Placeholder 360 tour URL (in production, this would be actual tour)
  const tourUrl = apartment.tour360Url || 'https://example.com/tour';

  return (
    <div className="relative w-full h-full bg-gray-900 flex flex-col">
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
      <div className="absolute top-4 right-4 z-10">
        <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <h3 className="text-sm font-bold text-gray-900">{apartment.index}</h3>
          <p className="text-xs text-gray-600">360° Tour</p>
        </div>
      </div>

      {/* Tour placeholder (in production, embed actual 360 viewer) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">360° Virtual Tour</h2>
          <p className="text-gray-400 mb-6">Experience this apartment in immersive 360°</p>
          
          <a
            href={tourUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <span>Open Tour</span>
            <FiExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-gray-400">
          Drag to look around • Scroll to zoom • Click hotspots to navigate
        </p>
      </div>
    </div>
  );
};

export default Tour360View;
