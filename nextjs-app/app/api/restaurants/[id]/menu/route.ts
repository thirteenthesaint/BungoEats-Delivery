import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MenuItem from '@/lib/models/MenuItem';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Fetch menu items for this restaurant
    const menuItems = await MenuItem.find({ restaurant: id }).lean();

    const transformed = menuItems.map((item: any) => ({
      _id: item._id.toString(),
      name: item.name,
      description: item.description || '',
      price: item.price,
      category: item.category,
      image: item.image || '/placeholder-food.jpg',
      available: item.available !== false,
    }));

    return NextResponse.json(transformed);
  } catch (error: any) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items', message: error.message },
      { status: 500 }
    );
  }
}
