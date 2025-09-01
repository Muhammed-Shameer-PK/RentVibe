import  { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [propertyType, setPropertyType] = useState('rent');


  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-b border-gray-200"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-xl font-bold"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                RV
              </div>
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                RentVibe
              </span>
            </button>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-1 ml-12">
              <div className="bg-gray-50/80 backdrop-blur-sm p-1.5 rounded-xl flex items-center space-x-1 border border-gray-200/50">
                <button
                  onClick={() => navigate('/')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive('/') 
                      ? 'text-emerald-600 bg-white shadow-sm ring-1 ring-gray-200/50'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => navigate('/search')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive('/search')
                      ? 'text-emerald-600 bg-white shadow-sm ring-1 ring-gray-200/50'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
                  }`}
                >
                  Search
                </button>
              </div>

              <div className="w-px h-6 bg-gray-200/75 mx-2" />

              <div className="bg-gray-50/80 backdrop-blur-sm p-1.5 rounded-xl flex items-center space-x-1 border border-gray-200/50">
                <button
                  onClick={() => setPropertyType('rent')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    propertyType === 'rent' 
                      ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-gray-200/50' 
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
                  }`}
                >
                  Rent
                </button>
                <button
                  onClick={() => setPropertyType('buy')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    propertyType === 'buy' 
                      ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-gray-200/50' 
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
                  }`}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="bg-gray-50/80 backdrop-blur-sm p-1.5 rounded-xl flex items-center space-x-1 border border-gray-200/50">
                  <button className="p-1.5 text-gray-600 hover:text-emerald-600 rounded-lg hover:bg-white/50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:text-emerald-600 rounded-lg hover:bg-white/50 transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`hidden md:inline-flex px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive('/dashboard')
                      ? 'text-emerald-600 bg-emerald-50 ring-1 ring-emerald-500/20'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className="hidden md:inline-flex px-4 py-2 text-sm font-medium rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="hidden md:inline-flex text-emerald-600 hover:text-emerald-700 px-3 py-2 text-sm font-medium"
                >
                  Post Property
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="hidden md:inline-flex bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Login / Sign Up
                </button>
              </>
            )}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-emerald-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              <button
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm font-medium ${
                  isActive('/') 
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate('/search');
                  setIsMenuOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm font-medium ${
                  isActive('/search')
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                Search
              </button>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm font-medium ${
                      isActive('/dashboard')
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-gray-50"
                  >
                    Post Property
                  </button>
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Login / Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;