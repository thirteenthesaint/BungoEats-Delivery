import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token !== 'dev_admin_token_12345') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const orders = await Order.find({})
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 })
      .lean();

    const transformed = orders.map((order: any) => ({
      _id: order._id.toString(),
      orderNumber: order.orderNumber,
      customerName: order.customerName,
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
