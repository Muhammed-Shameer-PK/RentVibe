import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [isCitiesVisible, setIsCitiesVisible] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('query');
    const location = formData.get('location');
    navigate(`/search?q=${query}&location=${location}`);
  };

  const popularCities = [
    { 
      name: 'Mumbai', 
      image: 'https://images.pexels.com/photos/4134644/pexels-photo-4134644.jpeg',
      properties: '45,000+',
      avgPrice: '₹2.5 Cr'
    },
    { 
      name: 'Delhi', 
      image: 'https://images.pexels.com/photos/6813041/pexels-photo-6813041.jpeg',
      properties: '38,000+',
      avgPrice: '₹1.8 Cr'
    },
    { 
      name: 'Bangalore', 
      image: 'https://images.pexels.com/photos/6813038/pexels-photo-6813038.jpeg',
      properties: '42,000+',
      avgPrice: '₹1.2 Cr'
    },
    { 
      name: 'Hyderabad', 
      image: 'https://images.pexels.com/photos/6813037/pexels-photo-6813037.jpeg',
      properties: '35,000+',
      avgPrice: '₹95 L'
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative h-full">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Background"
            className="w-full h-full object-cover opacity-15 scale-110 transform"
          />
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70" />
          
          {/* Decorative elements */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2% 5%, rgba(16, 185, 129, 0.05) 0%, transparent 25%)',
              backgroundSize: '120% 120%',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 98% 95%, rgba(16, 185, 129, 0.05) 0%, transparent 25%)',
              backgroundSize: '120% 120%',
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex backdrop-blur-[2px] z-10">
          {/* Left Sidebar - Cities */}
          <div className={`relative transition-all duration-300 ${isCitiesVisible ? 'w-80' : 'w-12'}`}>
            {/* Toggle Button */}
            <button
              onClick={() => setIsCitiesVisible(!isCitiesVisible)}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors border border-gray-200"
            >
              {isCitiesVisible ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            {/* Cities Panel */}
            <div
              className={`h-full bg-gray-900/40 backdrop-blur-md border-r border-white/10 flex-shrink-0 overflow-y-auto transition-all duration-300 ${
                isCitiesVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="sticky top-0 px-4 py-3 border-b border-white/10 bg-gray-900/40 backdrop-blur-md z-10">
                <h2 className="text-lg font-semibold text-white">Popular Cities</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4">
                  {popularCities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => navigate(`/search?city=${city.name}`)}
                      className="group relative w-full aspect-[1.2] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img
                          src={city.image}
                          alt={city.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {city.name}
                          </h3>
                          <span className="px-2 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-sm text-white text-sm">
                            {city.properties}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-200">Average Price</p>
                          <p className="text-lg font-medium text-white">{city.avgPrice}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area with Search */}
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="w-full max-w-4xl">
              {/* Header */}
              <div className="text-center mb-10 space-y-6">
                <div className="inline-block">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-300 backdrop-blur-sm ring-1 ring-emerald-500/20">
                    India's Most Trusted Property Portal
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold text-white">
                  Find Your Perfect Home <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">
                    in India
                  </span>
                </h1>
                <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
                  Search from over 10 Lakh+ verified properties across top cities with detailed insights and neighborhood analytics
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative z-20">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl blur-xl opacity-20"></div>
                <form
                  onSubmit={handleSearch}
                  className="relative bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-emerald-600" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        placeholder="Enter city, locality or project"
                        className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-lg transition-all"
                      />
                      <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-emerald-600" />
                      </div>
                      <input
                        type="text"
                        name="query"
                        placeholder="Property type or budget"
                        className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-lg transition-all"
                      />
                      <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <button
                      type="submit"
                      className="sm:w-auto w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white px-10 py-4 rounded-xl text-lg font-medium transition-all hover:shadow-lg hover:shadow-emerald-500/20 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10L+</div>
                  <div className="text-sm text-gray-400">Properties Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-400">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">2M+</div>
                  <div className="text-sm text-gray-400">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default HomePage;
