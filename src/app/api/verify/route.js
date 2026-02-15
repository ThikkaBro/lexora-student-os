// src/app/api/verify/route.js
import dbConnect from '@/lib/db';
import License from '@/models/License';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect(); // Connect to DB

    const body = await req.json();
    const { licenseKey, deviceId } = body;

    // 1. Find the license in the DB
    const license = await License.findOne({ key: licenseKey });

    if (!license) {
      return NextResponse.json({ success: false, message: "Invalid License Key" }, { status: 400 });
    }

    if (!license.active) {
      return NextResponse.json({ success: false, message: "License Suspended" }, { status: 403 });
    }

    // 2. Check if THIS device is already registered
    if (license.devices.includes(deviceId)) {
      return NextResponse.json({ success: true, message: "Welcome back!" });
    }

    // 3. If new device, check limits (The "2 Device" Rule)
    if (license.devices.length >= license.maxDevices) {
      return NextResponse.json({ 
        success: false, 
        message: `Device Limit Reached (${license.devices.length}/${license.maxDevices}). Please contact support.` 
      }, { status: 403 });
    }

    // 4. Register the new device (Lock it to this ID)
    license.devices.push(deviceId);
    await license.save();

    return NextResponse.json({ success: true, message: "New Device Registered!" });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}