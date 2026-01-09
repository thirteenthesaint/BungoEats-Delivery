import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Restaurant from '@/lib/models/Restaurant';
import MenuItem from '@/lib/models/MenuItem';

/**
 * Middleware to check admin authentication
 */
function checkAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminToken = process.env.ADMIN_TOKEN || 'admin-secret-token';

  if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
    return false;
  }

  return true;
}

/**
 * POST /api/admin/restaurants/[id]/menu
 * Update restaurant menu (admin only)
 * 
 * Request body:
 * {
 *   menuItems: [{
 *     id?: string,  // if updating existing item
 *     categoryId: string,
 *     name: string,
 *     description: string,
 *     price: number,
 *     imageUrl?: string,
 *     available: boolean,
 *     options?: any
 *   }]
 * }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { menuItems } = body;

    // Verify restaurant exists
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return NextResponse.json(
        {
          success: false,
          error: 'Restaurant not found',
        },
        { status: 404 }
      );
    }

    if (!menuItems || !Array.isArray(menuItems)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid menu items',
        },
        { status: 400 }
      );
    }

    // Update or create menu items
    const updatedItems = [];

    for (const item of menuItems) {
      if (item.id) {
        // Update existing item
        const updated = await MenuItem.findByIdAndUpdate(
          item.id,
          {
            categoryId: item.categoryId,
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl: item.imageUrl,
            available: item.available,
            options: item.options,
          },
          { new: true }
        );
        updatedItems.push(updated);
      } else {
        // Create new item
        const newItem = await MenuItem.create({
          restaurantId: id,
          categoryId: item.categoryId,
          name: item.name,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
          available: item.available !== false,
          options: item.options,
        });
        updatedItems.push(newItem);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Menu updated successfully',
      data: {
        restaurantId: id,
        updatedCount: updatedItems.length,
      },
    });
  } catch (error: any) {
    console.error('Error updating menu:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update menu',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/restaurants/[id]/menu
 * Update restaurant status (Open/Closed)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['open', 'closed'].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status. Must be "open" or "closed"',
        },
        { status: 400 }
      );
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!restaurant) {
      return NextResponse.json(
        {
          success: false,
          error: 'Restaurant not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Restaurant status updated',
      data: {
        restaurantId: id,
        status: restaurant.status,
      },
    });
  } catch (error: any) {
    console.error('Error updating restaurant status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update restaurant status',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
