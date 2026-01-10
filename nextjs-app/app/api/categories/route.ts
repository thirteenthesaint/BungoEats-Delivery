import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';

/**
 * GET /api/categories
 * Returns list of all categories
 */
export async function GET(_request: Request) {
  try {
    await connectDB();

    const categories = await Category.find()
      .select('_id name slug')
      .sort({ name: 1 })
      .lean();

    const transformedCategories = categories.map((category: any) => ({
      id: category._id.toString(),
      name: category.name,
      slug: category.slug,
    }));

    return NextResponse.json({
      success: true,
      count: transformedCategories.length,
      data: transformedCategories,
    });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
