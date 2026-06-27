import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/newsletter
 * Subscribes an email to the Lumière newsletter.
 *  - Validates email format with a simple regex.
 *  - If the email already exists, returns 200 with "already subscribed".
 *  - Otherwise creates the record and returns 201.
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

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email is required' },
        { status: 400 }
      );
    }

    const existing = await db.newsletter.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: true, message: 'already subscribed' },
        { status: 200 }
      );
    }

    const subscription = await db.newsletter.create({ data: { email } });
    return NextResponse.json(
      { success: true, message: 'subscribed', subscription },
      { status: 201 }
    );
  } catch (error) {
    console.error('[/api/newsletter] POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
