// src/app/settings/page.js
'use client';
import { useState, useEffect } from 'react';
import LicenseGuard from '@/components/LicenseGuard';

export default function SettingsPage() {
  return (
    <LicenseGuard>
      <DeviceManager />
    </LicenseGuard>
  );
}

function DeviceManager() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  // You will need a new API route to FETCH device list for this to work perfectly.
  // For now, let's just create the UI logic.
  
  const handleLogout = () => {
    if(confirm("Are you sure? You will need to re-enter your key.")) {
        localStorage.removeItem('lexora_license_active');
        localStorage.removeItem('lexora_device_id');
        window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col items-center">
       <div className="max-w-md w-full bg-gray-900 p-6 rounded-xl border border-gray-800">
           <h2 className="text-xl font-bold mb-4 text-blue-400">Settings</h2>
           
           <div className="mb-6">
               <label className="text-xs text-gray-500 uppercase">License Status</label>
               <div className="flex items-center gap-2 mt-1">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   <span className="text-sm font-mono text-gray-300">Active</span>
               </div>
           </div>

           <button 
             onClick={handleLogout}
             className="w-full py-3 border border-red-500/30 text-red-500 rounded hover:bg-red-500/10 transition"
           >
             Deactivate This Device
           </button>
           
           <p className="text-xs text-center text-gray-600 mt-4">
             To manage other devices, please contact support or use the reset link in your email.
           </p>
       </div>
    </div>
  );
}