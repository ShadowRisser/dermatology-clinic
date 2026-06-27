import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/reviews
 * Returns all featured reviews sorted by createdAt descending.
 */
export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error('[/api/reviews] GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reviews
 * Creates a new review. Validates:
 *   - name: non-empty string
 *   - rating: integer 1-5
 *   - treatment: non-empty string
 *   - text: non-empty string
 * Optional: location (defaults to empty string), featured (defaults to false).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const rating = Number(body.rating);
    const treatment = typeof body.treatment === 'string' ? body.treatment.trim() : '';
    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const location = typeof body.location === 'string' ? body.location.trim() : '';
    const featured = typeof body.featured === 'boolean' ? body.featured : false;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      );
    }
    if (!treatment) {
      return NextResponse.json(
        { success: false, error: 'Treatment is required' },
        { status: 400 }
      );
    }
    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Review text is required' },
        { status: 400 }
      );
    }

    const review = await db.review.create({
      data: {
        name,
        rating,
        treatment,
        text,
        location,
        featured,
      },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error('[/api/reviews] POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
