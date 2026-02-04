import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { CheckCircle, Package, Home } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${API}/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Order not found</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been confirmed.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-xl font-mono font-bold text-amber-700">{order.order_id}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="h-5 w-5 text-amber-700" />
            <h2 className="text-xl font-semibold">Order Details</h2>
          </div>

          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex space-x-4 border-b pb-4 last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                  <p className="text-amber-700 font-bold mt-1">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">₹{order.shipping_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total Paid</span>
              <span className="text-amber-700">₹{order.total_amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="text-gray-700">
            <p className="font-medium">{order.customer_info.name}</p>
            <p>{order.customer_info.address}</p>
            <p>{order.customer_info.city}, {order.customer_info.state} - {order.customer_info.pincode}</p>
            <p className="mt-2">Phone: {order.customer_info.phone}</p>
            <p>Email: {order.customer_info.email}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate('/')}
            className="flex-1 bg-amber-700 hover:bg-amber-800 text-white py-6 text-lg font-semibold"
          >
            <Home className="h-5 w-5 mr-2" />
            Continue Shopping
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>What's next?</strong> You will receive an email confirmation shortly. We'll notify you when your order ships.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
