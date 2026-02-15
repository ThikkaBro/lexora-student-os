// src/utils/device.js
import { v4 as uuidv4 } from 'uuid';

export const getDeviceId = () => {
  // 1. Check if we are running in the browser (Next.js renders on server too)
  if (typeof window !== 'undefined') {
    
    // 2. Try to get the existing ID from LocalStorage
    let deviceId = localStorage.getItem('lexora_device_id');

    // 3. If no ID exists (New Device), generate one
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem('lexora_device_id', deviceId);
    }

    return deviceId;
  }
  
  return null; // Return null if on server
};