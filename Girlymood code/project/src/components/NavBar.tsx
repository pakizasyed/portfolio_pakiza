import React from 'react';
import { Home, Calendar, BarChart, UserCircle } from 'lucide-react';

interface NavBarProps {
  currentPath: string;
}

const NavBar: React.FC<NavBarProps> = ({ currentPath }) => {
  const navItems = [
    { 
      path: '/',
      label: 'Home', 
      icon: <Home size={20} /> 
    },
    { 
      path: '/history',
      label: 'History', 
      icon: <Calendar size={20} /> 
    },
    { 
      path: '/stats',
      label: 'Stats', 
      icon: <BarChart size={20} /> 
    },
    { 
      path: '/profile',
      label: 'Profile', 
      icon: <UserCircle size={20} /> 
    }
  ];

  const handleNavigation = (path: string) => {
    // This is a simple implementation. In a real app, you'd use a router.
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 py-2 px-4">
      <div className="container mx-auto">
        <ul className="flex justify-around">
          {navItems.map(item => (
            <li key={item.path}>
              <button 
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center p-2 ${
                  currentPath === item.path 
                    ? 'text-pink-500' 
                    : 'text-gray-500 hover:text-pink-400'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;