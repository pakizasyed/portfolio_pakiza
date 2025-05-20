import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import MoodHistory from '../components/MoodHistory';
import { Mood } from '../types';
import { getMoods } from '../utils/storage';
import { groupMoodsByDate } from '../utils/formatters';

const HistoryPage: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  
  const loadMoods = () => {
    setLoading(true);
    const allMoods = getMoods();
    setMoods(allMoods);
    setLoading(false);
  };
  
  useEffect(() => {
    loadMoods();
    
    const handleStorageChange = () => {
      loadMoods();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const groupedMoods = groupMoodsByDate(moods);
  
  if (loading) {
    return <div className="text-center py-8">Loading your mood history...</div>;
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Calendar className="text-pink-500 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Your Mood History</h2>
      </div>
      
      {Object.keys(groupedMoods).length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No mood history yet</h3>
          <p className="text-gray-500">Start tracking your moods to build your history!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedMoods).map(([date, dateMoods]) => (
            <div key={date}>
              <h3 className="text-lg font-medium text-gray-700 mb-3">{date}</h3>
              <MoodHistory moods={dateMoods} onDelete={loadMoods} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;