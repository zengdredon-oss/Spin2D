import React from 'react';
import { useStore } from '../../store/useStore';

export const CompareButton: React.FC = () => {
  const { comparisonIds, setTabMode } = useStore();

  if (comparisonIds.length === 0) return null;

  return (
    <button
      onClick={() => setTabMode('comparison')}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all hover:scale-105 z-40"
    >
      <span className="font-medium">Compare</span>
      <span className="w-6 h-6 rounded-full bg-white text-primary-500 text-sm font-bold flex items-center justify-center">
        {comparisonIds.length}
      </span>
    </button>
  );
};

export default CompareButton;
