import React from 'react';
import { FiHeart, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { Apartment } from '../../types';
import { useStore } from '../../store/useStore';
import { formatPrice, formatArea, getStatusColor } from '../../utils/format';

interface ResultsTableProps {
  apartments: Apartment[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ apartments }) => {
  const { 
    setSelectedApartment, 
    selectedApartmentId,
    hoveredApartmentId,
    setHoveredApartment,
    sortConfig, 
    setSortConfig,
    addToComparison,
    removeFromComparison,
    isInComparison,
  } = useStore();

  const handleSort = (field: keyof Apartment) => {
    if (sortConfig.field === field) {
      setSortConfig({
        field,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ field, direction: 'asc' });
    }
  };

  const SortIcon = ({ field }: { field: keyof Apartment }) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.direction === 'asc' ? (
      <FiChevronUp className="inline ml-1" size={14} />
    ) : (
      <FiChevronDown className="inline ml-1" size={14} />
    );
  };

  const handleFavoriteClick = (e: React.MouseEvent, apt: Apartment) => {
    e.stopPropagation();
    if (isInComparison(apt.id)) {
      removeFromComparison(apt.id);
    } else {
      addToComparison(apt.id);
    }
  };

  return (
    <table className="w-full text-sm">
      <thead className="sticky top-0 bg-white border-b border-gray-200">
        <tr>
          <th 
            className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => handleSort('index')}
          >
            Nr. <SortIcon field="index" />
          </th>
          <th 
            className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => handleSort('area')}
          >
            Area <SortIcon field="area" />
          </th>
          <th 
            className="px-4 py-3 text-center font-medium text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => handleSort('rooms')}
          >
            Rms. <SortIcon field="rooms" />
          </th>
          <th 
            className="px-4 py-3 text-center font-medium text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => handleSort('floor')}
          >
            Floor <SortIcon field="floor" />
          </th>
          <th 
            className="px-4 py-3 text-right font-medium text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => handleSort('price')}
          >
            Price <SortIcon field="price" />
          </th>
          <th className="px-4 py-3 w-10"></th>
        </tr>
      </thead>
      <tbody>
        {apartments.map((apt) => (
          <tr
            key={apt.id}
            onClick={() => setSelectedApartment(apt.id)}
            onMouseEnter={() => setHoveredApartment(apt.id)}
            onMouseLeave={() => setHoveredApartment(null)}
            className={`
              border-b border-gray-100 cursor-pointer transition-colors
              ${selectedApartmentId === apt.id ? 'bg-primary-50' : ''}
              ${hoveredApartmentId === apt.id ? 'bg-gray-50' : ''}
              hover:bg-gray-50
            `}
          >
            <td className="px-4 py-3">
              <span className={`font-medium ${getStatusColor(apt.status)}`}>
                {apt.index}
              </span>
            </td>
            <td className="px-4 py-3 text-gray-600">{formatArea(apt.area)}</td>
            <td className="px-4 py-3 text-center text-gray-600">{apt.rooms}</td>
            <td className="px-4 py-3 text-center text-gray-600">{apt.floor}</td>
            <td className="px-4 py-3 text-right">
              {apt.hasPromotion ? (
                <div className="flex flex-col items-end">
                  <span className="text-xs text-primary-500 font-medium">Promotion!</span>
                  <span className="text-primary-600 font-semibold">
                    {formatPrice(apt.price)} *
                  </span>
                  {apt.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(apt.originalPrice)}
                    </span>
                  )}
                  {apt.promotionLabel && (
                    <span className="text-xs text-gray-500">* {apt.promotionLabel}</span>
                  )}
                </div>
              ) : (
                <span className="text-gray-700 font-medium">{formatPrice(apt.price)}</span>
              )}
            </td>
            <td className="px-4 py-3">
              <button
                onClick={(e) => handleFavoriteClick(e, apt)}
                className={`p-1 rounded transition-colors ${
                  isInComparison(apt.id)
                    ? 'text-primary-500 hover:text-primary-600'
                    : 'text-gray-300 hover:text-primary-500'
                }`}
              >
                <FiHeart 
                  size={18} 
                  fill={isInComparison(apt.id) ? 'currentColor' : 'none'} 
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
