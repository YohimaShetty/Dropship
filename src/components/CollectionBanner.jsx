import React from 'react';
import { Button } from './ui/button';

const CollectionBanner = () => {
  return (
    <section className="relative h-[400px] bg-gradient-to-br from-amber-100 to-white overflow-hidden my-12">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070')] bg-cover bg-center opacity-30"></div>
      
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-center h-full">
          <Button
            className="bg-transparent border-2 border-amber-700 text-amber-800 hover:bg-amber-700 hover:text-white px-12 py-6 text-xl font-bold uppercase tracking-widest rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            SHOP THE COLLECTION
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;
