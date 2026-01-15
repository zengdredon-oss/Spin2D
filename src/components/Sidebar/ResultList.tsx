import React from 'react';
import { useStore } from '../../store/useStore';
import { LayoutGrid, List, Heart } from 'lucide-react';
import { clsx } from 'clsx';

export const ResultList: React.FC = () => {
  const { 
    getFilteredApartments, 
    resultViewMode, 
    setResultViewMode,
    addToComparison,
    removeFromComparison,
    comparisonIds,
    selectApartment,
    selectedApartmentId
  } = useStore();

  const apartments = getFilteredApartments();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50 border-green-200';
      case 'reserved': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'sold': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600';
    }
  };

  const getDotColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'reserved': return 'bg-yellow-500';
      case 'sold': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleCompare = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (comparisonIds.includes(id)) {
      removeFromComparison(id);
    } else {
      addToComparison(id);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-gray-50">
        <span className="text-sm font-medium text-gray-600">{apartments.length} Results</span>
        <div className="flex bg-white rounded border border-gray-200 p-0.5">
          <button
            onClick={() => setResultViewMode('table')}
            className={clsx(
              "p-1.5 rounded transition-colors",
              resultViewMode === 'table' ? "bg-gray-100 text-gray-800" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setResultViewMode('cards')}
            className={clsx(
              "p-1.5 rounded transition-colors",
              resultViewMode === 'cards' ? "bg-gray-100 text-gray-800" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4">
        {resultViewMode === 'table' ? (
          <div className="min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nr.</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rms.</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="relative px-3 py-2">
                      <span className="sr-only">Compare</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {apartments.map((apt) => (
                    <tr 
                      key={apt.id} 
                      onClick={() => selectApartment(apt.id)}
                      className={clsx(
                        "cursor-pointer hover:bg-gray-50 transition-colors",
                        selectedApartmentId === apt.id ? "bg-blue-50" : ""
                      )}
                    >
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={clsx("w-2 h-2 rounded-full mr-2", getDotColor(apt.status))}></span>
                          <span className="text-sm font-medium text-gray-900">{apt.index}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{apt.area} m²</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{apt.rooms}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{apt.floor}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{apt.price.toLocaleString()}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={(e) => toggleCompare(e, apt.id)}
                          className={clsx(
                            "text-gray-400 hover:text-red-500 transition-colors",
                            comparisonIds.includes(apt.id) ? "text-red-500 fill-current" : ""
                          )}
                        >
                          <Heart size={16} fill={comparisonIds.includes(apt.id) ? "currentColor" : "none"}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {apartments.map((apt) => (
              <div 
                key={apt.id}
                onClick={() => selectApartment(apt.id)}
                className={clsx(
                  "border rounded-lg overflow-hidden flex cursor-pointer hover:shadow-md transition-shadow bg-white",
                  selectedApartmentId === apt.id ? "ring-2 ring-blue-500" : "border-gray-200"
                )}
              >
                {/* Left Info */}
                <div className="flex-1 p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{apt.index}</h3>
                      <span className={clsx("text-xs px-2 py-0.5 rounded-full border", getStatusColor(apt.status))}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Area:</span>
                      <span className="font-medium text-gray-900">{apt.area} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rooms:</span>
                      <span className="font-medium text-gray-900">{apt.rooms}</span>
                    </div>
                    <div className="flex justify-between">
                       <span>Floor:</span>
                       <span className="font-medium text-gray-900">{apt.floor}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100">
                     <span className="text-lg font-bold text-gray-900">{apt.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Right Image */}
                <div className="w-1/3 bg-gray-100 relative">
                   <img src={apt.layoutImage2d} alt="Plan" className="w-full h-full object-cover" />
                   <button 
                      onClick={(e) => toggleCompare(e, apt.id)}
                      className={clsx(
                        "absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors",
                        comparisonIds.includes(apt.id) ? "text-red-500" : "text-gray-400"
                      )}
                   >
                      <Heart size={16} fill={comparisonIds.includes(apt.id) ? "currentColor" : "none"} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
