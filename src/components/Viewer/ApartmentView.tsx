import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { clsx } from 'clsx';

export const ApartmentView: React.FC = () => {
  const { selectedApartmentId, apartments, viewMode } = useStore();
  const [planType, setPlanType] = useState<'2d' | '3d'>('2d');

  const apt = apartments.find(a => a.id === selectedApartmentId);

  if (!apt) return null;

  return (
    <div className="w-full h-full bg-white relative flex flex-col">
       {/* Content Area */}
       <div className="flex-1 p-8 flex items-center justify-center bg-gray-50 pl-24"> {/* Added pl-24 to account for floating menu */}
          {viewMode === 'plan' && (
             <div className="flex flex-col items-center max-w-4xl w-full">
                <div className="flex gap-4 mb-4 bg-white p-1 rounded border shadow-sm">
                   <button 
                     onClick={() => setPlanType('2d')}
                     className={clsx(
                        "px-4 py-2 rounded text-sm font-medium",
                        planType === '2d' ? "bg-gray-800 text-white" : "hover:bg-gray-100"
                     )}
                   >
                     2D Plan
                   </button>
                   <button 
                     onClick={() => setPlanType('3d')}
                     className={clsx(
                        "px-4 py-2 rounded text-sm font-medium",
                        planType === '3d' ? "bg-gray-800 text-white" : "hover:bg-gray-100"
                     )}
                   >
                     3D Plan
                   </button>
                </div>
                <div className="w-full aspect-video bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 relative">
                   <img 
                      src={planType === '2d' ? apt.layoutImage2d : apt.layoutImage3d} 
                      alt="Plan" 
                      className="w-full h-full object-contain"
                   />
                   <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded shadow backdrop-blur">
                      <p className="font-bold">{apt.index}</p>
                      <p>{apt.area} m² / {apt.rooms} rooms</p>
                   </div>
                </div>
             </div>
          )}

          {viewMode === 'tour' && (
             <div className="w-full h-full bg-black flex items-center justify-center text-white rounded-lg overflow-hidden shadow-xl">
                <p className="text-xl">360° Virtual Tour Placeholder</p>
             </div>
          )}

          {viewMode === 'balcony' && (
             <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-900 rounded-lg overflow-hidden relative shadow-xl">
                 <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-100 opacity-50"></div>
                <p className="z-10 text-2xl font-bold">Balcony Panorama View</p>
             </div>
          )}
       </div>
    </div>
  );
};
