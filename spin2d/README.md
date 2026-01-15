# Spin2D - Real Estate Visualization Platform

An interactive 3D real estate visualization platform for property developers to showcase and sell apartments.

## Features

### 360° Building Viewer
- **Frame Sequence Animation**: Drag to rotate the building view with smooth animation
- **Apartment Highlighting**: Color-coded apartments based on status (Available/Reserved/Sold)
- **Interactive Selection**: Click on apartments to view details
- **Navigation Controls**: Rotate 90° left/right buttons, overlay toggle

### Apartment Filtering
- **Range Sliders**: Filter by area, price, rooms, and floor
- **Status Filters**: Available, Reserved, Sold, or All
- **Advanced Filters**: 
  - Additional attributes: Garden, Terrace, Balcony, Loggia
  - Amenities: Air Conditioning, Smart Home
- **Share Filters**: Copy URL with current filter settings

### Multiple View Modes
- **Building View**: 360° rotation with apartment highlights
- **Floor Plan**: 2D and 3D floor plan views
- **360° Tour**: Virtual tour of apartments
- **Balcony View**: Panoramic balcony views

### Results Display
- **Table View**: Sortable columns with apartment details
- **Card View**: Visual cards with floor plan thumbnails
- **Promotion Badges**: Highlight special offers

### Comparison Feature
- Add up to 4 apartments to compare
- Side-by-side comparison of all features
- Quick navigation to selected apartments

### Location Tab
- Interactive map with points of interest
- Filterable POI categories (Schools, Metro, Parks, etc.)
- Route planning from custom address

### Gallery Tab
- Masonry-style image gallery
- Category filtering
- Lightbox view with navigation

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Zustand** for state management
- **Tailwind CSS** for styling
- **React Icons** for iconography

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Common/           # Reusable UI components
│   ├── Comparison/       # Apartment comparison feature
│   ├── Filters/          # Filter panel components
│   ├── Gallery/          # Image gallery
│   ├── Layout/           # Main layout components
│   ├── Location/         # Location map and POI
│   ├── Results/          # Results table and cards
│   └── Viewer/           # 360° viewer components
├── data/
│   ├── apartments.ts     # Apartment mock data
│   ├── gallery.ts        # Gallery images
│   └── poi.ts            # Points of interest
├── store/
│   └── useStore.ts       # Zustand store
├── types/
│   └── index.ts          # TypeScript interfaces
└── utils/
    ├── colors.ts         # Color utilities
    └── format.ts         # Formatting utilities
```

## Data Structure

### Apartment
```typescript
interface Apartment {
  id: string;
  index: string;          // e.g., "F.5.1"
  building: string;
  floor: number;
  area: number;           // m²
  rooms: number;
  price: number;
  pricePerM2: number;
  status: 'available' | 'reserved' | 'sold';
  
  // Additional attributes
  hasGarden: boolean;
  hasTerrace: boolean;
  hasBalcony: boolean;
  hasLoggia: boolean;
  hasAirConditioning: boolean;
  hasSmartHome: boolean;
  
  // Technical
  frameNumber: number;    // For animation
  maskColor: string;      // For hit detection
}
```

### Mask Colors
- **45 colors** for apartment masks
- **15 colors** for points of interest
- Used for interactive hit detection on the viewer

## Future Enhancements

- [ ] API integration for real-time data
- [ ] CRM system integration
- [ ] Developer admin panel
- [ ] Multiple building support
- [ ] Real 360° viewer integration (Pannellum, etc.)
- [ ] Google Maps integration
- [ ] Multi-language support
- [ ] Analytics dashboard

## License

MIT
