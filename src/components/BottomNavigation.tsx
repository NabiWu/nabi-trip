import { Link, useLocation } from 'react-router-dom';
import { getAllTrips } from '../data/trips';
import { getTripStatus } from '../utils/dateUtils';

export function BottomNavigation() {
  const location = useLocation();
  const trips = getAllTrips();
  
  // Find active trip and current day
  const activeTrip = trips.find(trip => {
    const status = getTripStatus(trip);
    return status.status === 'active';
  });

  const activeTripStatus = activeTrip ? getTripStatus(activeTrip) : null;
  const currentDay = activeTripStatus?.status === 'active' ? activeTripStatus.currentDay : null;

  const navItems = [
    {
      path: '/',
      label: '主页',
      icon: '🏠',
      active: location.pathname === '/',
    },
    ...(activeTrip && currentDay
      ? [
          {
            path: `/trips/${activeTrip.id}`,
            label: '行程',
            icon: '📅',
            active: location.pathname.startsWith(`/trips/${activeTrip.id}`) && !location.pathname.includes('/day/'),
          },
          {
            path: `/trips/${activeTrip.id}/day/${currentDay}`,
            label: '今天',
            icon: '🎉',
            active: location.pathname === `/trips/${activeTrip.id}/day/${currentDay}`,
          },
        ]
      : []),
  ];

  // Only show on mobile
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/[0.1] safe-area-bottom md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[60px] ${
              item.active
                ? 'bg-white/[0.1] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

