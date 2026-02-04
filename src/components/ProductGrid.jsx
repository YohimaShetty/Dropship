import React from 'react';
import ProductCard from './ProductCard';
import { Button } from './ui/button';

const ProductGrid = ({ products, title, showViewAll = true }) => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
            {title}
          </h2>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {showViewAll && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              className="bg-gray-900 hover:bg-amber-700 text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 border-0"
            >
              VIEW ALL
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
