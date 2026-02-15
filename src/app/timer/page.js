// src/app/timer/page.js
import LicenseGuard from '@/components/LicenseGuard';
import FocusTimer from '@/components/FocusTimer';

export default function TimerPage() {
  return (
    <LicenseGuard>
       {/* The widget goes here, protected by the guard */}
       <div className="min-h-screen bg-black flex items-center justify-center">
          <FocusTimer />
       </div>
    </LicenseGuard>
  );
}