import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  images: string[];
  description: string;
  amenities: string[];
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  favorites: string[];
  setFilters: (filters: any) => void;
  clearFilters: () => void;
  toggleFavorite: (propertyId: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
}

// Mock property data
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Premium Apartment in DLF Cyber City',
    price: 45000,
    location: 'DLF Cyber City, Gurgaon',
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    type: 'Apartment',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', // Exterior
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800', // Living Room
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800', // Kitchen
    ],
    description: 'Luxurious 3 BHK apartment in prime location of Gurgaon with modern amenities, 24x7 security, and breathtaking city views.',
    amenities: ['Power Backup', 'Gym', 'Pool', 'Parking', 'Security', 'Club House'],
  },
  {
    id: '2',
    title: 'Sea-Facing Apartment in Worli',
    price: 85000,
    location: 'Worli Sea Face, Mumbai',
    bedrooms: 4,
    bathrooms: 4,
    area: 2200,
    type: 'Apartment',
    images: [
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800', // Exterior view
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800', // Living area
      'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg?auto=compress&cs=tinysrgb&w=800', // Master bedroom
    ],
    description: 'Stunning 4 BHK sea-facing apartment in Worli with premium finishes, servant quarters, and world-class amenities.',
    amenities: ['Power Backup', 'Gym', 'Pool', 'Parking', 'Security', 'Servant Room'],
  },
  {
    id: '3',
    title: 'Modern Flat in Electronic City',
    price: 25000,
    location: 'Electronic City Phase 1, Bangalore',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'Apartment',
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800', // Building exterior
      'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=800', // Modern living room
      'https://images.pexels.com/photos/3935349/pexels-photo-3935349.jpeg?auto=compress&cs=tinysrgb&w=800', // Kitchen area
    ],
    description: 'Well-designed 2 BHK apartment perfect for IT professionals, with modern amenities and close to major tech parks.',
    amenities: ['Power Backup', 'Gym', 'Security', 'Children Park'],
  },
  {
    id: '4',
    title: 'Luxury Villa in Jubilee Hills',
    price: 120000,
    location: 'Jubilee Hills, Hyderabad',
    bedrooms: 5,
    bathrooms: 5,
    area: 4500,
    type: 'Villa',
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800', // Villa exterior
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800', // Luxurious living room
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800', // Garden view
    ],
    description: 'Magnificent 5 BHK villa with private garden, home theater, modular kitchen, and premium Italian marble flooring.',
    amenities: ['Power Backup', 'Pool', 'Parking', 'Security', 'Home Theater', 'Garden'],
  },
  {
    id: '5',
    title: 'Premium Flat in Koramangala',
    price: 35000,
    location: 'Koramangala, Bangalore',
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: 'Apartment',
    images: [
      'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=800', // Building exterior
      'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=800', // Modern living space
      'https://images.pexels.com/photos/3935325/pexels-photo-3935325.jpeg?auto=compress&cs=tinysrgb&w=800', // Dining area
    ],
    description: 'Spacious 3 BHK apartment in prime Koramangala location with modern amenities, reserved parking, and 24x7 security.',
    amenities: ['Power Backup', 'Gym', 'Pool', 'Parking', 'Security', 'Children Park'],
  },
  {
    id: '6',
    title: 'Garden View Independent House',
    price: 65000,
    location: 'Vasant Vihar, New Delhi',
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    type: 'House',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', // House exterior
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', // Living room
      'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800', // Garden area
    ],
    description: 'Beautiful 4 BHK independent house with landscaped garden, modern interiors, and servant quarters in prestigious Vasant Vihar.',
    amenities: ['Power Backup', 'Parking', 'Security', 'Garden', 'Servant Room'],
  },
];

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [properties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setFilters = (filters: any) => {
    let filtered = [...properties];

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query)
      );
    }

    // Filter by location
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(location)
      );
    }

    // Filter by price range
    if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 150000)) {
      filtered = filtered.filter(
        (property) =>
          property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
      );
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      const minBedrooms = parseInt(filters.bedrooms);
      filtered = filtered.filter((property) => property.bedrooms >= minBedrooms);
    }

    // Filter by bathrooms
    if (filters.bathrooms) {
      const minBathrooms = parseInt(filters.bathrooms);
      filtered = filtered.filter((property) => property.bathrooms >= minBathrooms);
    }

    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter((property) => property.type === filters.propertyType);
    }

    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter((property) =>
        filters.amenities.every((amenity: string) => property.amenities.includes(amenity))
      );
    }

    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setFilteredProperties([]);
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Load favorites from localStorage on mount
  React.useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const value = {
    properties,
    filteredProperties,
    favorites,
    setFilters,
    clearFilters,
    toggleFavorite,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};