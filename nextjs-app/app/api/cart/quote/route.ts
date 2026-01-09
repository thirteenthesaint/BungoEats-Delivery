import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MenuItem from '@/lib/models/MenuItem';

/**
 * POST /api/cart/quote
 * Calculate cart totals (subtotal, delivery fee, tax, total)
 * 
 * Request body:
 * {
 *   items: [{ menuItemId: string, quantity: number }],
 *   deliveryType: 'pickup' | 'delivery'
 * }
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { items, deliveryType } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid cart items',
        },
        { status: 400 }
      );
    }

    // Fetch menu items from database
    const menuItemIds = items.map((item) => item.menuItemId);
    const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } }).lean();

    if (menuItems.length !== items.length) {
      return NextResponse.json(
        {
          success: false,
          error: 'Some menu items not found',
        },
        { status: 404 }
      );
    }

    // Calculate subtotal
    let subtotal = 0;
    const itemsWithPrices = items.map((cartItem) => {
      const menuItem = menuItems.find(
        (mi: any) => mi._id.toString() === cartItem.menuItemId
      );
      const itemTotal = (menuItem?.price || 0) * cartItem.quantity;
      subtotal += itemTotal;

      return {
        menuItemId: cartItem.menuItemId,
        name: menuItem?.name,
        price: menuItem?.price,
        quantity: cartItem.quantity,
        itemTotal,
      };
    });

    // Calculate delivery fee (KES 100 for delivery, 0 for pickup)
    const deliveryFee = deliveryType === 'delivery' ? 100 : 0;

    // Calculate tax (16% VAT in Kenya)
    const taxRate = 0.16;
    const tax = Math.round((subtotal + deliveryFee) * taxRate);

    // Calculate total
    const total = subtotal + deliveryFee + tax;

    return NextResponse.json({
      success: true,
      data: {
        items: itemsWithPrices,
        subtotal,
        deliveryFee,
        tax,
        total,
        deliveryType,
      },
    });
  } catch (error: any) {
    console.error('Error calculating cart quote:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to calculate cart quote',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
