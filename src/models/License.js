// src/models/License.js
import mongoose from 'mongoose';

const LicenseSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true, // No two people can have the same key
  },
  email: { type: String },
  devices: {
    type: [String], // An array of Device IDs (e.g. ["device_123", "device_456"])
    default: [],
  },
  maxDevices: {
    type: Number,
    default: 2, // The limit you set
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// Prevent model overwrite error in Next.js hot reloading
export default mongoose.models.License || mongoose.model('License', LicenseSchema);