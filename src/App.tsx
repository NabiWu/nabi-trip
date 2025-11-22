import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { TripOverview } from './pages/TripOverview';
import { DayDetail } from './pages/DayDetail';
import { TripStatus } from './pages/TripStatus';
import { NavigationBar } from './components/NavigationBar';
import { BottomNavigation } from './components/BottomNavigation';
import { getBackgroundForRoute } from './utils/backgroundImages';
import './App.css';

function AppRoutes() {
  const location = useLocation();
  
  useEffect(() => {
    // Add page transition class
    document.body.classList.add('page-transition');
    const timer = setTimeout(() => {
      document.body.classList.remove('page-transition');
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trips/:tripId" element={<TripOverview />} />
      <Route path="/trips/:tripId/status" element={<TripStatus />} />
      <Route 
        path="/trips/:tripId/day/:dayNumber" 
        element={<DayDetail key={location.pathname} />} 
      />
    </Routes>
  );
}

function DynamicBackground() {
  const location = useLocation();
  
  useEffect(() => {
    const appElement = document.querySelector('.mexico-background') as HTMLElement;
    if (!appElement) return;
    
    // Extract day number from route if it's a DayDetail page
    const pathMatch = location.pathname.match(/\/day\/(\d+)/);
    const dayNumber = pathMatch ? parseInt(pathMatch[1], 10) : undefined;
    
    // Get appropriate background gradient for current route
    const bgGradient = getBackgroundForRoute(location.pathname, dayNumber);
    
    appElement.setAttribute('data-bg-image', 'true');
    appElement.style.setProperty('--bg-image', bgGradient);
  }, [location.pathname]);
  
  return null;
}

function App() {
  return (
    <BrowserRouter basename="/nabi-trip">
      <div className="mexico-background text-white relative overflow-hidden mexico-cultural-bg">
        <DynamicBackground />
        
        {/* Cultural pattern overlay */}
        <div className="mexico-pattern-overlay"></div>
        
        {/* Floating orbs for depth */}
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        
        <div className="relative z-10">
          <NavigationBar />
          <AppRoutes />
          <BottomNavigation />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

