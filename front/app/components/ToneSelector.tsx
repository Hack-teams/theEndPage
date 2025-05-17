import React, { useState } from 'react';
import { Sparkles, Heart, AlarmClock, Flame, PlayCircle } from 'lucide-react';

interface ToneOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  preview: string;
}

const toneOptions: ToneOption[] = [
  {
    id: 'dramatic',
    label: 'Dramatic',
    description: 'For when you need that Oscar-worthy exit',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-purple-500 to-indigo-600',
    preview: '"After 3 years, 4 months, and 12 days, my time has come to an end. I gave everything, but it wasn\'t enough..."'
  },
  {
    id: 'heartfelt',
    label: 'Heartfelt',
    description: 'Genuine appreciation with a touch of emotion',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-600',
    preview: '"To everyone who made this journey special - thank you for the memories, the growth, and the friendship..."'
  },
  {
    id: 'urgent',
    label: 'Urgent',
    description: 'Need to exit fast? Make it quick but impactful',
    icon: <AlarmClock className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600',
    preview: '"Effective immediately, I\'m out. Contact HR for details. It\'s not personal, it\'s just time."'
  },
  {
    id: 'fiery',
    label: 'Fiery',
    description: 'For when bridges are meant to be burned',
    icon: <Flame className="w-6 h-6" />,
    color: 'from-red-500 to-rose-600',
    preview: '"Let me be clear about why I\'m leaving. The toxic environment, the broken promises, and the disrespect..."'
  },
];

const ToneSelector: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<string>('dramatic');

  const handleToneSelect = (toneId: string) => {
    setSelectedTone(toneId);
  };

  const selectedToneData = toneOptions.find(tone => tone.id === selectedTone);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
      <h3 className="text-xl text-white font-semibold mb-4">Choose your exit tone:</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {toneOptions.map((tone) => (
          <button
            key={tone.id}
            onClick={() => handleToneSelect(tone.id)}
            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
              selectedTone === tone.id 
                ? `bg-gradient-to-br ${tone.color} text-white`
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            {tone.icon}
            <span className="mt-2 font-medium">{tone.label}</span>
          </button>
        ))}
      </div>
      
      {selectedToneData && (
        <div className="mt-6">
          <div className="flex items-center mb-3">
            <h4 className="text-white font-medium mr-2">Preview:</h4>
            <span className={`text-sm px-2 py-1 rounded bg-gradient-to-r ${selectedToneData.color} text-white`}>
              {selectedToneData.label}
            </span>
          </div>
          
          <div className="relative bg-black/40 p-5 rounded-lg border border-gray-800">
            <blockquote className="text-lg text-gray-200 italic">
              {selectedToneData.preview}
            </blockquote>
            
            <div className="absolute bottom-4 right-4">
              <button className="flex items-center text-white bg-black/50 hover:bg-black/80 transition-colors p-2 rounded-full">
                <PlayCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToneSelector;