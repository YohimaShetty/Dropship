import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CartDrawer = ({ isOpen, onClose, onCartUpdate }) => {
  const [cart, setCart] = useState({
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API}/cart`);
      setCart(response.data);
      if (onCartUpdate) {
        onCartUpdate(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setLoading(true);
    try {
      const response = await axios.put(`${API}/cart/update/${productId}`, {
        quantity: newQuantity
      });
      setCart(response.data);
      if (onCartUpdate) {
        onCartUpdate(response.data.items.length);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
    setLoading(false);
  };

  const removeItem = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(`${API}/cart/item/${productId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
    setLoading(false);
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <span>Shopping Cart ({cart.items.length})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add some products to get started!</p>
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.product_id} className="flex space-x-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-amber-700 font-bold mt-1">₹{item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        disabled={loading || item.quantity <= 1}
                        className="p-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        disabled={loading}
                        className="p-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product_id)}
                        disabled={loading}
                        className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary */}
          {cart.items.length > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">₹{cart.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total</span>
                <span className="text-amber-700">₹{cart.total.toFixed(2)}</span>
              </div>
              
              <Button
                onClick={handleCheckout}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-6 text-lg font-semibold"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
