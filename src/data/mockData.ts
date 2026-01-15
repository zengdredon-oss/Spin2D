import type { Apartment } from '../types';

const generateApartments = (count: number): Apartment[] => {
  const apartments: Apartment[] = [];
  const statuses: ('available' | 'reserved' | 'sold')[] = ['available', 'reserved', 'sold'];

  for (let i = 0; i < count; i++) {
    const area = Math.floor(Math.random() * (120 - 40) + 40);
    const rooms = area > 90 ? 3 : area > 60 ? 2 : 1;
    const floor = Math.floor(Math.random() * 10) + 1;
    const pricePerSqm = Math.floor(Math.random() * (3000 - 1500) + 1500);
    const price = area * pricePerSqm;
    
    apartments.push({
      id: `apt-${i}`,
      index: `A.${floor}.${i % 5 + 1}`,
      floor,
      area,
      rooms,
      price,
      pricePerSqm,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      garden: floor === 1 && Math.random() > 0.5,
      terrace: floor === 10 && Math.random() > 0.5,
      balcony: floor > 1 && floor < 10 && Math.random() > 0.3,
      loggia: floor > 1 && floor < 10 && Math.random() > 0.7,
      ac: Math.random() > 0.5,
      smartHome: Math.random() > 0.5,
      frameNumber: Math.floor(Math.random() * 36) * 10, // Assuming 360 frames
      layoutImage2d: 'https://placehold.co/600x400?text=2D+Plan',
      layoutImage3d: 'https://placehold.co/600x400?text=3D+Plan',
    });
  }
  return apartments;
};

export const MOCK_APARTMENTS = generateApartments(50);
