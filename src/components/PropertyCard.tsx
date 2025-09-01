import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

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

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, layout = 'grid' }) => {
  const navigate = useNavigate();
  const { toggleFavorite, favorites } = useProperty();
  const isFavorited = favorites.includes(property.id);

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  if (layout === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white border border-gray-200 rounded-xl flex group relative overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
      >
        <div className="w-1/3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent z-10"></div>
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 z-20 ${
              isFavorited
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white text-gray-400 hover:text-red-500 shadow-sm'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform duration-200 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-medium rounded-md z-20">
            {property.type}
          </div>
        </div>
        
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
              <div className="text-lg font-bold text-emerald-600">${property.price.toLocaleString()}</div>
            </div>
            
            <div className="flex items-center text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{property.location}</span>
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{property.description}</p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1.5 text-gray-400" />
                <span>{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1.5 text-gray-400" />
                <span>{property.bathrooms} bath</span>
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1.5 text-gray-400" />
                <span>{property.area} sq ft</span>
              </div>
            </div>
            <span className="text-gray-500 text-xs">per month</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden group"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 z-20 ${
            isFavorited
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white text-gray-400 hover:text-red-500 shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform duration-200 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
        
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-medium rounded-md z-20">
          {property.type}
        </div>
        
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-sm font-semibold rounded-lg">
          ${property.price.toLocaleString()}/mo
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
        
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1.5 text-gray-400" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1.5 text-gray-400" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1.5 text-gray-400" />
            <span>{property.area} sq ft</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2">{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyCard;