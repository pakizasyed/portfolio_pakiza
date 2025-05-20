import React from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import { useLocation } from './hooks/useLocation';

// Add custom styles to index.css
import './index.css';

function App() {
  const { currentPath } = useLocation();
  
  // Simple routing
  const getPageComponent = () => {
    switch(currentPath) {
      case '/history':
        return <HistoryPage />;
      case '/stats':
        return <StatsPage />;
      case '/profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };
  
  return (
    <Layout>
      {getPageComponent()}
    </Layout>
  );
}

export default App;