import React, { useState, useEffect } from 'react';
import { BarChart, PieChart, Clock } from 'lucide-react';
import { Mood } from '../types';
import { getMoods } from '../utils/storage';
import { MOOD_OPTIONS } from '../data/moods';

const StatsPage: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    const allMoods = getMoods();
    setMoods(allMoods);
    setLoading(false);
    
    const handleStorageChange = () => {
      setMoods(getMoods());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  if (loading) {
    return <div className="text-center py-8">Loading your mood statistics...</div>;
  }
  
  if (moods.length === 0) {
    return (
      <div className="text-center py-8">
        <BarChart className="mx-auto text-pink-300 mb-4" size={48} />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No mood data yet</h3>
        <p className="text-gray-500">Start tracking your moods to see your statistics!</p>
      </div>
    );
  }
  
  // Calculate mood distribution
  const moodCounts = MOOD_OPTIONS.map(option => {
    const count = moods.filter(mood => mood.label === option.label).length;
    return {
      ...option,
      count,
      percentage: moods.length > 0 ? Math.round((count / moods.length) * 100) : 0
    };
  }).sort((a, b) => b.count - a.count);
  
  // Calculate most common mood time (morning, afternoon, evening, night)
  const timeOfDay = moods.reduce((acc, mood) => {
    const hour = new Date(mood.timestamp).getHours();
    let timeSlot = '';
    
    if (hour >= 5 && hour < 12) timeSlot = 'Morning';
    else if (hour >= 12 && hour < 17) timeSlot = 'Afternoon';
    else if (hour >= 17 && hour < 21) timeSlot = 'Evening';
    else timeSlot = 'Night';
    
    acc[timeSlot] = (acc[timeSlot] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostCommonTime = Object.entries(timeOfDay).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <BarChart className="text-pink-500 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Your Mood Stats</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <PieChart className="text-pink-400 mr-2" size={20} />
            <h3 className="text-lg font-medium text-gray-700">Mood Distribution</h3>
          </div>
          
          <div className="space-y-3">
            {moodCounts.map(mood => (
              <div key={mood.label}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="mr-2">{mood.emoji}</span>
                    <span className="text-sm text-gray-700">{mood.label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{mood.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${mood.color}`} 
                    style={{width: `${mood.percentage}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Clock className="text-pink-400 mr-2" size={20} />
            <h3 className="text-lg font-medium text-gray-700">Mood Patterns</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Total moods tracked</p>
              <p className="text-3xl font-bold text-pink-500">{moods.length}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-2">Most common mood</p>
              <div className="flex items-center">
                <span className="text-2xl mr-2">
                  {moodCounts[0]?.emoji || ''}
                </span>
                <span className="text-lg font-medium text-gray-700">
                  {moodCounts[0]?.label || 'N/A'}
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-2">Most active time of day</p>
              <p className="text-lg font-medium text-gray-700">{mostCommonTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;