import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

interface SearchFiltersProps {
  onClose: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onClose }) => {
  const { setFilters, clearFilters } = useProperty();
  const [localFilters, setLocalFilters] = useState({
    priceRange: [0, 150000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    amenities: [] as string[],
  });

  const propertyTypes = ['Apartment', 'Villa', 'House', 'Penthouse', 'Builder Floor'];
  const amenityOptions = ['Power Backup', 'Parking', 'Gym', 'Pool', 'Security', 'Club House', 'Children Park', 'Servant Room', 'Garden'];

  const handlePriceChange = (index: number, value: string) => {
    const newPriceRange = [...localFilters.priceRange];
    newPriceRange[index] = parseInt(value) || 0;
    setLocalFilters({ ...localFilters, priceRange: newPriceRange });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = localFilters.amenities.includes(amenity)
      ? localFilters.amenities.filter(a => a !== amenity)
      : [...localFilters.amenities, amenity];
    setLocalFilters({ ...localFilters, amenities: newAmenities });
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      priceRange: [0, 150000],
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      amenities: [],
    };
    setLocalFilters(clearedFilters);
    clearFilters();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-gray-900 font-medium"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Min Price</label>
              <input
                type="number"
                value={localFilters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                placeholder="$0"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Max Price</label>
              <input
                type="number"
                value={localFilters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                placeholder="$10,000+"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">Bedrooms</label>
          <select
            value={localFilters.bedrooms}
            onChange={(e) => setLocalFilters({ ...localFilters, bedrooms: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white"
          >
            <option value="">Any</option>
            <option value="1">1+ Bedroom</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">Bathrooms</label>
          <select
            value={localFilters.bathrooms}
            onChange={(e) => setLocalFilters({ ...localFilters, bathrooms: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white"
          >
            <option value="">Any</option>
            <option value="1">1+ Bathroom</option>
            <option value="2">2+ Bathrooms</option>
            <option value="3">3+ Bathrooms</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">Property Type</label>
          <select
            value={localFilters.propertyType}
            onChange={(e) => setLocalFilters({ ...localFilters, propertyType: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white"
          >
            <option value="">Any Type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {amenityOptions.map((amenity) => (
              <label key={amenity} className="group flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={localFilters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4 border border-gray-300 rounded text-emerald-500 focus:ring-emerald-500/50"
                  />
                </div>
                <span className="ml-2 text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-auto p-4 border-t border-gray-100">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-medium text-sm transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;