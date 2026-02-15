// src/components/LicenseGuard.js
'use client';
import { useState, useEffect } from 'react';
import { getDeviceId } from '../utils/device';

export default function LicenseGuard({ children }) {
  const [status, setStatus] = useState('loading'); // loading, success, error, input
  const [licenseKey, setLicenseKey] = useState('');
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    // 1. Get Device ID
    const id = getDeviceId();
    setDeviceId(id);

    // 2. Check if we already verified this session?
    const isVerified = localStorage.getItem('lexora_license_active');
    if (isVerified === 'true') {
      setStatus('success');
    } else {
      setStatus('input');
    }
  }, []);

  const handleVerify = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey, deviceId }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        localStorage.setItem('lexora_license_active', 'true');
      } else {
        alert(data.message);
        setStatus('input');
      }
    } catch (error) {
      alert("Connection error");
      setStatus('input');
    }
  };

  if (status === 'success') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md p-6 border border-gray-800 rounded-xl bg-gray-900 shadow-2xl">
        <h1 className="text-xl font-bold text-center mb-2 text-blue-400">Lexora Security</h1>
        <p className="text-gray-400 text-center mb-6 text-xs">ID: {deviceId}</p>
        
        <input 
            type="text" 
            placeholder="Enter License Key"
            className="w-full p-3 bg-black border border-gray-700 rounded text-white mb-4"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
        />
        <button 
            onClick={handleVerify}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-bold"
        >
            {status === 'loading' ? 'Verifying...' : 'Unlock Widget'}
        </button>
      </div>
    </div>
  );
}