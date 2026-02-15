// src/app/exams/page.js
'use client';
import { useState, useEffect } from 'react';
import LicenseGuard from '@/components/LicenseGuard';

export default function ExamPage() {
  return (
    <LicenseGuard>
      <ExamCountdown />
    </LicenseGuard>
  );
}

function ExamCountdown() {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState('');
  const [newDate, setNewDate] = useState('');

  // Load from local storage on start
  useEffect(() => {
    const saved = localStorage.getItem('lexora_exams');
    if (saved) setExams(JSON.parse(saved));
  }, []);

  // Save whenever exams change
  useEffect(() => {
    localStorage.setItem('lexora_exams', JSON.stringify(exams));
  }, [exams]);

  const addExam = () => {
    if (!newExam || !newDate) return;
    setExams([...exams, { name: newExam, date: newDate }]);
    setNewExam('');
    setNewDate('');
  };

  const removeExam = (index) => {
    const updated = exams.filter((_, i) => i !== index);
    setExams(updated);
  };

  const getDaysLeft = (targetDate) => {
    const diff = new Date(targetDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center">
        ⚠️ Exam War Room
      </h2>

      {/* Input Area */}
      <div className="flex gap-2 mb-8">
        <input 
          placeholder="Subject (e.g. Data Structures)" 
          className="bg-gray-900 border border-gray-700 rounded p-3 flex-1 text-sm outline-none focus:border-red-500 transition"
          value={newExam}
          onChange={(e) => setNewExam(e.target.value)}
        />
        <input 
          type="date"
          className="bg-gray-900 border border-gray-700 rounded p-3 text-sm outline-none focus:border-red-500 transition"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button onClick={addExam} className="px-6 bg-red-600 hover:bg-red-700 rounded font-bold transition">
          +
        </button>
      </div>

      {/* The List */}
      <div className="space-y-4">
        {exams.sort((a,b) => new Date(a.date) - new Date(b.date)).map((exam, i) => {
          const days = getDaysLeft(exam.date);
          const urgencyColor = days < 7 ? 'text-red-500 border-red-500' : (days < 30 ? 'text-yellow-500 border-yellow-500' : 'text-green-500 border-green-500');
          
          return (
            <div key={i} className={`flex justify-between items-center p-4 bg-gray-900 border-l-4 rounded-r-lg ${urgencyColor} border-l-${urgencyColor.split('-')[1]}-500`}>
              <div>
                <h3 className="font-bold text-lg">{exam.name}</h3>
                <p className="text-gray-400 text-xs">{exam.date}</p>
              </div>
              <div className="text-right">
                <span className={`text-3xl font-mono font-bold ${urgencyColor.split(' ')[0]}`}>{days}</span>
                <span className="text-xs text-gray-500 block">DAYS LEFT</span>
              </div>
              <button onClick={() => removeExam(i)} className="ml-4 text-gray-600 hover:text-white">✕</button>
            </div>
          );
        })}
        
        {exams.length === 0 && (
            <p className="text-gray-600 text-center italic mt-10">No upcoming exams. Stay relaxed.</p>
        )}
      </div>
    </div>
  );
}