import { Link, useLocation } from 'react-router-dom';
import { getAllTrips } from '../data/trips';
import { getTripStatus } from '../utils/dateUtils';
import { classNames } from '../utils/classNames';
import { typography, ui } from '../constants';

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
    <nav 
      className={classNames(
        'fixed bottom-0 left-0 right-0 md:hidden',
        'bg-black/95 backdrop-blur-xl',
        ui.border.default,
        'z-50'
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className={classNames('flex items-center justify-around px-2', ui.bottomNav.padding.container)}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={classNames(
              'flex flex-col items-center justify-center gap-0.5 rounded-lg min-w-[60px]',
              ui.bottomNav.padding.item,
              ui.transition.default,
              item.active
                ? 'bg-white/[0.08] text-white'
                : 'text-slate-400 active:text-slate-200'
            )}
          >
            <span className={classNames(typography.sizes.nav.icon, 'leading-none')}>
              {item.icon}
            </span>
            <span className={classNames(typography.sizes.nav.label, typography.weights.medium, typography.lineHeights.tight)}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

