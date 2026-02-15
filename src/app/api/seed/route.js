// src/app/api/seed/route.js
import dbConnect from '@/lib/db';
import License from '@/models/License';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  // Create a test license
  try {
    // Check if it exists first to avoid duplicates
    const existing = await License.findOne({ key: 'LEXORA-TEST-1' });
    
    if (existing) {
      return NextResponse.json({ message: 'Test license already exists!' });
    }

    const newLicense = await License.create({
      key: 'LEXORA-TEST-1',
      maxDevices: 2,
      devices: [], // Start empty
      active: true
    });

    return NextResponse.json({ success: true, license: newLicense });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}