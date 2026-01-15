import React, { useState } from 'react';
import { FiChevronLeft, FiX, FiChevronRight, FiChevronLeft as FiPrevious } from 'react-icons/fi';
import { galleryItems, galleryCategories } from '../../data/gallery';

interface GalleryPanelProps {
  onBack: () => void;
}

export const GalleryPanel: React.FC<GalleryPanelProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = selectedCategory
    ? galleryItems.filter(item => item.category === selectedCategory)
    : galleryItems;

  const openLightbox = (imageUrl: string, index: number) => {
    setLightboxImage(imageUrl);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (lightboxIndex + 1) % filteredItems.length
      : (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredItems[newIndex].imageUrl);
  };

  return (
    <div className="flex h-full">
      {/* Left panel - Categories */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Gallery</h2>
          <p className="text-sm text-gray-500">{galleryItems.length} images</p>
        </div>

        <div className="flex-1 p-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
              selectedCategory === null
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All images
          </button>
          
          <div className="mt-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Categories</p>
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category}
                <span className="ml-2 text-xs text-gray-400">
                  ({galleryItems.filter(i => i.category === category).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Gallery grid (Masonry style) */}
      <div className="flex-1 relative bg-gray-50 overflow-auto">
        {/* Back button */}
        <div className="sticky top-0 left-0 z-10 p-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiChevronLeft size={18} />
            <span className="text-sm font-medium">Main view</span>
          </button>
        </div>

        {/* Masonry grid */}
        <div className="p-4 pt-0">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filteredItems.map((item, index) => {
              // Vary heights for masonry effect
              const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52'];
              const heightClass = heights[index % heights.length];
              
              return (
                <div
                  key={item.id}
                  className={`break-inside-avoid mb-4 cursor-pointer group`}
                  onClick={() => openLightbox(item.imageUrl, index)}
                >
                  <div className={`${heightClass} relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow`}>
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-medium text-sm">{item.title}</p>
                        <p className="text-white/70 text-xs">{item.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            className="absolute left-4 p-3 text-white/70 hover:text-white transition-colors"
          >
            <FiPrevious size={32} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            className="absolute right-4 p-3 text-white/70 hover:text-white transition-colors"
          >
            <FiChevronRight size={32} />
          </button>

          {/* Image */}
          <img
            src={lightboxImage}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white font-medium">{filteredItems[lightboxIndex]?.title}</p>
            <p className="text-white/60 text-sm">
              {lightboxIndex + 1} / {filteredItems.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPanel;
