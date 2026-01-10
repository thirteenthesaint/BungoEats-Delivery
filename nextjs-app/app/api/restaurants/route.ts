import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Restaurant from '@/lib/models/Restaurant';

/**
 * GET /api/restaurants
 * Returns list of all restaurants with basic info and tags
 * Query params:
 *   - search: string (optional) - search by restaurant name
 *   - category: string (optional) - filter by category tag
 *   - status: 'open' | 'closed' (optional) - filter by status
 */
export async function GET() {
  try {
    await connectDB();

    // Fetch restaurants
    const restaurants = await Restaurant.find({})
      .select('_id name rating deliveryTime categories description image')
      .lean();

    // Transform for frontend
    const transformedRestaurants = restaurants.map((restaurant: any) => ({
      _id: restaurant._id.toString(),
      name: restaurant.name,
      rating: restaurant.rating || 4.5,
      deliveryTime: restaurant.deliveryTime || '30-45 min',
      categories: restaurant.categories || [],
      description: restaurant.description || '',
      image: restaurant.image || restaurant.imageUrl || '/placeholder-restaurant.jpg',
    }));

    return NextResponse.json(transformedRestaurants);
  } catch (error: any) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch restaurants',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
