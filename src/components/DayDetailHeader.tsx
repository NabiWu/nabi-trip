import { Link } from 'react-router-dom';
import { classNames } from '../utils/classNames';
import { SparklesIcon } from './icons';

interface DayDetailHeaderProps {
  tripId: string;
  showTodayButton?: boolean;
  todayDay?: number;
}

export function DayDetailHeader({ tripId, showTodayButton = false, todayDay }: DayDetailHeaderProps) {
  return (
    <div className="mb-6 md:mb-8 animate-fade-in">
      {/* Floating Header Card - Modern Design */}
      <div className={classNames(
        "relative overflow-hidden",
        "bg-gradient-to-br from-black/90 via-black/80 to-black/90",
        "backdrop-blur-xl rounded-2xl",
        "border border-white/15 shadow-2xl",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:via-transparent before:to-white/5",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
      )}>
        <div className="relative z-10 flex items-center justify-between px-3 py-2 md:px-4 md:py-2.5 gap-3">
          {/* Back Button - Elegant */}
          <Link 
            to={`/trips/${tripId}`} 
            className={classNames(
              "group flex items-center gap-2 px-3 py-2 rounded-lg",
              "bg-gradient-to-r from-white/5 to-white/0",
              "hover:from-white/10 hover:to-white/5",
              "border border-white/10 hover:border-white/25",
              "transition-all duration-200 text-xs font-semibold",
              "text-white/90 hover:text-white active:scale-95",
              "shadow-md hover:shadow-lg"
            )}
          >
            <svg 
              className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2.5" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="hidden sm:inline whitespace-nowrap">返回总览</span>
            <span className="sm:hidden whitespace-nowrap">返回</span>
          </Link>

          {/* Center Spacer */}
          <div className="flex-1 min-w-0"></div>

          {/* Today Button - Eye-catching */}
          {showTodayButton && todayDay && (
            <Link
              to={`/trips/${tripId}/day/${todayDay}`}
              className={classNames(
                "group relative flex items-center gap-1.5 px-3 py-2 rounded-lg",
                "bg-gradient-to-r from-green-500/25 via-emerald-500/25 to-teal-500/25",
                "hover:from-green-500/35 hover:via-emerald-500/35 hover:to-teal-500/35",
                "border border-green-400/40 hover:border-green-300/60",
                "transition-all duration-300 text-xs font-semibold",
                "text-green-200 hover:text-green-100",
                "shadow-lg hover:shadow-xl hover:shadow-green-500/40",
                "active:scale-95 overflow-hidden",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400/0 before:via-green-400/10 before:to-green-400/0",
                "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              )}
            >
              <SparklesIcon className="w-3.5 h-3.5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10" />
              <span className="hidden sm:inline relative z-10">今天</span>
              <span className="hidden sm:inline text-green-300/50 relative z-10">·</span>
              <span className="hidden sm:inline text-green-300/70 relative z-10">Day {todayDay}</span>
              <span className="sm:hidden relative z-10">今天</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

