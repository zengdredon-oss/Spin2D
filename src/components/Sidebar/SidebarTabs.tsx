import React from 'react';
import { useStore } from '../../store/useStore';
import type { SidebarTab } from '../../types';
import { Filter, MapPin, Image, Scale } from 'lucide-react';
import { clsx } from 'clsx';

export const SidebarTabs: React.FC = () => {
  const { activeTab, setActiveTab } = useStore();

  const tabs: { id: SidebarTab; label: string; icon: React.ReactNode }[] = [
    { id: 'filters', label: 'Filters', icon: <Filter size={18} /> },
    { id: 'location', label: 'Location', icon: <MapPin size={18} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={18} /> },
    { id: 'comparison', label: 'Compare', icon: <Scale size={18} /> },
  ];

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={clsx(
            "flex-1 py-3 px-2 flex flex-col items-center justify-center text-xs font-medium transition-colors",
            activeTab === tab.id
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          )}
        >
          <span className="mb-1">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
