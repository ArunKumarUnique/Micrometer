import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Phone, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery, categories, isAdmin, logout } = useApp();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone size={14} className="mr-1" />
                <span>+91 9949288805</span>
              </div>
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>4-116, Ghanpur Road, Palakurthy - 506252</span>
              </div>
            </div>
            {isAdmin && (
              <div className="flex items-center space-x-2">
                <Link to="/admin/dashboard" className="hover:text-blue-200">Admin Panel</Link>
                <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/re-pic-Picsart-AiImageEnhancer.jfif" 
              alt="Raviteja Enterprises Logo" 
              className="h-10 w-10 rounded-lg object-cover mr-3 shadow-sm"
            />
            <div className="text-2xl font-bold text-blue-900">
              Raviteja Enterprises
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-900 font-medium">
              Home
            </Link>
            {categories.slice(0, 5).map(category => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 mt-4">
              <form onSubmit={handleSearch} className="md:hidden">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
              
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-900 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map(category => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="text-gray-700 hover:text-blue-900 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;