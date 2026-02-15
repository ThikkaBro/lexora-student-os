// src/app/api/admin/create-license/route.js
import dbConnect from '@/lib/db';
import License from '@/models/License';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const body = await req.json();
    
    // 1. SECURITY CHECK (The Guard)
    // Only allow requests that have the correct "Admin Secret"
    if (req.headers.get('x-admin-secret') !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // 2. Generate a Unique Key (e.g., LEX-A1B2-C3D4)
    // You can customize this format if you want
    const uniqueKey = `LEX-${uuidv4().split('-')[0].toUpperCase()}-${uuidv4().split('-')[1].toUpperCase()}`;

    // 3. Save to MongoDB
    const newLicense = await License.create({
      key: uniqueKey,
      maxDevices: 2,
      active: true,
      email: body.email || "unknown@store.com" // Optional: Save their email if sent
    });

    // 4. Send back to PHP
    return NextResponse.json({ success: true, key: newLicense.key });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}