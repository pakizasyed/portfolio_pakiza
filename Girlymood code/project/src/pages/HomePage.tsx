import React, { useEffect, useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import MoodSelector from '../components/MoodSelector';
import MoodHistory from '../components/MoodHistory';
import { Mood } from '../types';
import { getMoodsByDate } from '../utils/storage';

const HomePage: React.FC = () => {
  const [todaysMoods, setTodaysMoods] = useState<Mood[]>([]);
  
  const loadTodaysMoods = () => {
    const moods = getMoodsByDate(new Date());
    setTodaysMoods(moods);
  };
  
  useEffect(() => {
    loadTodaysMoods();
    
    // Listen for storage events (for multi-tab support)
    const handleStorageChange = () => {
      loadTodaysMoods();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return (
    <div className="space-y-6">
      <QuoteCard />
      
      <MoodSelector />
      
      {todaysMoods.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Today's Moods</h3>
          <MoodHistory moods={todaysMoods} onDelete={loadTodaysMoods} />
        </div>
      )}
    </div>
  );
};

export default HomePage;