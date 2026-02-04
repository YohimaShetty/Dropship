import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CreditCard, Lock } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PaymentModal = ({ isOpen, onClose, orderData }) => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (status) => {
    setProcessing(true);
    
    try {
      await axios.post(`${API}/orders/payment/verify`, {
        order_id: orderData.order_id,
        payment_id: orderData.payment_id,
        payment_status: status
      });

      onClose();
      
      if (status === 'success') {
        toast({
          title: "Payment Successful!",
          description: "Your order has been placed successfully.",
        });
        navigate(`/order-success/${orderData.order_id}`);
      } else {
        toast({
          title: "Payment Failed",
          description: "Your payment could not be processed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
    
    setProcessing(false);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const isTestSuccess = cardNumber.replace(/\s/g, '') === '4111111111111111';
  const isTestFail = cardNumber.replace(/\s/g, '') === '4000000000000002';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-green-600" />
            <span>Secure Payment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Order ID:</span>
              <span className="text-sm font-mono font-medium">{orderData.order_id.slice(0, 8)}...</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount to Pay:</span>
              <span className="text-2xl font-bold text-amber-700">₹{orderData.amount.toFixed(2)}</span>
            </div>
          </div>

          {/* Mock Razorpay Interface */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-gray-500 mb-4">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm font-medium">Mock Payment Gateway</span>
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="4111 1111 1111 1111"
                maxLength="19"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

            {/* Test Card Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs">
              <p className="font-semibold text-blue-900 mb-1">Test Cards:</p>
              <p className="text-blue-700">• Success: 4111 1111 1111 1111</p>
              <p className="text-blue-700">• Failure: 4000 0000 0000 0002</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                onClick={() => handlePayment('success')}
                disabled={processing || !isTestSuccess}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {processing ? 'Processing...' : 'Simulate Success'}
              </Button>
              <Button
                onClick={() => handlePayment('failed')}
                disabled={processing || !isTestFail}
                variant="destructive"
              >
                {processing ? 'Processing...' : 'Simulate Failure'}
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-2">
              This is a mock payment interface. Use test card numbers above.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
