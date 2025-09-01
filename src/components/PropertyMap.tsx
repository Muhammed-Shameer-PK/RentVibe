import React from 'react';
import { MapPin } from 'lucide-react';

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

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-96">
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h3>
          <p className="text-gray-600 max-w-md">
            Map integration coming soon! View properties with their exact locations and explore neighborhoods.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Showing {properties.length} properties in your search area
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;