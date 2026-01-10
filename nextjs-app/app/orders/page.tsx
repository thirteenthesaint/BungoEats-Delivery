'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  orderNumber: string;
  restaurant: {
    name: string;
  };
  status: string;
  total: number;
  createdAt: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(true);

  useEffect(() => {
    const savedPhone = localStorage.getItem('customerPhone');
    if (savedPhone) {
      setPhone(savedPhone);
      setShowPhoneInput(false);
      fetchOrders(savedPhone);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (phoneNumber: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders?phone=${encodeURIComponent(phoneNumber)}`);
      const data = await response.json();
      setOrders(data);
      localStorage.setItem('customerPhone', phoneNumber);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setShowPhoneInput(false);
      fetchOrders(phone);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-orange-100 text-orange-800';
      case 'out_for_delivery': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
            </div>
            {!showPhoneInput && (
              <button
                onClick={() => {
                  setShowPhoneInput(true);
                  localStorage.removeItem('customerPhone');
                }}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Change Phone
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showPhoneInput ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Track Your Orders</h2>
              <p className="text-gray-600 mb-4">Enter your phone number to view your order history</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 700 000 000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition-colors font-bold"
                >
                  View Orders
                </button>
              </form>
            </div>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">No orders found</h2>
            <p className="mt-2 text-gray-600">You haven&apos;t placed any orders yet</p>
            <Link
              href="/"
              className="mt-6 inline-block px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 font-medium"
            >
              Start Ordering
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <Link
                key={order._id}
                href={`/orders/${order._id}`}
                className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                      {order.restaurant?.name || 'Restaurant'}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="text-lg font-bold text-gray-900">KSh {order.total.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
