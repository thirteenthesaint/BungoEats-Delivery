'use client';

import { useCart } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { TrashIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get user from localStorage on client side only
    const storedUser = localStorage.getItem('bungoEatsUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some delicious food to get started!</p>
          <Button onClick={() => router.push('/')}>Browse Restaurants</Button>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      alert('Please log in to continue with checkout');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              {/* Item Image */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.restaurantName}</p>
                <p className="text-lg font-bold text-orange-500 mt-1">KES {item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <MinusIcon className="w-4 h-4 text-gray-700" />
                </button>
                <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
                >
                  <PlusIcon className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right min-w-[80px]">
                <p className="font-bold text-gray-900">KES {item.price * item.quantity}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>KES {total}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>KES 100</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Service Fee</span>
              <span>KES 50</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-orange-500">KES {total + 150}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full"
            size="lg"
          >
            Proceed to Checkout
          </Button>

          {!user && (
            <p className="text-sm text-gray-500 text-center mt-3">
              Please log in to complete your order
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
