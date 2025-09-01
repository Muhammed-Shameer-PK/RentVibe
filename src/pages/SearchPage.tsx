import  { useState, useEffect } from 'react';
import { Filter, Grid, List, Map } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import PropertyMap from '../components/PropertyMap';
import { useProperty } from '../context/PropertyContext';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const { properties, filteredProperties, setFilters } = useProperty();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const locationParam = params.get('location');
    
    if (query || locationParam) {
      setFilters({
        searchQuery: query || locationParam || '',
        location: locationParam || '',
      });
    }
  }, [location.search, setFilters]);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const displayProperties = filteredProperties.length > 0 ? filteredProperties : properties;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Available Properties
            </h1>
            <p className="text-gray-600 mt-1 flex items-center">
              <span>{displayProperties.length} properties found</span>
              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-44 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-gray-700 appearance-none transition-all duration-200 shadow-sm hover:border-gray-300 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-gray-700">
                  {option.label}
                </option>
              ))}
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="lg:hidden px-3 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm hover:border-gray-300"
            >
              <Filter className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
              <span className="text-sm text-gray-700">Filters</span>
            </button>

            {/* View Mode */}
            <div className="hidden md:flex bg-white border border-gray-200 rounded-lg p-1 gap-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'map' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <Map className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 relative flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div 
            className={`
              ${isFiltersOpen 
                ? 'fixed inset-0 z-50 p-4 bg-white/95 backdrop-blur-sm lg:relative lg:inset-auto lg:z-auto lg:p-0 lg:bg-transparent lg:backdrop-blur-none' 
                : 'hidden lg:block'
              }
              lg:w-72 xl:w-80 flex-shrink-0
            `}
          >
            <div className="lg:sticky lg:top-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-auto max-h-[calc(100vh-8rem)]">
              <SearchFilters onClose={() => setIsFiltersOpen(false)} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {viewMode === 'map' ? (
              <div className="h-[calc(100vh-12rem)] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                <PropertyMap properties={displayProperties} />
              </div>
            ) : (
              <div className={`grid gap-4 sm:gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {displayProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    layout={viewMode}
                  />
                ))}
              </div>
            )}

            {displayProperties.length === 0 && (
              <div className="text-center py-12 px-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <p className="text-lg text-gray-600 mb-3">No properties found matching your criteria</p>
                <button
                  onClick={() => setFilters({})}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;