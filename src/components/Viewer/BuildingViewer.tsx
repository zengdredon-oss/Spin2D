import React, { useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { RotateCw, RotateCcw, Eye, EyeOff } from 'lucide-react';

export const BuildingViewer: React.FC = () => {
  const { 
    currentFrame, 
    setFrame, 
    isHighlightingEnabled, 
    toggleHighlighting,
    apartments,
    selectApartment,
    selectedApartmentId
  } = useStore();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const TOTAL_FRAMES = 360;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    if (Math.abs(delta) > 5) {
      const frameDelta = Math.sign(delta) * -1; // Drag left -> rotate right (increment frame)
      let newFrame = currentFrame + frameDelta;
      if (newFrame < 0) newFrame = TOTAL_FRAMES - 1;
      if (newFrame >= TOTAL_FRAMES) newFrame = 0;
      
      setFrame(newFrame);
      lastX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => { isDragging.current = false; };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const isAptVisible = (aptFrame: number, current: number) => {
    const diff = Math.abs(aptFrame - current);
    return diff < 15 || diff > (TOTAL_FRAMES - 15);
  };

  const getMaskColor = (status: string, isSelected: boolean) => {
    if (isSelected) return 'rgba(156, 163, 175, 0.6)';
    switch (status) {
      case 'available': return 'rgba(34, 197, 94, 0.4)';
      case 'reserved': return 'rgba(234, 179, 8, 0.4)';
      case 'sold': return 'rgba(239, 68, 68, 0.4)';
      default: return 'transparent';
    }
  };
  
  const rotate = (dir: 'left' | 'right') => {
      const step = 45;
      let newFrame = currentFrame + (dir === 'left' ? -step : step);
       if (newFrame < 0) newFrame += TOTAL_FRAMES;
      if (newFrame >= TOTAL_FRAMES) newFrame -= TOTAL_FRAMES;
      setFrame(newFrame);
  };

  const pois = [
    { id: 'poi1', label: 'School #5', type: 'school', color: '#3b82f6', frame: 45 },
    { id: 'poi2', label: 'Central Park', type: 'park', color: '#22c55e', frame: 135 },
    { id: 'poi3', label: 'Metro Station', type: 'transport', color: '#ef4444', frame: 225 },
    { id: 'poi4', label: 'Hospital', type: 'health', color: '#a855f7', frame: 315 },
  ];

  return (
    <div 
      className="w-full h-full relative bg-gray-200 cursor-grab active:cursor-grabbing select-none"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
        <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Frame: {currentFrame}</h2>
            <p>Drag to rotate</p>
             <div 
                className="mt-8 w-64 h-96 bg-gray-300 mx-auto transition-transform duration-75 border-4 border-gray-400 relative"
                style={{ transform: `perspective(1000px) rotateY(${currentFrame}deg)` }}
             >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">🏢</div>
             </div>
        </div>
      </div>

      {isHighlightingEnabled && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {apartments.map((apt) => {
            if (!isAptVisible(apt.frameNumber, currentFrame)) return null;
            
            const x = 50 + (Math.sin((apt.floor * 132 + Number(apt.id.split('-')[1])) % 100) * 20);
            const y = 80 - (apt.floor * 6);
            
            const isSelected = selectedApartmentId === apt.id;

            return (
              <g 
                key={apt.id} 
                className="pointer-events-auto cursor-pointer transition-opacity hover:opacity-80"
                onClick={(e) => {
                    e.stopPropagation();
                    selectApartment(apt.id);
                }}
              >
                <rect 
                  x={`${x}%`} 
                  y={`${y}%`} 
                  width="40" 
                  height="30" 
                  fill={getMaskColor(apt.status, isSelected)}
                  stroke={isSelected ? "white" : "none"}
                  strokeWidth="2"
                  className={isSelected ? "animate-pulse" : ""}
                />
                <text x={`${x}%`} y={`${y}%`} dx="20" dy="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                    {apt.index}
                </text>
              </g>
            );
          })}
          
           {pois.map((poi) => {
             const offset = (poi.frame - currentFrame) * 2;
             const x = 50 + offset;
             
             if (x < 10 || x > 90) return null;

             return (
                <g key={poi.id}>
                   <line x1={`${x}%`} y1="50%" x2={`${x}%`} y2="30%" stroke={poi.color} strokeWidth="2" />
                   <rect x={`${x}%`} y="25%" width="80" height="30" fill={poi.color} rx="4" transform="translate(-40, 0)" />
                   <text x={`${x}%`} y="25%" dx="0" dy="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                      {poi.label}
                   </text>
                </g>
             );
          })}
        </svg>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-sm z-50">
         <button onClick={() => rotate('left')} className="p-2 hover:bg-gray-100 rounded-full" title="Rotate Left">
            <RotateCcw />
         </button>
         <button onClick={() => rotate('right')} className="p-2 hover:bg-gray-100 rounded-full" title="Rotate Right">
            <RotateCw />
         </button>
      </div>

      <div className="absolute top-8 right-8 bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-sm z-50">
         <button onClick={toggleHighlighting} className="p-2 hover:bg-gray-100 rounded-full">
            {isHighlightingEnabled ? <Eye size={24} /> : <EyeOff size={24} />}
         </button>
      </div>
    </div>
  );
};
