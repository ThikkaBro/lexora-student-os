// src/components/FocusTimer.js
'use client';
import { useState, useEffect } from 'react';

export default function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer Finished
            setIsActive(false);
            // Play a sound here later
            alert(mode === 'focus' ? "Focus Complete! Take a break." : "Break over! Back to work.");
            toggleMode();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleMode = () => {
    if (mode === 'focus') {
      setMode('break');
      setMinutes(5);
    } else {
      setMode('focus');
      setMinutes(25);
    }
    setSeconds(0);
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setMinutes(mode === 'focus' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full h-full text-white">
      {/* Mode Toggle */}
      <div className="flex space-x-2 mb-8 bg-gray-800 p-1 rounded-full">
        <button 
          onClick={() => { setMode('focus'); setMinutes(25); setSeconds(0); setIsActive(false); }}
          className={`px-4 py-1 rounded-full text-sm font-medium transition ${mode === 'focus' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Focus
        </button>
        <button 
          onClick={() => { setMode('break'); setMinutes(5); setSeconds(0); setIsActive(false); }}
          className={`px-4 py-1 rounded-full text-sm font-medium transition ${mode === 'break' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Break
        </button>
      </div>

      {/* The Big Timer */}
      <div className="text-8xl font-mono font-bold tracking-tighter mb-8 tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      {/* Controls */}
      <div className="flex space-x-4">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`w-32 py-3 rounded-lg font-bold text-lg transition transform active:scale-95 ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-white text-black hover:bg-gray-200'}`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={reset}
          className="w-12 flex items-center justify-center rounded-lg border border-gray-700 hover:bg-gray-800 transition"
        >
          ↺
        </button>
      </div>
    </div>
  );
}