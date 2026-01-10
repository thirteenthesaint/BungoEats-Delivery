'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface OrderItem {
  menuItem: {
    _id: string;
    name: string;
    image: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  restaurant: {
    _id: string;
    name: string;
    image: string;
  };
  items: OrderItem[];
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  paymentMethod: string;
  status: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchOrder();
      const interval = setInterval(fetchOrder, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`);
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: 'Order Pending', color: 'text-yellow-600', bgColor: 'bg-yellow-100', step: 1 };
      case 'confirmed':
        return { text: 'Order Confirmed', color: 'text-blue-600', bgColor: 'bg-blue-100', step: 2 };
      case 'preparing':
        return { text: 'Preparing', color: 'text-purple-600', bgColor: 'bg-purple-100', step: 3 };
      case 'ready':
        return { text: 'Ready for Pickup', color: 'text-orange-600', bgColor: 'bg-orange-100', step: 4 };
      case 'out_for_delivery':
        return { text: 'Out for Delivery', color: 'text-indigo-600', bgColor: 'bg-indigo-100', step: 5 };
      case 'delivered':
        return { text: 'Delivered', color: 'text-green-600', bgColor: 'bg-green-100', step: 6 };
      case 'cancelled':
        return { text: 'Cancelled', color: 'text-red-600', bgColor: 'bg-red-100', step: 0 };
      default:
        return { text: status, color: 'text-gray-600', bgColor: 'bg-gray-100', step: 0 };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
              <p className="text-xs text-gray-500 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
              {statusInfo.text}
            </span>
          </div>

          {/* Progress Tracker */}
          {order.status !== 'cancelled' && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                {['Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered'].map((step, index) => {
                  const stepNumber = index + 2;
                  const isCompleted = statusInfo.step >= stepNumber;
                  const isCurrent = statusInfo.step === stepNumber;
                  
                  return (
                    <div key={step} className="flex-1 flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-red-600 text-white' : isCurrent ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-sm font-medium">{stepNumber - 1}</span>
                        )}
                      </div>
                      <p className={`text-xs mt-2 text-center ${
                        isCompleted || isCurrent ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Restaurant Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Restaurant</h2>
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={order.restaurant.image || '/placeholder-restaurant.jpg'}
                alt={order.restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{order.restaurant.name}</h3>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.menuItem.image || '/placeholder-food.jpg'}
                    alt={item.menuItem.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.menuItem.name}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">KSh {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Customer Name</p>
              <p className="font-medium text-gray-900">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{order.phone}</p>
            </div>
            {order.email && (
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{order.email}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Delivery Address</p>
              <p className="font-medium text-gray-900">{order.deliveryAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-medium text-gray-900 capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            </div>
            {order.notes && (
              <div>
                <p className="text-sm text-gray-600">Order Notes</p>
                <p className="font-medium text-gray-900">{order.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>KSh {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>KSh {order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>KSh {order.tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>KSh {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
