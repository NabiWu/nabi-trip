import { Link } from 'react-router-dom';
import { DayInfo } from '../types';
import { formatDateDisplay } from '../utils/dateUtils';

interface DayCardProps {
  tripId: string;
  day: DayInfo;
  animationDelay?: number;
}

const dayIcons = ['📅', '🏛️', '☕', '🚌', '🏔️', '🎨', '🔄', '✈️'];

export function DayCard({ tripId, day, animationDelay = 0 }: DayCardProps) {
  const icon = dayIcons[day.day - 1] || '📅';

  const handleClick = (e: React.MouseEvent) => {
    // Add click animation
    const target = e.currentTarget;
    target.classList.add('card-click-animation');
    setTimeout(() => {
      target.classList.remove('card-click-animation');
    }, 300);
  };

  return (
    <Link
      to={`/trips/${tripId}/day/${day.day}`}
      onClick={handleClick}
      className="group day-card bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 active:scale-95 animate-stagger h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden ripple-effect"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl md:text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{icon}</div>
          <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-200 px-3 py-1.5 rounded-full text-sm font-bold border border-pink-400/30 group-hover:border-pink-400/50 transition-colors">Day {day.day}</div>
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{formatDateDisplay(day.date)}</h3>
        <p className="text-slate-200 text-sm md:text-base mb-3 font-medium group-hover:text-white transition-colors">{day.title}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-purple-500/30 text-purple-200 px-2.5 py-1 rounded-lg border border-purple-400/30">{day.badge}</span>
        </div>
        <div className="text-slate-300 text-xs md:text-sm flex items-center gap-2 group-hover:text-purple-300 transition-colors">
          <span>🏨</span>
          <span>{day.accommodation}</span>
          <svg className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
}

