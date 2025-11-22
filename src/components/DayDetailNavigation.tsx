import { Link } from 'react-router-dom';
import { classNames } from '../utils/classNames';

interface DayDetailNavigationProps {
  tripId: string;
  prevDay: number | null;
  nextDay: number | null;
  prevDayValid: boolean;
  nextDayValid: boolean;
  swipeState?: {
    isSwiping: boolean;
    deltaX: number;
    progress: number;
  };
  showSwipeHint?: boolean;
}

export function DayDetailNavigation({
  tripId,
  prevDay,
  nextDay,
  prevDayValid,
  nextDayValid,
  swipeState,
  showSwipeHint = true,
}: DayDetailNavigationProps) {
  const isSwiping = swipeState?.isSwiping || false;
  const swipeProgress = swipeState?.progress || 0;

  return (
    <>
      {/* Floating Navigation Bar - Mobile */}
      <div className="md:hidden fixed bottom-20 left-3 right-3 z-45" style={{ bottom: 'calc(3rem + 1rem + env(safe-area-inset-bottom, 0px))' }}>
        <div className="bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Swipe progress indicator */}
          {isSwiping && (
            <div className="h-1 bg-white/10 relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-150"
              style={{ 
                width: `${swipeProgress * 100}%`,
                marginLeft: (swipeState?.deltaX ?? 0) > 0 ? 'auto' : '0',
                marginRight: (swipeState?.deltaX ?? 0) < 0 ? 'auto' : '0',
              }}
              />
            </div>
          )}

          {/* Navigation content */}
          <div className="p-2.5">
            {/* Swipe hint */}
            {showSwipeHint && !isSwiping && (
              <div className="text-center mb-2 px-2">
                <p className="text-[10px] text-slate-300/70 font-medium flex items-center justify-center gap-1">
                  <span className="inline-block text-slate-400 animate-pulse">←</span>
                  <span>左右滑动切换</span>
                  <span className="inline-block text-slate-400 animate-pulse">→</span>
                </p>
              </div>
            )}

            {/* Active swipe direction hint */}
            {isSwiping && swipeState && (
              <div className="text-center mb-2 px-2">
                <p className="text-xs text-white font-semibold flex items-center justify-center gap-1.5">
                  {(swipeState.deltaX ?? 0) > 0 ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      <span className="text-blue-300">上一日</span>
                    </>
                  ) : (
                    <>
                      <span className="text-blue-300">下一日</span>
                      <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-2">
              {prevDayValid && prevDay && (
                <Link
                  to={`/trips/${tripId}/day/${prevDay}`}
                  className={classNames(
                    "flex-1 flex items-center justify-center gap-1.5 px-3 py-2",
                    "bg-gradient-to-r from-slate-800/60 to-black/60 hover:from-slate-700/70 hover:to-black/70",
                    "rounded-lg border border-white/15 hover:border-white/30",
                    "transition-all duration-200 text-xs font-semibold text-white",
                    "active:scale-95 shadow-lg hover:shadow-xl hover:shadow-white/5",
                    "group"
                  )}
                >
                  <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  <span className="hidden sm:inline">Day {prevDay}</span>
                  <span className="sm:hidden">上</span>
                </Link>
              )}

              {nextDayValid && nextDay && (
                <Link
                  to={`/trips/${tripId}/day/${nextDay}`}
                  className={classNames(
                    "flex-1 flex items-center justify-center gap-1.5 px-3 py-2",
                    "bg-gradient-to-r from-black/60 to-slate-800/60 hover:from-black/70 hover:to-slate-700/70",
                    "rounded-lg border border-white/15 hover:border-white/30",
                    "transition-all duration-200 text-xs font-semibold text-white",
                    "active:scale-95 shadow-lg hover:shadow-xl hover:shadow-white/5",
                    "group"
                  )}
                >
                  <span className="hidden sm:inline">Day {nextDay}</span>
                  <span className="sm:hidden">下</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              )}

              {(!prevDayValid && !nextDayValid) && (
                <div className="flex-1 flex items-center justify-center py-2">
                  <p className="text-[10px] text-slate-400 font-medium">仅有一天</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Fixed at bottom */}
      <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-45 gap-3 items-center">
        <div className="bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl px-8 py-5 flex items-center gap-6">
          {prevDayValid && prevDay && (
            <Link
              to={`/trips/${tripId}/day/${prevDay}`}
              className={classNames(
                "flex items-center gap-2 px-5 py-2.5",
                "bg-gradient-to-r from-slate-800/50 to-black/50 hover:from-slate-700/60 hover:to-black/60",
                "rounded-xl border border-white/10 hover:border-white/30",
                "transition-all duration-300 text-sm font-semibold text-white",
                "hover:shadow-lg hover:shadow-white/5 group"
              )}
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Day {prevDay}
            </Link>
          )}

          <div className="h-8 w-px bg-white/10"></div>

          <div className="px-4 py-2 text-xs text-slate-300/70 font-medium whitespace-nowrap">
            <span className="text-slate-400">←</span> 左右滑动切换 <span className="text-slate-400">→</span>
          </div>

          <div className="h-8 w-px bg-white/10"></div>

          {nextDayValid && nextDay && (
            <Link
              to={`/trips/${tripId}/day/${nextDay}`}
              className={classNames(
                "flex items-center gap-2 px-5 py-2.5",
                "bg-gradient-to-r from-black/50 to-slate-800/50 hover:from-black/60 hover:to-slate-700/60",
                "rounded-xl border border-white/10 hover:border-white/30",
                "transition-all duration-300 text-sm font-semibold text-white",
                "hover:shadow-lg hover:shadow-white/5 group"
              )}
            >
              Day {nextDay}
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

