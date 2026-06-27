import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/bookings
 * Creates a new booking with status "pending".
 * Validates: name, email, phone, service, doctor, date, time.
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
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const service = typeof body.service === 'string' ? body.service.trim() : '';
    const doctor = typeof body.doctor === 'string' ? body.doctor.trim() : '';
    const date = typeof body.date === 'string' ? body.date.trim() : '';
    const time = typeof body.time === 'string' ? body.time.trim() : '';
    const notes = typeof body.notes === 'string' ? body.notes.trim() : '';

    // Required-field validation
    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ success: false, error: 'A valid email is required' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ success: false, error: 'Phone is required' }, { status: 400 });
    }
    if (!service) {
      return NextResponse.json({ success: false, error: 'Service is required' }, { status: 400 });
    }
    if (!doctor) {
      return NextResponse.json({ success: false, error: 'Doctor is required' }, { status: 400 });
    }
    if (!date) {
      return NextResponse.json({ success: false, error: 'Date is required' }, { status: 400 });
    }
    if (!time) {
      return NextResponse.json({ success: false, error: 'Time is required' }, { status: 400 });
    }

    try {
      const booking = await db.booking.create({
        data: {
          name,
          email,
          phone,
          service,
          doctor,
          date,
          time,
          notes,
          status: 'pending',
        },
      });
      return NextResponse.json({ success: true, booking }, { status: 201 });
    } catch (dbError) {
      console.error('[/api/bookings] DB error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Failed to save booking' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[/api/bookings] POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
