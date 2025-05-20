import { Mood, UserProfile, Theme } from '../types';

// Local Storage keys
const MOODS_KEY = 'girlymood_moods';
const USER_PROFILE_KEY = 'girlymood_user_profile';
const THEME_KEY = 'girlymood_theme';
const NOTIFICATIONS_KEY = 'girlymood_notifications';

// Get all moods from localStorage
export const getMoods = (): Mood[] => {
  const storedMoods = localStorage.getItem(MOODS_KEY);
  return storedMoods ? JSON.parse(storedMoods) : [];
};

// Save a mood to localStorage
export const saveMood = (mood: Mood): void => {
  const moods = getMoods();
  moods.push(mood);
  localStorage.setItem(MOODS_KEY, JSON.stringify(moods));
};

// Delete a mood from localStorage
export const deleteMood = (id: string): void => {
  const moods = getMoods();
  const updatedMoods = moods.filter(mood => mood.id !== id);
  localStorage.setItem(MOODS_KEY, JSON.stringify(updatedMoods));
};

// Get moods for a specific date
export const getMoodsByDate = (date: Date): Mood[] => {
  const moods = getMoods();
  const dateStr = date.toISOString().split('T')[0];
  
  return moods.filter(mood => {
    const moodDate = new Date(mood.timestamp).toISOString().split('T')[0];
    return moodDate === dateStr;
  });
};

// User Profile Management
export const getUserProfile = (): UserProfile => {
  const storedProfile = localStorage.getItem(USER_PROFILE_KEY);
  return storedProfile ? JSON.parse(storedProfile) : {
    name: 'GirlyMood User',
    avatar: null,
    joinDate: new Date().toISOString()
  };
};

export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
};

// Theme Management
export const getTheme = (): Theme => {
  const storedTheme = localStorage.getItem(THEME_KEY);
  return storedTheme ? storedTheme as Theme : 'pink-paradise';
};

export const saveTheme = (theme: Theme): void => {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
};

// Notifications Management
export const getNotificationsEnabled = (): boolean => {
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  return stored ? JSON.parse(stored) : true;
};

export const saveNotificationsEnabled = (enabled: boolean): void => {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(enabled));
};

// Clear all user data
export const clearUserData = (): void => {
  localStorage.removeItem(MOODS_KEY);
  localStorage.removeItem(USER_PROFILE_KEY);
  localStorage.removeItem(THEME_KEY);
  localStorage.removeItem(NOTIFICATIONS_KEY);
};