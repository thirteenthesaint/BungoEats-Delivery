import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

/**
 * GET /api/orders/[id]
 * Get order details and status
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const transformed = {
      _id: order._id.toString(),
      id: order.id,
      orderNumber: order.orderNumber,
      items: order.items,
      customer: order.customer,
      restaurantId: order.restaurantId,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      tax: order.tax,
      total: order.total,
      paymentMethod: order.paymentMethod,
      status: order.status,
      estimatedTime: order.estimatedTime,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    return NextResponse.json(transformed);
  } catch (error: any) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/orders/[id]
 * Update order status (for admin or status progression)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ['pending', 'placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    ).lean();

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      _id: order._id.toString(),
      status: order.status,
      updatedAt: order.updatedAt,
    });
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update order',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
