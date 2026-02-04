import React from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section className="relative h-[500px] bg-gradient-to-r from-amber-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
      
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-amber-800 tracking-tight">
              Your Next
              <span className="block text-amber-600">Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-light">
              Discover Quality Products
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of style and functionality with our curated collection
            </p>
            <Button 
              className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-6 text-lg font-medium rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              SHOP NOW
            </Button>
          </div>
        </div>
      </div>

      {/* Rewards Button */}
      <button className="absolute left-4 sm:left-8 bottom-8 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg transition-all duration-300 transform hover:scale-105">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <span className="font-medium">Rewards</span>
      </button>
    </section>
  );
};

export default HeroSection;
