import React from 'react';
import { useStore } from '../../store/useStore';
import { BuildingViewer } from './BuildingViewer';
import { ApartmentView } from './ApartmentView';
import { Building, Map, Video, Sun } from 'lucide-react';
import { clsx } from 'clsx';

export const Viewer: React.FC = () => {
  const { viewMode, setViewMode, selectedApartmentId } = useStore();

  const handleModeChange = (mode: 'building' | 'plan' | 'tour' | 'balcony') => {
      // If mode is plan/tour/balcony, we switch the main view to 'apartment' (handled by ApartmentView internally via sub-state or just pass props)
      // Actually my store only has 'building' | 'plan' | 'tour' | 'balcony' as ViewMode.
      // So I can just setViewMode(mode).
      setViewMode(mode);
  };

  return (
    <div className="flex-1 h-screen bg-gray-100 relative overflow-hidden">
      {viewMode === 'building' ? <BuildingViewer /> : <ApartmentView />}

      {/* Floating Mode Switcher - Visible if an apartment is selected */}
      {selectedApartmentId && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 bg-white shadow-lg rounded-lg p-2 z-40">
           <button 
             onClick={() => handleModeChange('building')}
             className={clsx(
                "p-3 rounded flex flex-col items-center gap-1 transition-colors",
                viewMode === 'building' ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-600"
             )}
             title="Building View"
           >
              <Building size={20} />
              <span className="text-[10px]">Building</span>
           </button>
           
           <button 
             onClick={() => handleModeChange('plan')}
             className={clsx(
                 "p-3 rounded flex flex-col items-center gap-1 transition-colors",
                 viewMode === 'plan' ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-600"
             )}
              title="Floor Plan"
           >
              <Map size={20} />
              <span className="text-[10px]">Plan</span>
           </button>

           <button 
             onClick={() => handleModeChange('tour')}
             className={clsx(
                 "p-3 rounded flex flex-col items-center gap-1 transition-colors",
                 viewMode === 'tour' ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-600"
             )}
              title="360 Tour"
           >
              <Video size={20} />
              <span className="text-[10px]">360°</span>
           </button>

           <button 
             onClick={() => handleModeChange('balcony')}
             className={clsx(
                 "p-3 rounded flex flex-col items-center gap-1 transition-colors",
                 viewMode === 'balcony' ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-600"
             )}
              title="Balcony View"
           >
              <Sun size={20} />
              <span className="text-[10px]">Balcony</span>
           </button>
        </div>
      )}
    </div>
  );
};
