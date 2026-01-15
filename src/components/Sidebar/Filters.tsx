import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';

export const Filters: React.FC = () => {
  const { filters, setFilters, resetFilters } = useStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateRange = (key: 'area' | 'price' | 'rooms' | 'floors', index: 0 | 1, value: string) => {
    const val = parseInt(value) || 0;
    const newRange = [...filters[key]] as [number, number];
    newRange[index] = val;
    setFilters({ [key]: newRange });
  };

  return (
    <div className="p-4 border-b border-gray-200 space-y-6">
      <div className="space-y-4">
        {/* Area */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Area (m²)</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={filters.area[0]} 
              onChange={(e) => updateRange('area', 0, e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Min"
            />
            <input 
              type="number" 
              value={filters.area[1]} 
              onChange={(e) => updateRange('area', 1, e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price (Currency)</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={filters.price[0]} 
              onChange={(e) => updateRange('price', 0, e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Min"
            />
            <input 
              type="number" 
              value={filters.price[1]} 
              onChange={(e) => updateRange('price', 1, e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Max"
            />
          </div>
        </div>
        
         {/* Rooms */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Rooms</label>
           <div className="flex gap-2">
            <input 
              type="number" 
              value={filters.rooms[0]} 
              onChange={(e) => updateRange('rooms', 0, e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Min"
            />
            <input 
              type="number" 
              value={filters.rooms[1]} 
              onChange={(e) => updateRange('rooms', 1, e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Max"
            />
          </div>
        </div>
        
         {/* Floors */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Floors</label>
           <div className="flex gap-2">
            <input 
              type="number" 
              value={filters.floors[0]} 
              onChange={(e) => updateRange('floors', 0, e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Min"
            />
            <input 
              type="number" 
              value={filters.floors[1]} 
              onChange={(e) => updateRange('floors', 1, e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
         <label className="text-sm font-medium text-gray-700">Status</label>
         <div className="flex flex-wrap gap-2">
           {['available', 'reserved', 'sold'].map((status) => (
             <button
               key={status}
               onClick={() => {
                 const current = filters.status;
                 const isActive = current.includes(status as any);
                 setFilters({
                   status: isActive 
                     ? current.filter(s => s !== status)
                     : [...current, status as any]
                 });
               }}
               className={clsx(
                 "px-3 py-1 rounded-full text-xs font-medium border transition-colors capitalize",
                 filters.status.includes(status as any)
                   ? "bg-blue-100 text-blue-800 border-blue-200"
                   : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
               )}
             >
               {status}
             </button>
           ))}
         </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div>
        <div className="flex justify-between items-center mb-2">
             <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
             >
                {showAdvanced ? <ChevronUp size={16} className="mr-1"/> : <ChevronDown size={16} className="mr-1"/>}
                Additional Filters
             </button>
             
             <button 
                onClick={resetFilters}
                className="flex items-center text-xs text-gray-500 hover:text-red-500"
             >
                <RotateCcw size={12} className="mr-1" /> Reset
             </button>
        </div>

        {showAdvanced && (
          <div className="space-y-4 pt-2 border-t border-gray-100">
             <div className="grid grid-cols-2 gap-2">
               {[
                 { key: 'garden', label: 'Garden' },
                 { key: 'terrace', label: 'Terrace' },
                 { key: 'balcony', label: 'Balcony' },
                 { key: 'loggia', label: 'Loggia' },
                 { key: 'ac', label: 'AC' },
                 { key: 'smartHome', label: 'Smart Home' },
               ].map((opt) => (
                 <label key={opt.key} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                   <input 
                     type="checkbox"
                     checked={filters[opt.key as keyof typeof filters] as boolean}
                     onChange={(e) => setFilters({ [opt.key]: e.target.checked })}
                     className="rounded text-blue-600 focus:ring-blue-500"
                   />
                   <span>{opt.label}</span>
                 </label>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
