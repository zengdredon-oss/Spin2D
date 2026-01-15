import React, { useState } from 'react';
import { FiChevronLeft, FiLayout, FiGrid } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import { Button } from '../Common';

interface FloorPlanViewProps {
  onBack: () => void;
}

export const FloorPlanView: React.FC<FloorPlanViewProps> = ({ onBack }) => {
  const { getSelectedApartment, viewMode } = useStore();
  const [planType, setPlanType] = useState<'2d' | '3d'>(viewMode === 'floorplan3d' ? '3d' : '2d');
  
  const apartment = getSelectedApartment();

  if (!apartment) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No apartment selected</p>
      </div>
    );
  }

  // Placeholder floor plan images
  const planImage2D = `https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1000`;
  const planImage3D = `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000`;

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FiChevronLeft size={20} />
          <span className="text-sm font-medium">Back to building</span>
        </button>
        
        <div className="flex items-center gap-2">
          <Button
            variant={planType === '2d' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setPlanType('2d')}
          >
            <FiLayout className="mr-2" size={16} />
            2D
          </Button>
          <Button
            variant={planType === '3d' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setPlanType('3d')}
          >
            <FiGrid className="mr-2" size={16} />
            3D
          </Button>
        </div>
      </div>

      {/* Floor plan image */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="relative max-w-full max-h-full">
          <img
            src={planType === '2d' ? planImage2D : planImage3D}
            alt={`${apartment.index} Floor Plan`}
            className="max-w-full max-h-[calc(100vh-200px)] object-contain rounded-lg shadow-lg"
          />
          
          {/* Apartment info overlay */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">{apartment.index}</h3>
            <p className="text-sm text-gray-600">{apartment.area} m² • {apartment.rooms} rooms</p>
            <p className="text-sm text-gray-600">Floor {apartment.floor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanView;
