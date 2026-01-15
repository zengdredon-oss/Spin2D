import React, { useState } from 'react';
import { FiChevronLeft, FiTrash2, FiMail, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import { allApartments } from '../../data/apartments';
import { formatPrice, formatArea } from '../../utils/format';
import { Button, StatusBadge } from '../Common';

interface ComparisonPanelProps {
  onBack: () => void;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ onBack }) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const {
    comparisonIds,
    removeFromComparison,
    clearComparison,
    setSelectedApartment,
    setTabMode,
  } = useStore();

  const comparedApartments = comparisonIds
    .map(id => allApartments.find(a => a.id === id))
    .filter(Boolean);

  const handleGoToApartment = (id: string) => {
    setSelectedApartment(id);
    setTabMode('apartments');
  };

  const handleClearAll = () => {
    clearComparison();
    setShowClearConfirm(false);
  };

  // Placeholder floor plan images
  const getFloorPlanImage = (apt: typeof comparedApartments[0]) => {
    if (!apt) return '';
    const images = [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
    ];
    return images[apt.rooms % images.length];
  };

  const comparisonFields = [
    { label: 'Area', getValue: (apt: typeof comparedApartments[0]) => apt ? formatArea(apt.area) : '-' },
    { label: 'Price', getValue: (apt: typeof comparedApartments[0]) => apt ? formatPrice(apt.price) : '-' },
    { label: 'Rooms', getValue: (apt: typeof comparedApartments[0]) => apt?.rooms.toString() || '-' },
    { label: 'Floor', getValue: (apt: typeof comparedApartments[0]) => apt?.floor.toString() || '-' },
    { label: 'Price/m²', getValue: (apt: typeof comparedApartments[0]) => apt ? formatPrice(apt.pricePerM2) : '-' },
  ];

  const additionalFields = [
    { label: 'Garden', getValue: (apt: typeof comparedApartments[0]) => apt?.hasGarden },
    { label: 'Terrace', getValue: (apt: typeof comparedApartments[0]) => apt?.hasTerrace },
    { label: 'Balcony', getValue: (apt: typeof comparedApartments[0]) => apt?.hasBalcony },
    { label: 'Loggia', getValue: (apt: typeof comparedApartments[0]) => apt?.hasLoggia },
  ];

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{comparedApartments.length}</div>
              <div className="text-sm text-gray-500">apartments</div>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full mb-3"
          >
            <FiMail className="mr-2" size={16} />
            Send inquiry
          </Button>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center justify-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors"
          >
            <FiTrash2 size={14} />
            <span>Clear</span>
          </button>
        </div>

        {/* Comparison fields labels */}
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {comparisonFields.map((field) => (
              <div key={field.label} className="h-10 flex items-center">
                <span className="text-sm font-medium text-gray-700">{field.label}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 my-4 pt-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Additional</p>
            <div className="space-y-4">
              {additionalFields.map((field) => (
                <div key={field.label} className="h-6 flex items-center">
                  <span className="text-sm text-gray-600">{field.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison cards */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex h-full min-w-max">
          {/* Back button header */}
          <div className="absolute top-4 left-60 z-10">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiChevronLeft size={18} />
              <span className="text-sm font-medium">Main view</span>
            </button>
          </div>

          {/* Apartment cards */}
          {comparedApartments.map((apt) => (
            <div key={apt!.id} className="w-64 border-r border-gray-200 bg-white flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{apt!.index}</h3>
                  <StatusBadge status={apt!.status} size="sm" />
                </div>

                {/* Floor plan image */}
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={getFloorPlanImage(apt)}
                    alt={`${apt!.index} floor plan`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleGoToApartment(apt!.id)}
                  >
                    Go to
                  </Button>
                  <button
                    onClick={() => removeFromComparison(apt!.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Comparison values */}
              <div className="flex-1 p-4">
                <div className="space-y-4">
                  {comparisonFields.map((field) => (
                    <div key={field.label} className="h-10 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-900">{field.getValue(apt)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 my-4 pt-4">
                  <div className="space-y-4">
                    {additionalFields.map((field) => (
                      <div key={field.label} className="h-6 flex items-center justify-center">
                        {field.getValue(apt) ? (
                          <FiCheck className="text-green-500" size={18} />
                        ) : (
                          <FiX className="text-gray-300" size={18} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add apartment card */}
          {comparedApartments.length < 4 && (
            <div className="w-64 flex flex-col items-center justify-center p-8 bg-gray-50">
              <button
                onClick={() => setTabMode('apartments')}
                className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors"
              >
                <FiPlus size={24} />
              </button>
              <p className="mt-4 text-sm text-gray-500 text-center">Add another apartment</p>
            </div>
          )}
        </div>
      </div>

      {/* Clear confirmation modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Clear comparison?</h3>
            <p className="text-sm text-gray-600 mb-4">
              This will remove all {comparedApartments.length} apartments from comparison.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={handleClearAll}
              >
                Clear all
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonPanel;
