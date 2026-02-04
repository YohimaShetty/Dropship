import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = ({ cartCount = 0, wishlistCount = 0, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button className="text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200 flex items-center">
              SHOP ALL
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200">
              LIMITED DROPS
            </button>
            <button className="text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200">
              NEW ARRIVALS
            </button>
            <button className="text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200">
              TRENDING NOW
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Center Logo */}
          <div className="flex-1 lg:flex-initial flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
              <div className="text-2xl font-bold text-amber-700">LIFENEXA</div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            <button className="hidden sm:flex items-center text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200">
              <User className="h-5 w-5 mr-1" />
              <span>LOG IN</span>
            </button>
            <button className="hidden sm:flex items-center text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200">
              <Heart className="h-5 w-5 mr-1" />
              <span>WISHLIST ({wishlistCount})</span>
            </button>
            <button 
              onClick={onCartClick}
              className="flex items-center text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">CART ({cartCount})</span>
              <span className="sm:hidden">({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <button className="text-left text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200">
                SHOP ALL
              </button>
              <button className="text-left text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200">
                LIMITED DROPS
              </button>
              <button className="text-left text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200">
                NEW ARRIVALS
              </button>
              <button className="text-left text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200">
                TRENDING NOW
              </button>
              <button className="text-left text-sm font-medium text-gray-900 hover:text-amber-700 transition-colors duration-200 sm:hidden">
                LOG IN
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
