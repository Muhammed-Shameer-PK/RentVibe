import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, Share2, Calendar, MapPin, Bed, Bath, Square, 
  Wifi, Car, Dumbbell, Waves, PawPrint, Shield, 
  ChevronLeft, ChevronRight, ArrowLeft 
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import ContactModal from '../components/ContactModal';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { properties, toggleFavorite, favorites } = useProperty();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link to="/search" className="text-blue-600 hover:text-blue-700">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const isFavorited = favorites.includes(property.id);
  const relatedProperties = properties.filter(p => p.id !== property.id).slice(0, 3);

  const amenityIcons = {
    'WiFi': Wifi,
    'Parking': Car,
    'Gym': Dumbbell,
    'Pool': Waves,
    'Pet Friendly': PawPrint,
    'Security': Shield,
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/search"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Search</span>
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-96 md:h-[600px] bg-gray-900 overflow-hidden">
        <img
          src={property.images[currentImageIndex]}
          alt={`${property.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation buttons */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-3">
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button className="w-12 h-12 bg-white text-gray-700 hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-lg">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    ${property.price.toLocaleString()}
                  </div>
                  <div className="text-gray-600">per month</div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex flex-wrap gap-6 text-gray-700">
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{property.area} sq ft</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {property.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => {
                  const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Shield;
                  return (
                    <div key={amenity} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
              <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Interactive Map Coming Soon
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Contact Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg mb-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${property.price.toLocaleString()}/mo
                  </div>
                  <div className="text-gray-600">Available Now</div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] shadow-lg"
                  >
                    Schedule a Visit
                  </button>
                  
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02]"
                  >
                    Contact Agent
                  </button>

                  <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all">
                    <Calendar className="w-5 h-5" />
                    <span>Virtual Tour</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Response Rate:</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                    <span>Response Time:</span>
                    <span className="font-medium">Within 1 hour</span>
                  </div>
                </div>
              </div>

              {/* Agent Info */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Listed by</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">RV</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">RentVibe Agent</div>
                    <div className="text-gray-600 text-sm">Premium Partner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Properties You May Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((relatedProperty) => (
                <PropertyCard key={relatedProperty.id} property={relatedProperty} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        property={property}
      />
    </div>
  );
};

export default PropertyDetailPage;