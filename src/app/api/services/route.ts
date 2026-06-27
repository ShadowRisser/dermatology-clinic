import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/services
 * Returns all clinic services sorted by sortOrder ascending.
 */
export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error('[/api/services] GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
