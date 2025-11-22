import { Link, useLocation } from 'react-router-dom';
import { useCurrentDate } from '../hooks/useCurrentDate';
import { getAllTrips } from '../data/trips';
import { getTripStatus } from '../utils/dateUtils';
import { classNames } from '../utils/classNames';
import { PlaneIcon, CalendarIcon, SparklesIcon } from './icons';

export function NavigationBar() {
  const currentDate = useCurrentDate();
  const trips = getAllTrips();
  const location = useLocation();
  
  // Find active trip
  const activeTrip = trips.find(trip => {
    const status = getTripStatus(trip);
    return status.status === 'active';
  });

  // Check if we're on DayDetail page
  const isDayDetailPage = location.pathname.includes('/day/');

  // Don't show on DayDetail page (it has its own header)
  if (isDayDetailPage) {
    return null;
  }

  return (
    <nav className={classNames(
      "sticky top-0 z-50 safe-area-top",
      "bg-gradient-to-b from-black/95 via-black/90 to-black/85",
      "backdrop-blur-xl border-b border-white/15",
      "shadow-xl shadow-black/30",
      "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-px",
      "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
    )}>
      <div className="container mx-auto px-4 py-3 md:py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo/Home Link - Enhanced */}
          <Link
            to="/"
            className={classNames(
              "group relative flex items-center gap-3 px-4 py-2 rounded-xl",
              "bg-gradient-to-r from-white/5 to-white/0",
              "hover:from-white/10 hover:to-white/5",
              "border border-white/10 hover:border-white/25",
              "transition-all duration-200",
              "shadow-md hover:shadow-lg active:scale-95"
            )}
          >
            <PlaneIcon className="w-6 h-6 md:w-7 md:h-7 text-white/90 group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <span className="text-base md:text-lg font-semibold hidden sm:inline text-white/90 group-hover:text-white transition-colors">
              Travel Plans
            </span>
          </Link>

          {/* Center - Current Date - Enhanced */}
          {currentDate && (
            <div className={classNames(
              "hidden md:flex items-center gap-2.5 px-5 py-2.5 rounded-xl",
              "bg-gradient-to-r from-white/5 via-white/3 to-white/5",
              "border border-white/10",
              "text-sm font-semibold text-white/80",
              "shadow-md backdrop-blur-sm"
            )}>
              <CalendarIcon className="w-4 h-4 text-white/70" />
              <span className="whitespace-nowrap">{currentDate}</span>
            </div>
          )}

          {/* Right - Quick Actions - Enhanced */}
          <div className="flex items-center gap-3">
            {activeTrip && (
              <Link
                to={`/trips/${activeTrip.id}`}
                className={classNames(
                  "hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl",
                  "bg-gradient-to-r from-green-500/25 via-emerald-500/25 to-teal-500/25",
                  "hover:from-green-500/35 hover:via-emerald-500/35 hover:to-teal-500/35",
                  "border border-green-400/40 hover:border-green-300/60",
                  "text-green-200 hover:text-green-100 transition-all duration-300",
                  "text-sm font-semibold shadow-lg hover:shadow-xl",
                  "hover:shadow-green-500/40 active:scale-95",
                  "group relative overflow-hidden",
                  "before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400/0 before:via-green-400/10 before:to-green-400/0",
                  "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                )}
              >
                <SparklesIcon className="w-4 h-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                <span className="relative z-10 whitespace-nowrap">进行中</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

