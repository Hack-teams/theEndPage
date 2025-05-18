// RageSlider.tsx
import React from 'react';

export default function RageSlider({ level, onChange }) {
  return (
    <div className="mt-8 text-center">
      <label className="block mb-2 font-bold">Niveau de rage 😡</label>
      <input 
        type="range" 
        min="0" max="10" 
        value={level}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-64"
      />
      <div className="mt-2 text-lg">{level}/10</div>
    </div>
  );
}
