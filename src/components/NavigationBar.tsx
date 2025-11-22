import { Link } from 'react-router-dom';
import { useCurrentDate } from '../hooks/useCurrentDate';
import { getAllTrips } from '../data/trips';
import { getTripStatus } from '../utils/dateUtils';

export function NavigationBar() {
  const currentDate = useCurrentDate();
  const trips = getAllTrips();
  
  // Find active trip
  const activeTrip = trips.find(trip => {
    const status = getTripStatus(trip);
    return status.status === 'active';
  });

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/[0.1] safe-area-top">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Home Link */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-slate-200 transition-colors group"
          >
            <span className="text-xl md:text-2xl font-light">✈️</span>
            <span className="text-base md:text-lg font-medium hidden sm:inline">
              Travel Plans
            </span>
          </Link>

          {/* Center - Current Date */}
          {currentDate && (
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-300">
              <span className="text-slate-500">📅</span>
              <span>{currentDate}</span>
            </div>
          )}

          {/* Right - Quick Actions */}
          <div className="flex items-center gap-3">
            {activeTrip && (
              <Link
                to={`/trips/${activeTrip.id}`}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg border border-green-500/30 transition-all text-sm font-medium"
              >
                <span>🎉</span>
                <span>进行中</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

