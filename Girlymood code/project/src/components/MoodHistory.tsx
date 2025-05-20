import React from 'react';
import { Mood } from '../types';
import { Calendar, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { deleteMood } from '../utils/storage';

interface MoodHistoryProps {
  moods: Mood[];
  onDelete?: () => void;
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ moods, onDelete }) => {
  const handleDelete = (id: string) => {
    deleteMood(id);
    if (onDelete) onDelete();
  };

  if (moods.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <Calendar className="mx-auto text-pink-300 mb-3" size={36} />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No mood entries yet</h3>
        <p className="text-gray-500 text-sm">Start logging your moods to see your history here!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm divide-y divide-pink-100">
      {moods.map((mood) => (
        <div key={mood.id} className="p-4 hover:bg-pink-50 transition-colors duration-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{mood.emoji}</span>
              <div>
                <h4 className="font-medium text-gray-800">{mood.label}</h4>
                <p className="text-xs text-gray-500">{formatDate(new Date(mood.timestamp))}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(mood.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete mood"
            >
              <Trash2 size={16} />
            </button>
          </div>
          
          {mood.note && (
            <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{mood.note}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoodHistory;