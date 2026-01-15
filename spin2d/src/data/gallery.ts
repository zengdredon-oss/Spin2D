import { GalleryItem } from '../types';

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'Building Exterior - Day',
    category: 'Exterior',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
  },
  {
    id: 'gallery-2',
    title: 'Building Exterior - Night',
    category: 'Exterior',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
  },
  {
    id: 'gallery-3',
    title: 'Living Room Design',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
  },
  {
    id: 'gallery-4',
    title: 'Modern Kitchen',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
  },
  {
    id: 'gallery-5',
    title: 'Master Bedroom',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400',
  },
  {
    id: 'gallery-6',
    title: 'Bathroom',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400',
  },
  {
    id: 'gallery-7',
    title: 'Courtyard',
    category: 'Amenities',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
  },
  {
    id: 'gallery-8',
    title: 'Playground',
    category: 'Amenities',
    imageUrl: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=400',
  },
  {
    id: 'gallery-9',
    title: 'Parking Area',
    category: 'Amenities',
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400',
  },
  {
    id: 'gallery-10',
    title: 'Rooftop Terrace',
    category: 'Amenities',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
  },
  {
    id: 'gallery-11',
    title: 'Aerial View',
    category: 'Exterior',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
  },
  {
    id: 'gallery-12',
    title: 'Entrance Lobby',
    category: 'Common Areas',
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400',
  },
];

export const galleryCategories = [...new Set(galleryItems.map(item => item.category))];
