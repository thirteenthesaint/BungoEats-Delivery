import { NextRequest, NextResponse } from 'next/server';
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
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { items, customer, deliveryType, paymentMethod, preferredTime } = body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid items' },
        { status: 400 }
      );
    }

    if (!customer || !customer.name || !customer.phone) {
      return NextResponse.json(
        { success: false, error: 'Customer name and phone are required' },
        { status: 400 }
      );
    }

    if (deliveryType === 'delivery' && !customer.address) {
      return NextResponse.json(
        { success: false, error: 'Address is required for delivery' },
        { status: 400 }
      );
    }

    // Fetch menu items to get prices
    const menuItemIds = items.map((item) => item.menuItemId);
    const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } }).lean();

    if (menuItems.length !== items.length) {
      return NextResponse.json(
        { success: false, error: 'Some menu items not found' },
        { status: 404 }
      );
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = items.map((cartItem) => {
      const menuItem = menuItems.find(
        (mi: any) => mi._id.toString() === cartItem.menuItemId
      );
      const itemTotal = (menuItem?.price || 0) * cartItem.quantity;
      subtotal += itemTotal;

      return {
        menuItemId: cartItem.menuItemId,
        name: menuItem?.name || '',
        price: menuItem?.price || 0,
        quantity: cartItem.quantity,
        notes: cartItem.notes || '',
      };
    });

    const deliveryFee = deliveryType === 'delivery' ? 100 : 0;
    const taxRate = 0.16;
    const tax = Math.round((subtotal + deliveryFee) * taxRate);
    const total = subtotal + deliveryFee + tax;

    // Create order
    const order = await Order.create({
      items: orderItems,
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address || '',
        pickupOrDelivery: deliveryType,
      },
      subtotal,
      deliveryFee,
      tax,
      total,
      paymentMethod,
      status: 'placed',
      preferredTime: preferredTime || 'ASAP',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          orderId: order._id.toString(),
          status: order.status,
          total: order.total,
          estimatedTime: '30-45 minutes',
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
