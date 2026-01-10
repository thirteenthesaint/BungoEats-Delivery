'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setRestaurantId] = useState<string>('');

  const DELIVERY_FEE = 100;
  const TAX_RATE = 0.16;

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedRestaurantId = localStorage.getItem('restaurantId');
      
      if (!savedCart || !savedRestaurantId) {
        setLoading(false);
        return;
      }

      setRestaurantId(savedRestaurantId);
      const cart = JSON.parse(savedCart);
      const itemIds = Object.keys(cart);

      if (itemIds.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch menu items
      const response = await fetch(`/api/restaurants/${savedRestaurantId}/menu`);
      const menuItems = await response.json();

      const items = menuItems
        .filter((item: MenuItem) => cart[item._id])
        .map((item: MenuItem) => ({
          ...item,
          quantity: cart[item._id]
        }));

      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);

    const cart = updatedItems.reduce((acc, item) => {
      acc[item._id] = item.quantity;
      return acc;
    }, {} as {[key: string]: number});
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedItems);

    const cart = updatedItems.reduce((acc, item) => {
      acc[item._id] = item.quantity;
      return acc;
    }, {} as {[key: string]: number});
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('restaurantId');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_FEE;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">Add some delicious items to get started!</p>
            <Link
              href="/"
              className="mt-6 inline-block px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 font-medium"
            >
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="bg-white rounded-lg shadow-sm p-4 flex items-start space-x-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || '/placeholder-food.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <p className="text-red-600 font-bold">KSh {item.price}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>KSh {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>KSh {DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (16%)</span>
                    <span>KSh {tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>KSh {total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition-colors text-center font-bold"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
