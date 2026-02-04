import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductCard = ({ product, onCartUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setAdding(true);
    
    try {
      await axios.post(`${API}/cart/add`, {
        product_id: product.id.toString(),
        name: product.name,
        price: product.salePrice || product.price,
        image: product.image,
        quantity: 1
      });
      
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
      
      if (onCartUpdate) {
        onCartUpdate();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    }
    
    setAdding(false);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Sale Badge */}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.badge}
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-6 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleWishlist}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isWishlisted
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-amber-600 hover:text-white'
              }`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg disabled:opacity-50"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{adding ? 'Adding...' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
          {product.name}
        </h3>
        <div className="flex items-center space-x-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-bold text-amber-700">₹{product.salePrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
