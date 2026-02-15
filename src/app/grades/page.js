// src/app/grades/page.js
'use client';
import { useState } from 'react';
import LicenseGuard from '@/components/LicenseGuard';

export default function GradeCalculatorPage() {
  return (
    <LicenseGuard>
      <GradeCalculator />
    </LicenseGuard>
  );
}

function GradeCalculator() {
  const [marks, setMarks] = useState([{ name: 'Assignment 1', score: '', weight: '' }]);
  const [result, setResult] = useState(null);

  const addRow = () => setMarks([...marks, { name: '', score: '', weight: '' }]);

  const calculate = () => {
    let totalWeight = 0;
    let weightedSum = 0;

    marks.forEach(m => {
      const w = parseFloat(m.weight) || 0;
      const s = parseFloat(m.score) || 0;
      weightedSum += (s * w);
      totalWeight += w;
    });

    if (totalWeight === 0) return;
    setResult((weightedSum / totalWeight).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-purple-400">GPA Predictor</h2>
        
        {marks.map((m, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input 
              placeholder="Module Name" 
              className="bg-gray-900 border border-gray-700 rounded p-2 flex-1 text-sm"
              value={m.name}
              onChange={(e) => {
                const newMarks = [...marks];
                newMarks[i].name = e.target.value;
                setMarks(newMarks);
              }}
            />
            <input 
              placeholder="%" 
              type="number"
              className="bg-gray-900 border border-gray-700 rounded p-2 w-16 text-sm text-center"
              value={m.score}
              onChange={(e) => {
                const newMarks = [...marks];
                newMarks[i].score = e.target.value;
                setMarks(newMarks);
              }}
            />
            <input 
              placeholder="Wgt" 
              type="number"
              className="bg-gray-900 border border-gray-700 rounded p-2 w-14 text-sm text-center"
              value={m.weight}
              onChange={(e) => {
                const newMarks = [...marks];
                newMarks[i].weight = e.target.value;
                setMarks(newMarks);
              }}
            />
          </div>
        ))}

        <div className="flex gap-2 mt-4">
          <button onClick={addRow} className="px-4 py-2 bg-gray-800 rounded text-sm hover:bg-gray-700">+ Add</button>
          <button onClick={calculate} className="flex-1 py-2 bg-purple-600 rounded text-sm font-bold hover:bg-purple-700">Calculate GPA</button>
        </div>

        {result && (
          <div className="mt-6 text-center bg-gray-900 p-4 rounded-xl border border-purple-500/30">
            <p className="text-gray-400 text-xs uppercase tracking-widest">Predicted Average</p>
            <p className="text-4xl font-bold text-white mt-1">{result}%</p>
          </div>
        )}
      </div>
    </div>
  );
}