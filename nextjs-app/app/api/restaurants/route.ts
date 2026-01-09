import { NextRequest, NextResponse } from 'next/server';
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
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    // Build query filter
    const filter: any = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      filter.tags = category;
    }

    if (status) {
      filter.status = status;
    }

    // Fetch restaurants
    const restaurants = await Restaurant.find(filter)
      .select('_id name rating status phone address price_level tags description imageUrl')
      .lean();

    // Transform _id to id for cleaner API response
    const transformedRestaurants = restaurants.map((restaurant: any) => ({
      id: restaurant._id.toString(),
      name: restaurant.name,
      rating: restaurant.rating,
      status: restaurant.status,
      phone: restaurant.phone,
      address: restaurant.address,
      price_level: restaurant.price_level,
      tags: restaurant.tags,
      description: restaurant.description,
      imageUrl: restaurant.imageUrl,
    }));

    return NextResponse.json({
      success: true,
      count: transformedRestaurants.length,
      data: transformedRestaurants,
    });
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
