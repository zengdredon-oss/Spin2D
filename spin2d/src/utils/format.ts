// Format price with thousands separator and currency
export const formatPrice = (price: number, currency: string = 'zł'): string => {
  return `${price.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
};

// Format price short (for display in compact spaces)
export const formatPriceShort = (price: number): string => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(2)} млн zł`;
  }
  if (price >= 1000) {
    return `${Math.round(price / 1000)} тыс. zł`;
  }
  return `${price} zł`;
};

// Format area
export const formatArea = (area: number): string => {
  return `${area.toLocaleString('pl-PL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} m²`;
};

// Format distance
export const formatDistance = (meters: number): string => {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${meters} m`;
};

// Get status color class
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'available':
      return 'text-green-500';
    case 'reserved':
      return 'text-yellow-500';
    case 'sold':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

// Get status background color class
export const getStatusBgColor = (status: string): string => {
  switch (status) {
    case 'available':
      return 'bg-green-500';
    case 'reserved':
      return 'bg-yellow-500';
    case 'sold':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

// Get status label
export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'available':
      return 'Available';
    case 'reserved':
      return 'Reserved';
    case 'sold':
      return 'Sold';
    default:
      return status;
  }
};

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// Generate share URL with filters
export const generateShareUrl = <T extends object>(filters: T): string => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.set(key, JSON.stringify(value));
    }
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
};
