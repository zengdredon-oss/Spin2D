# Spin2D Database Schema

This document describes the recommended database schema for the Spin2D real estate visualization platform.

## Tables Overview

### 1. Buildings

Stores information about each building in the development.

```sql
CREATE TABLE buildings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL,
    frame_count INTEGER NOT NULL DEFAULT 72,
    images_base_path VARCHAR(255),
    masks_base_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Apartments

Main table storing all apartment information.

```sql
CREATE TABLE apartments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
    
    -- Identification
    index VARCHAR(20) NOT NULL UNIQUE,  -- e.g., "F.5.1"
    
    -- Location
    floor INTEGER NOT NULL,
    
    -- Specifications
    area DECIMAL(10,2) NOT NULL,        -- m²
    rooms INTEGER NOT NULL,
    
    -- Pricing
    price DECIMAL(15,2) NOT NULL,
    price_per_m2 DECIMAL(10,2) GENERATED ALWAYS AS (price / area) STORED,
    
    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'available' 
        CHECK (status IN ('available', 'reserved', 'sold')),
    
    -- Additional attributes
    has_garden BOOLEAN DEFAULT FALSE,
    has_terrace BOOLEAN DEFAULT FALSE,
    has_balcony BOOLEAN DEFAULT FALSE,
    has_loggia BOOLEAN DEFAULT FALSE,
    
    -- Amenities
    has_air_conditioning BOOLEAN DEFAULT FALSE,
    has_smart_home BOOLEAN DEFAULT FALSE,
    
    -- Promotion
    has_promotion BOOLEAN DEFAULT FALSE,
    original_price DECIMAL(15,2),
    promotion_label VARCHAR(100),
    promotion_start_date DATE,
    promotion_end_date DATE,
    
    -- Technical (for viewer)
    frame_number INTEGER NOT NULL,
    mask_color VARCHAR(7) NOT NULL,     -- hex color e.g., "#FF0000"
    
    -- Media
    floor_plan_2d_url VARCHAR(255),
    floor_plan_3d_url VARCHAR(255),
    tour_360_url VARCHAR(255),
    balcony_panorama_url VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_apartments_building (building_id),
    INDEX idx_apartments_status (status),
    INDEX idx_apartments_price (price),
    INDEX idx_apartments_area (area),
    INDEX idx_apartments_rooms (rooms),
    INDEX idx_apartments_floor (floor)
);
```

### 3. Mask Colors

Predefined color palette for apartment and POI masks.

```sql
CREATE TABLE mask_colors (
    id SERIAL PRIMARY KEY,
    color_hex VARCHAR(7) NOT NULL UNIQUE,
    color_type VARCHAR(20) NOT NULL CHECK (color_type IN ('apartment', 'poi')),
    is_assigned BOOLEAN DEFAULT FALSE,
    assigned_entity_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert predefined apartment colors (45 colors)
INSERT INTO mask_colors (color_hex, color_type) VALUES
    ('#FF0000', 'apartment'), ('#00FF00', 'apartment'), ('#0000FF', 'apartment'),
    ('#FFFF00', 'apartment'), ('#FF00FF', 'apartment'), ('#00FFFF', 'apartment'),
    -- ... more colors
    ;

-- Insert predefined POI colors (15 colors)
INSERT INTO mask_colors (color_hex, color_type) VALUES
    ('#800000', 'poi'), ('#008000', 'poi'), ('#000080', 'poi'),
    -- ... more colors
    ;
```

### 4. Points of Interest (POI)

Nearby amenities and locations.

```sql
CREATE TABLE points_of_interest (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'school', 'kindergarten', 'hospital', 'metro', 'park',
        'shop', 'restaurant', 'gym', 'pharmacy', 'bank'
    )),
    distance_meters INTEGER NOT NULL,
    
    -- Technical
    mask_color VARCHAR(7) REFERENCES mask_colors(color_hex),
    frame_number INTEGER,
    
    -- Geolocation
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_poi_category (category)
);
```

### 5. Gallery Images

Building renders and promotional images.

```sql
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_gallery_category (category),
    INDEX idx_gallery_sort (sort_order)
);
```

### 6. Favorites / Comparisons (Optional - for user sessions)

Track user favorites across sessions.

```sql
CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(100) NOT NULL,
    apartment_id UUID REFERENCES apartments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (session_id, apartment_id),
    INDEX idx_favorites_session (session_id)
);
```

### 7. Inquiries (Lead tracking)

Store contact form submissions.

```sql
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Contact info
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    
    -- Context
    apartment_ids UUID[],
    source_url TEXT,
    
    -- Status tracking
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    
    -- CRM integration
    crm_lead_id VARCHAR(100),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_inquiries_status (status),
    INDEX idx_inquiries_email (email)
);
```

### 8. Frame Images (Optional - for frame management)

Track rendered frames for each building view.

```sql
CREATE TABLE frame_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
    frame_number INTEGER NOT NULL,
    image_type VARCHAR(20) NOT NULL CHECK (image_type IN ('render', 'mask')),
    image_url VARCHAR(255) NOT NULL,
    width INTEGER,
    height INTEGER,
    file_size_bytes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (building_id, frame_number, image_type),
    INDEX idx_frames_building (building_id)
);
```

## Views

### Available Apartments Summary

```sql
CREATE VIEW v_available_apartments AS
SELECT 
    a.*,
    b.name as building_name,
    b.label as building_label
FROM apartments a
JOIN buildings b ON a.building_id = b.id
WHERE a.status = 'available'
ORDER BY a.price ASC;
```

### Apartments with Promotions

```sql
CREATE VIEW v_promoted_apartments AS
SELECT *
FROM apartments
WHERE has_promotion = TRUE
  AND (promotion_end_date IS NULL OR promotion_end_date >= CURRENT_DATE)
ORDER BY (original_price - price) DESC;
```

## Indexes Summary

The schema includes indexes optimized for common queries:

1. **Filter queries**: Indexes on status, price, area, rooms, floor
2. **Building lookups**: Index on building_id
3. **Gallery browsing**: Indexes on category and sort_order
4. **Session tracking**: Index on session_id for favorites

## Migration Notes

When migrating from mock data to a database:

1. Export mock data from `src/data/apartments.ts` to SQL INSERT statements
2. Generate unique UUIDs for each record
3. Ensure mask colors are unique per building
4. Update the API endpoints to read from database instead of static files

## API Recommendations

For future API implementation:

```
GET /api/buildings - List all buildings
GET /api/buildings/:id/apartments - Get apartments for building
GET /api/apartments/:id - Get apartment details
POST /api/inquiries - Submit contact form
GET /api/gallery - List gallery images
GET /api/poi - List points of interest
```

## CRM Integration

The `inquiries` table includes a `crm_lead_id` field for integration with external CRM systems (Salesforce, HubSpot, etc.). Recommended approach:

1. Create webhook endpoint for new inquiry notifications
2. Map apartment IDs to CRM product IDs
3. Sync lead status back from CRM to `inquiries.status`
