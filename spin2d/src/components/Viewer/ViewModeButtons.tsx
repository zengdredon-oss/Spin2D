import React from 'react';
import { FiHome, FiLayout, FiGrid, FiCompass, FiSun } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import { ViewMode } from '../../types';

interface ViewModeButtonsProps {
  className?: string;
}

const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
  { mode: 'building', icon: <FiHome size={18} />, label: 'Building' },
  { mode: 'floorplan', icon: <FiLayout size={18} />, label: 'Floor Plan' },
  { mode: 'floorplan3d', icon: <FiGrid size={18} />, label: '3D Plan' },
  { mode: 'tour360', icon: <FiCompass size={18} />, label: '360° Tour' },
  { mode: 'balcony', icon: <FiSun size={18} />, label: 'Balcony View' },
];

export const ViewModeButtons: React.FC<ViewModeButtonsProps> = ({ className = '' }) => {
  const { viewMode, setViewMode, selectedApartmentId } = useStore();

  if (!selectedApartmentId) return null;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {viewModes.map(({ mode, icon, label }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            viewMode === mode
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
          }`}
        >
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewModeButtons;
