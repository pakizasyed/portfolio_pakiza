export interface Mood {
  id: string;
  emoji: string;
  label: string;
  color: string;
  timestamp: string;
  note?: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface UserProfile {
  name: string;
  avatar: string | null;
  joinDate: string;
}

export type Theme = 'pink-paradise' | 'purple-dream' | 'pastel-rainbow';

export interface ThemeConfig {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}