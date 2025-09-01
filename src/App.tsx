import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </div>
        </Router>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;