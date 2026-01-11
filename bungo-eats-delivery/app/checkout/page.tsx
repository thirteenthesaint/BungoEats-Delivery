'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { MapPinIcon, CreditCardIcon, BanknotesIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Delivery details
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Bungoma',
    notes: ''
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'mpesa' | 'card'>('mpesa');

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/');
      return;
    }
    setIsLoggedIn(true);

    // Pre-fill user details if available
    const userData = JSON.parse(user);
    setDeliveryDetails(prev => ({
      ...prev,
      name: userData.name || '',
      phone: userData.phone || ''
    }));
  }, [router]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && isLoggedIn) {
      router.push('/cart');
    }
  }, [items, isLoggedIn, router]);

  const deliveryFee = 100;
  const serviceFee = 50;
  const grandTotal = total + deliveryFee + serviceFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    // Validate form
    if (!deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.address) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate order placement
    setTimeout(() => {
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        deliveryDetails,
        paymentMethod,
        subtotal: total,
        deliveryFee,
        serviceFee,
        total: grandTotal,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      clearCart();

      // Redirect to confirmation page
      router.push(`/order-confirmation?orderId=${order.id}`);
    }, 2000);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={deliveryDetails.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={deliveryDetails.phone}
                    onChange={handleInputChange}
                    placeholder="0712345678"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={deliveryDetails.address}
                    onChange={handleInputChange}
                    placeholder="Street address, building, apartment"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Input
                    type="text"
                    name="city"
                    value={deliveryDetails.city}
                    onChange={handleInputChange}
                    placeholder="Bungoma"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={deliveryDetails.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for delivery..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <CreditCardIcon className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
              </div>

              <div className="space-y-3">
                {/* M-Pesa */}
                <button
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'mpesa'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'mpesa' ? 'border-orange-500' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'mpesa' && (
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      )}
                    </div>
                    <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">M-Pesa</p>
                      <p className="text-sm text-gray-500">Pay with M-Pesa mobile money</p>
                    </div>
                  </div>
                </button>

                {/* Cash on Delivery */}
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'cash' ? 'border-orange-500' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'cash' && (
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      )}
                    </div>
                    <BanknotesIcon className="w-6 h-6 text-gray-600" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </div>
                  </div>
                </button>

                {/* Card Payment */}
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-orange-500' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'card' && (
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      )}
                    </div>
                    <CreditCardIcon className="w-6 h-6 text-blue-600" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                      <p className="text-sm text-gray-500">Pay with Visa or Mastercard</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.restaurantName}</p>
                      <p className="text-sm text-gray-700">
                        {item.quantity} × KES {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>KES {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>KES {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>KES {serviceFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>KES {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="w-full mt-6"
              >
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
