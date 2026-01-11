'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ShoppingBagIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/');
      return;
    }
    setIsLoggedIn(true);

    // Get orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // Sort by most recent first
    const sortedOrders = savedOrders.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setOrders(sortedOrders);
  }, [router]);

  const getStatusBadge = (status: string) => {
    const statusMap: any = {
      pending: { label: 'Pending', variant: 'default' },
      confirmed: { label: 'Confirmed', variant: 'default' },
      preparing: { label: 'Preparing', variant: 'default' },
      ready: { label: 'Ready', variant: 'default' },
      out_for_delivery: { label: 'Out for Delivery', variant: 'default' },
      delivered: { label: 'Delivered', variant: 'default' },
      cancelled: { label: 'Cancelled', variant: 'secondary' }
    };

    const info = statusMap[status] || statusMap.pending;
    return <Badge variant={info.variant}>{info.label}</Badge>;
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBagIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start exploring our restaurants!
            </p>
            <Link href="/">
              <Button>Browse Restaurants</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ClockIcon className="w-4 h-4" />
                      <span>{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-gray-900">KES {order.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {order.items.slice(0, 3).map((item: any, index: number) => (
                      <div key={index} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-gray-600">
                          +{order.items.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Delivery Details */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Deliver to:</span> {order.deliveryDetails.address}, {order.deliveryDetails.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Payment:</span> {order.paymentMethod === 'mpesa' ? 'M-Pesa' : order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link href={`/order-confirmation?orderId=${order.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  {order.status === 'delivered' && (
                    <Button className="flex-1">
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
