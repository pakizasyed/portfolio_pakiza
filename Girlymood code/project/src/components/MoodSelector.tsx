import React, { useState } from 'react';
import { MOOD_OPTIONS } from '../data/moods';
import { Mood } from '../types';
import { saveMood } from '../utils/storage';
import { PenLine } from 'lucide-react';

const MoodSelector: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<typeof MOOD_OPTIONS[0] | null>(null);
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleMoodSelect = (mood: typeof MOOD_OPTIONS[0]) => {
    setSelectedMood(mood);
    setShowNote(true);
  };

  const handleSaveMood = () => {
    if (!selectedMood) return;
    
    const newMood: Mood = {
      id: Date.now().toString(),
      ...selectedMood,
      timestamp: new Date().toISOString(),
      note: note || undefined
    };
    
    saveMood(newMood);
    setSaveSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSelectedMood(null);
      setNote('');
      setShowNote(false);
      setSaveSuccess(false);
    }, 2000);
  };

  if (saveSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-fade-in">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="text-lg font-medium text-green-800 mb-2">Mood Saved!</h3>
        <p className="text-green-600">Your mood has been recorded successfully.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100">
      <h3 className="text-lg font-medium text-gray-700 mb-4">How are you feeling today?</h3>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        {MOOD_OPTIONS.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleMoodSelect(mood)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
              selectedMood?.label === mood.label 
                ? `${mood.color} text-white ring-2 ring-offset-2 ring-${mood.color.replace('bg-', '')}`
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
      
      {showNote && (
        <div className="animate-fade-in">
          <div className="flex items-center mb-2">
            <PenLine size={16} className="text-pink-400 mr-2" />
            <label htmlFor="mood-note" className="text-sm font-medium text-gray-600">
              Add a note (optional)
            </label>
          </div>
          <textarea
            id="mood-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's making you feel this way?"
            className="w-full p-3 border border-pink-100 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-colors"
            rows={3}
          />
          
          <button
            onClick={handleSaveMood}
            className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Save Mood
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;