import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Restaurant from '@/lib/models/Restaurant';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();

    const restaurant = await Restaurant.findById(id).lean();

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    const transformed = {
      _id: restaurant._id.toString(),
      name: restaurant.name,
      rating: restaurant.rating || 4.5,
      deliveryTime: '30-45 min',
      categories: restaurant.tags || [],
      description: restaurant.description || '',
      image: restaurant.imageUrl || '/placeholder-restaurant.jpg',
    };

    return NextResponse.json(transformed);
  } catch (error: any) {
    console.error('Error fetching restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurant', message: error.message },
      { status: 500 }
    );
  }
}
