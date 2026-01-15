import React from 'react';
import { ApartmentStatus } from '../../types';
import { getStatusLabel } from '../../utils/format';

interface StatusBadgeProps {
  status: ApartmentStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const colorClasses = {
    available: 'bg-green-100 text-green-700 border-green-200',
    reserved: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    sold: 'bg-red-100 text-red-700 border-red-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${colorClasses[status]} ${sizeClasses[size]}`}
    >
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
