import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-50 to-white border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-amber-700 mb-4">LIFENEXA</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Your trusted destination for quality products. Experience excellence in every purchase.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                  Shop All
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-600">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>support@lifenexa.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-600">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>123 Business Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Subscribe to Our Newsletter</h4>
            <p className="text-gray-600 mb-4">Get the latest updates on new products and upcoming sales</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-sm font-medium transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Lifenexa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
