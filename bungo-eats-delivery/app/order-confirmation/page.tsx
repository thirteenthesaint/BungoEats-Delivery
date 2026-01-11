'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { CheckCircleIcon, MapPinIcon, ClockIcon, CreditCardIcon } from '@heroicons/react/24/solid';

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [orderStatus, setOrderStatus] = useState('pending');

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: any) => o.id === orderId);

    if (!foundOrder) {
      router.push('/');
      return;
    }

    setOrder(foundOrder);

    // Simulate order status updates
    const statusTimeline = [
      { status: 'pending', delay: 0 },
      { status: 'confirmed', delay: 3000 },
      { status: 'preparing', delay: 8000 },
      { status: 'ready', delay: 15000 },
      { status: 'out_for_delivery', delay: 20000 }
    ];

    statusTimeline.forEach(({ status, delay }) => {
      setTimeout(() => {
        setOrderStatus(status);
        // Update order in localStorage
        const updatedOrders = orders.map((o: any) =>
          o.id === orderId ? { ...o, status } : o
        );
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
      }, delay);
    });
  }, [orderId, router]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    const statusMap: any = {
      pending: {
        label: 'Order Received',
        description: 'We have received your order',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      },
      confirmed: {
        label: 'Order Confirmed',
        description: 'Restaurant has confirmed your order',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      },
      preparing: {
        label: 'Preparing Your Food',
        description: 'Your delicious meal is being prepared',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100'
      },
      ready: {
        label: 'Ready for Pickup',
        description: 'Your order is ready and waiting for delivery',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100'
      },
      out_for_delivery: {
        label: 'Out for Delivery',
        description: 'Your order is on its way to you',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      },
      delivered: {
        label: 'Delivered',
        description: 'Your order has been delivered. Enjoy!',
        color: 'text-green-700',
        bgColor: 'bg-green-200'
      }
    };

    return statusMap[status] || statusMap.pending;
  };

  const statusInfo = getStatusInfo(orderStatus);
  const estimatedDeliveryTime = new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">Thank you for your order</p>
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-lg font-semibold text-gray-900">{order.id}</p>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Status</h2>
          
          <div className={`${statusInfo.bgColor} rounded-xl p-4 mb-4`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <ClockIcon className={`w-6 h-6 ${statusInfo.color}`} />
              </div>
              <div>
                <p className={`font-semibold ${statusInfo.color}`}>{statusInfo.label}</p>
                <p className="text-sm text-gray-600">{statusInfo.description}</p>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="space-y-3">
            {['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].map((status, index) => {
              const info = getStatusInfo(status);
              const isCompleted = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].indexOf(orderStatus) >= index;
              const isCurrent = orderStatus === status;

              return (
                <div key={status} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-orange-500' : 'bg-gray-200'
                  }`}>
                    {isCompleted && (
                      <CheckCircleIcon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isCurrent ? 'text-orange-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {info.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-xl">
            <div className="flex items-center gap-2 text-orange-700">
              <ClockIcon className="w-5 h-5" />
              <p className="font-medium">Estimated Delivery: {estimatedDeliveryTime}</p>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Details</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium text-gray-900">{order.deliveryDetails.name}</p>
                <p className="text-gray-600">{order.deliveryDetails.phone}</p>
                <p className="text-gray-600">{order.deliveryDetails.address}</p>
                <p className="text-gray-600">{order.deliveryDetails.city}</p>
                {order.deliveryDetails.notes && (
                  <p className="text-sm text-gray-500 mt-2">Note: {order.deliveryDetails.notes}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
          
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.restaurantName}</p>
                  <p className="text-gray-700 mt-1">
                    {item.quantity} × KES {item.price} = KES {(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>KES {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>KES {order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Service Fee</span>
              <span>KES {order.serviceFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>KES {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
          
          <div className="flex items-center gap-3">
            <CreditCardIcon className="w-6 h-6 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900 capitalize">
                {order.paymentMethod === 'mpesa' ? 'M-Pesa' : order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit/Debit Card'}
              </p>
              <p className="text-sm text-gray-500">
                {order.paymentMethod === 'cash' ? 'Pay when you receive your order' : 'Payment will be processed'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
          <Link href="/orders" className="flex-1">
            <Button className="w-full">
              View All Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
