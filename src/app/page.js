// src/app/page.js
'use client'; // This directive is crucial for client-side logic

import FocusTimer from '@/components/FocusTimer';
import { useState, useEffect } from 'react';
import { getDeviceId } from '../utils/device';

export default function Home() {
  const [deviceId, setDeviceId] = useState('Loading...');
  const [licenseKey, setLicenseKey] = useState('');
  const [status, setStatus] = useState('idle'); // idle, checking, success, error

  useEffect(() => {
    // On load, fetch the Device ID
    const id = getDeviceId();
    setDeviceId(id);
  }, []);

  const handleVerify = async () => {
    setStatus('checking');

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          licenseKey: licenseKey, 
          deviceId: deviceId 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        // Optional: Save state so they don't have to login next time
        localStorage.setItem('lexora_license_active', 'true');
      } else {
        setStatus('error');
        alert(data.message); // Show the specific error (e.g., "Device Limit Reached")
      }
    } catch (error) {
      setStatus('error');
      alert("Network error. Please try again.");
    }
};

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md p-6 border border-gray-800 rounded-xl bg-gray-900 shadow-2xl">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Lexora Student OS
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">Device Security Check</p>

        {/* Device Info */}
        <div className="bg-gray-800 p-3 rounded mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Your Device ID</p>
          <p className="font-mono text-green-400 text-sm break-all">{deviceId}</p>
        </div>

        {/* Status Logic */}
        {status === 'success' ? (
             <div className="w-full h-full flex flex-col">
             {/* Header for Logged In User */}
             <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                 <span className="text-xs text-green-400">● Live Connected</span>
                 <span className="text-xs text-gray-500">ID: {deviceId.slice(0,8)}...</span>
             </div>
             
             {/* THE APP */}
             <FocusTimer />
          </div>
        ) : (
            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Enter License Key (Try: LEXORA-123)"
                    className="w-full p-3 bg-black border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none transition"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                />
                
                <button 
                    onClick={handleVerify}
                    disabled={status === 'checking'}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition disabled:opacity-50"
                >
                    {status === 'checking' ? 'Verifying...' : 'Unlock Template'}
                </button>

                {status === 'error' && (
                    <p className="text-red-400 text-center text-sm">Invalid License Key. Access Denied.</p>
                )}
            </div>
        )}

      </div>
    </div>
  );
}