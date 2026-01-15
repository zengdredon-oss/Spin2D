import React from 'react';
import { useStore } from '../../store/useStore';
import { SidebarTabs } from './SidebarTabs';
import { Filters } from './Filters';
import { ResultList } from './ResultList';
import { ComparisonView } from './ComparisonView';
import { ChevronLeft, ChevronRight, Scale } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar, activeTab, setActiveTab, comparisonIds } = useStore();

  if (!isSidebarOpen) {
    return (
      <div className="absolute bottom-4 left-4 z-50">
        <button 
          onClick={toggleSidebar}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-1/4 h-screen bg-white shadow-xl flex flex-col border-r border-gray-200 relative z-40 transition-all duration-300">
      <SidebarTabs />
      
      <div className="flex-1 overflow-y-auto relative">
        {activeTab === 'filters' && (
          <>
            <Filters />
            <ResultList />
          </>
        )}
        {activeTab === 'location' && <div className="p-4">Location Map Placeholder</div>}
        {activeTab === 'gallery' && <div className="p-4">Gallery Placeholder</div>}
        {activeTab === 'comparison' && <ComparisonView />}
        
        {/* Floating Compare Button */}
        {activeTab !== 'comparison' && comparisonIds.length > 0 && (
           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
              <button 
                onClick={() => setActiveTab('comparison')}
                className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 animate-bounce"
              >
                 <Scale size={16} />
                 Compare ({comparisonIds.length})
              </button>
           </div>
        )}
      </div>

      <div className="absolute bottom-4 -right-12 z-50">
          <button 
            onClick={toggleSidebar}
            className="bg-white p-2 rounded-r-lg shadow-md hover:bg-gray-100 transition-colors"
            title="Collapse Menu"
          >
            <ChevronLeft size={20} />
          </button>
      </div>
    </div>
  );
};
