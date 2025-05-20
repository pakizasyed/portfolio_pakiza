import React from 'react';
import { Heart } from 'lucide-react';
import NavBar from './NavBar';
import { useLocation } from '../hooks/useLocation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentPath } = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col">
      <header className="bg-white shadow-sm py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="text-pink-500" size={24} />
            <h1 className="text-2xl font-bold text-pink-600">GirlyMood</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-white py-4 border-t border-pink-100">
        <div className="container mx-auto px-4 text-center text-pink-400">
          <p>© 2025 GirlyMood - Track your feelings with style 💖</p>
        </div>
      </footer>
      
      <NavBar currentPath={currentPath} />
    </div>
  );
};

export default Layout;