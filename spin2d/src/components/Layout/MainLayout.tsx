import React from 'react';
import { useStore } from '../../store/useStore';
import { Sidebar } from './Sidebar';
import { SpinViewer, FloorPlanView, Tour360View, BalconyView } from '../Viewer';
import { ComparisonPanel } from '../Comparison';
import { LocationPanel } from '../Location';
import { GalleryPanel } from '../Gallery';

export const MainLayout: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    tabMode, 
    setTabMode,
    isMenuCollapsed,
  } = useStore();

  const handleBackToBuilding = () => {
    setViewMode('building');
  };

  const handleBackFromTab = () => {
    setTabMode('apartments');
  };

  // Render full-screen views for certain tabs
  if (tabMode === 'comparison') {
    return <ComparisonPanel onBack={handleBackFromTab} />;
  }

  if (tabMode === 'location') {
    return <LocationPanel onBack={handleBackFromTab} />;
  }

  if (tabMode === 'gallery') {
    return <GalleryPanel onBack={handleBackFromTab} />;
  }

  // Render viewer content based on view mode
  const renderViewerContent = () => {
    switch (viewMode) {
      case 'floorplan':
      case 'floorplan3d':
        return <FloorPlanView onBack={handleBackToBuilding} />;
      case 'tour360':
        return <Tour360View onBack={handleBackToBuilding} />;
      case 'balcony':
        return <BalconyView onBack={handleBackToBuilding} />;
      case 'building':
      default:
        return <SpinViewer />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main viewer area */}
      <div className="flex-1 relative">
        {renderViewerContent()}
      </div>
    </div>
  );
};

export default MainLayout;
