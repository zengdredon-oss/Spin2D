import { PointOfInterest, POICategory } from '../types';

// Colors for Points of Interest (15 colors)
const poiColors = [
  '#800000', '#008000', '#000080', '#808000', '#800080',
  '#008080', '#804000', '#408000', '#004080', '#400080',
  '#804080', '#408080', '#804040', '#408040', '#004040'
];

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: 'poi-school-1',
    name: 'Elementary School No. 15',
    category: 'school',
    distance: 450,
    maskColor: poiColors[0],
    frameNumber: 10,
    coordinates: { lat: 52.2297, lng: 21.0122 }
  },
  {
    id: 'poi-kindergarten-1',
    name: 'Happy Kids Kindergarten',
    category: 'kindergarten',
    distance: 280,
    maskColor: poiColors[1],
    frameNumber: 15,
    coordinates: { lat: 52.2300, lng: 21.0115 }
  },
  {
    id: 'poi-hospital-1',
    name: 'City Hospital',
    category: 'hospital',
    distance: 850,
    maskColor: poiColors[2],
    frameNumber: 25,
    coordinates: { lat: 52.2280, lng: 21.0150 }
  },
  {
    id: 'poi-metro-1',
    name: 'Metro Station Central',
    category: 'metro',
    distance: 600,
    maskColor: poiColors[3],
    frameNumber: 30,
    coordinates: { lat: 52.2310, lng: 21.0100 }
  },
  {
    id: 'poi-park-1',
    name: 'Green Valley Park',
    category: 'park',
    distance: 200,
    maskColor: poiColors[4],
    frameNumber: 5,
    coordinates: { lat: 52.2295, lng: 21.0130 }
  },
  {
    id: 'poi-shop-1',
    name: 'Shopping Mall Plaza',
    category: 'shop',
    distance: 750,
    maskColor: poiColors[5],
    frameNumber: 40,
    coordinates: { lat: 52.2270, lng: 21.0180 }
  },
  {
    id: 'poi-restaurant-1',
    name: 'Gourmet Restaurant Row',
    category: 'restaurant',
    distance: 350,
    maskColor: poiColors[6],
    frameNumber: 45,
    coordinates: { lat: 52.2305, lng: 21.0140 }
  },
  {
    id: 'poi-gym-1',
    name: 'FitLife Gym',
    category: 'gym',
    distance: 400,
    maskColor: poiColors[7],
    frameNumber: 50,
    coordinates: { lat: 52.2290, lng: 21.0095 }
  },
  {
    id: 'poi-pharmacy-1',
    name: '24h Pharmacy',
    category: 'pharmacy',
    distance: 180,
    maskColor: poiColors[8],
    frameNumber: 55,
    coordinates: { lat: 52.2302, lng: 21.0125 }
  },
  {
    id: 'poi-bank-1',
    name: 'National Bank Branch',
    category: 'bank',
    distance: 500,
    maskColor: poiColors[9],
    frameNumber: 60,
    coordinates: { lat: 52.2285, lng: 21.0110 }
  }
];

export const poiCategoryLabels: Record<POICategory, string> = {
  school: 'Schools',
  kindergarten: 'Kindergartens',
  hospital: 'Hospitals',
  metro: 'Metro Stations',
  park: 'Parks',
  shop: 'Shopping',
  restaurant: 'Restaurants',
  gym: 'Gyms',
  pharmacy: 'Pharmacies',
  bank: 'Banks'
};

export const poiCategoryIcons: Record<POICategory, string> = {
  school: '🏫',
  kindergarten: '👶',
  hospital: '🏥',
  metro: '🚇',
  park: '🌳',
  shop: '🛒',
  restaurant: '🍽️',
  gym: '🏋️',
  pharmacy: '💊',
  bank: '🏦'
};
