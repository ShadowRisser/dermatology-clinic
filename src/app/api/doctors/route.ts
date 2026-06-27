import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/doctors
 * Returns all clinic doctors sorted by sortOrder ascending.
 */
export async function GET() {
  try {
    const doctors = await db.doctor.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, doctors });
  } catch (error) {
    console.error('[/api/doctors] GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}
