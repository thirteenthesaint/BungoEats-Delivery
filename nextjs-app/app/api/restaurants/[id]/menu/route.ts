import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Restaurant from '@/lib/models/Restaurant';
import MenuItem from '@/lib/models/MenuItem';
import Category from '@/lib/models/Category';

/**
 * GET /api/restaurants/[id]/menu
 * Returns full menu grouped by category for a specific restaurant
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Fetch restaurant details
    const restaurant = await Restaurant.findById(id).lean();

    if (!restaurant) {
      return NextResponse.json(
        {
          success: false,
          error: 'Restaurant not found',
        },
        { status: 404 }
      );
    }

    // Fetch menu items for this restaurant
    const menuItems = await MenuItem.find({ restaurantId: id, available: true })
      .populate('categoryId', 'name slug')
      .lean();

    // Group menu items by category
    const menuByCategory: any = {};

    for (const item of menuItems) {
      const category = (item.categoryId as any);
      const categoryName = category?.name || 'Uncategorized';

      if (!menuByCategory[categoryName]) {
        menuByCategory[categoryName] = {
          category: categoryName,
          slug: category?.slug || 'uncategorized',
          items: [],
        };
      }

      menuByCategory[categoryName].items.push({
        id: item._id.toString(),
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        options: item.options,
      });
    }

    // Convert to array
    const menu = Object.values(menuByCategory);

    return NextResponse.json({
      success: true,
      data: {
        restaurant: {
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
        },
        menu,
      },
    });
  } catch (error: any) {
    console.error('Error fetching restaurant menu:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch restaurant menu',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
