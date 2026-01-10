import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import MenuItem from '@/lib/models/MenuItem';

/**
 * POST /api/orders
 * Create a new order
 * 
 * Request body:
 * {
 *   items: [{ menuItemId: string, quantity: number, notes?: string }],
 *   customer: { name: string, phone: string, address?: string },
 *   deliveryType: 'pickup' | 'delivery',
 *   paymentMethod: 'cash' | 'card' | 'mpesa',
 *   preferredTime?: string
 * }
 */
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { restaurant, items, customerName, phone, email, deliveryAddress, paymentMethod, notes, subtotal, deliveryFee, tax, total } = body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid items' },
        { status: 400 }
      );
    }

    if (!customerName || !phone) {
      return NextResponse.json(
        { error: 'Customer name and phone are required' },
        { status: 400 }
      );
    }

    // Fetch menu items to populate data
    const menuItemIds = items.map((item: any) => item.menuItem);
    const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } }).lean();

    // Create order with populated items
    const orderItemsWithDetails = items.map((item: any) => {
      const menuItem = menuItems.find(
        (mi: any) => mi._id.toString() === item.menuItem
      );
      return {
        menuItemId: item.menuItem,
        name: menuItem?.name || '',
        price: item.price,
        quantity: item.quantity,
        notes: item.notes || '',
      };
    });

    // Generate order number
    const orderNumber = 'ORD' + Date.now().toString().slice(-8);

    // Create order
    const order = await Order.create({
      id: orderNumber,
      orderNumber,
      restaurantId: restaurant,
      items: orderItemsWithDetails,
      customer: {
        name: customerName,
        phone,
        address: deliveryAddress,
        deliveryType: deliveryAddress ? 'delivery' : 'pickup',
      },
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      total,
      status: 'pending',
      estimatedTime: 30,
    });

    return NextResponse.json(
      {
        _id: order._id.toString(),
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        error: 'Failed to create order',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const orders = await Order.find({ phone })
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 })
      .lean();

    const transformed = orders.map((order: any) => ({
      _id: order._id.toString(),
      orderNumber: order.orderNumber,
      restaurant: {
        name: order.restaurant?.name || 'Restaurant',
      },
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
    }));

    return NextResponse.json(transformed);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', message: error.message },
      { status: 500 }
    );
  }
}
