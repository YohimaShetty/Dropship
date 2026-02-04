import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import CollectionBanner from "./components/CollectionBanner";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import { Toaster } from "./components/ui/toaster";
import { products, newDrops } from "./mockData";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function HomePage({ onCartUpdate }) {
  return (
    <>
      <HeroSection />
      <ProductGrid products={products} showViewAll={true} onCartUpdate={onCartUpdate} />
      <CollectionBanner />
      <ProductGrid products={newDrops} title="NEW DROPS" showViewAll={false} onCartUpdate={onCartUpdate} />
    </>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get(`${API}/cart`);
      setCartCount(response.data.count || 0);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const handleCartUpdate = () => {
    fetchCartCount();
  };

  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-white">
        <Header 
          cartCount={cartCount} 
          wishlistCount={wishlistCount} 
          onCartClick={() => setIsCartOpen(true)}
        />
        <Routes>
          <Route path="/" element={<HomePage onCartUpdate={handleCartUpdate} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
        </Routes>
        <Footer />
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          onCartUpdate={setCartCount}
        />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
