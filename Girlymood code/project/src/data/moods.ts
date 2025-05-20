import { Mood } from '../types';

export const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Happy', color: 'bg-pink-400' },
  { emoji: '😍', label: 'Loved', color: 'bg-red-400' },
  { emoji: '😌', label: 'Calm', color: 'bg-blue-400' },
  { emoji: '🥰', label: 'Grateful', color: 'bg-purple-400' },
  { emoji: '😔', label: 'Sad', color: 'bg-indigo-400' },
  { emoji: '😤', label: 'Angry', color: 'bg-amber-400' },
  { emoji: '😰', label: 'Anxious', color: 'bg-teal-400' },
  { emoji: '😴', label: 'Tired', color: 'bg-gray-400' },
];

// Example historical moods
export const SAMPLE_MOODS: Mood[] = [
  {
    id: '1',
    emoji: '😊',
    label: 'Happy',
    color: 'bg-pink-400',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    note: 'Had a great day with friends!'
  },
  {
    id: '2',
    emoji: '😌',
    label: 'Calm',
    color: 'bg-blue-400',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    note: 'Meditation helped me relax'
  },
  {
    id: '3',
    emoji: '😴',
    label: 'Tired',
    color: 'bg-gray-400',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    note: 'Stayed up too late'
  },
];