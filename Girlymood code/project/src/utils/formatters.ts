import { Mood } from '../types';

// Format a date to a friendly string
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Format a date to just the date portion
export const formatDateOnly = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long',
    month: 'short', 
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Group moods by date
export const groupMoodsByDate = (moods: Mood[]): Record<string, Mood[]> => {
  return moods.reduce((groups, mood) => {
    const date = formatDateOnly(new Date(mood.timestamp));
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(mood);
    return groups;
  }, {} as Record<string, Mood[]>);
};