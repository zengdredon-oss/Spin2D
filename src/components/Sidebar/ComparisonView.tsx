import React from 'react';
import { useStore } from '../../store/useStore';
import { Trash2, ArrowRight, Phone } from 'lucide-react';
import { clsx } from 'clsx';

export const ComparisonView: React.FC = () => {
  const { comparisonIds, apartments, removeFromComparison, clearComparison, selectApartment } = useStore();

  const selectedApartments = apartments.filter(apt => comparisonIds.includes(apt.id));

  if (selectedApartments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
        <p className="mb-4">No apartments selected for comparison.</p>
        <p className="text-sm">Click the heart icon on apartments to add them here.</p>
      </div>
    );
  }

  const parameters = [
    { label: 'Area m²', key: 'area' },
    { label: 'Price', key: 'price', format: (v: number) => v.toLocaleString() },
    { label: 'Rooms', key: 'rooms' },
    { label: 'Floor', key: 'floor' },
    { label: 'Price/m²', key: 'pricePerSqm', format: (v: number) => v.toLocaleString() },
    { type: 'header', label: 'Additional' },
    { label: 'Garden', key: 'garden', type: 'bool' },
    { label: 'Terrace', key: 'terrace', type: 'bool' },
    { label: 'Balcony', key: 'balcony', type: 'bool' },
    { label: 'Loggia', key: 'loggia', type: 'bool' },
  ];

  return (
    <div className="flex h-full">
      {/* Left Fixed Column */}
      <div className="w-1/3 min-w-[120px] border-r border-gray-200 bg-gray-50 flex flex-col z-10 shadow-sm">
         <div className="p-4 border-b border-gray-200 h-[200px] flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{selectedApartments.length}</h2>
              <p className="text-sm text-gray-500">selected</p>
            </div>
            <div className="space-y-2">
               <button className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                 <Phone size={14} /> Contact
               </button>
               <button 
                 onClick={clearComparison}
                 className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
               >
                 <Trash2 size={14} /> Clear All
               </button>
            </div>
         </div>
         <div className="flex-1 overflow-y-auto">
             {parameters.map((param, idx) => (
                <div 
                  key={idx} 
                  className={clsx(
                    "px-4 flex items-center border-b border-gray-100",
                    param.type === 'header' ? "h-8 bg-gray-100 font-bold text-xs uppercase text-gray-500" : "h-12 text-sm font-medium text-gray-700"
                  )}
                >
                  {param.label}
                </div>
             ))}
         </div>
      </div>

      {/* Right Scrollable Columns */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex" style={{ width: `${selectedApartments.length * 200}px` }}>
           {selectedApartments.map(apt => (
             <div key={apt.id} className="w-[200px] flex-shrink-0 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-200 h-[200px] flex flex-col">
                   <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-lg">{apt.index}</span>
                      <button onClick={() => removeFromComparison(apt.id)} className="text-gray-400 hover:text-red-500">
                         <Trash2 size={16} />
                      </button>
                   </div>
                   <div className="flex-1 bg-gray-100 mb-2 rounded overflow-hidden">
                      <img src={apt.layoutImage2d} className="w-full h-full object-contain" alt="plan" />
                   </div>
                   <button 
                      onClick={() => selectApartment(apt.id)}
                      className="text-blue-600 text-xs font-medium hover:underline flex items-center justify-center"
                    >
                      Go to apartment <ArrowRight size={12} className="ml-1" />
                   </button>
                </div>
                
                <div className="flex-1">
                   {parameters.map((param, idx) => {
                     if (param.type === 'header') {
                       return <div key={idx} className="h-8 bg-gray-50 border-b border-gray-100"></div>;
                     }
                     
                     let value = (apt as any)[param.key!];
                     if (param.type === 'bool') {
                        value = value ? 'Yes' : 'No';
                     } else if (param.format) {
                        value = param.format(value);
                     }

                     return (
                       <div key={idx} className="h-12 border-b border-gray-100 flex items-center justify-center text-sm text-gray-600">
                          {value}
                       </div>
                     );
                   })}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
