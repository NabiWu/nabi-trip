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
      className="group block animate-stagger h-full"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="bg-black/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/[0.2] h-full flex flex-col transition-all duration-500 hover:border-white/[0.3] hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
        {/* Header with icon */}
        <div className="relative h-32 bg-gradient-to-br from-slate-800/30 via-slate-900/20 to-slate-800/30 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <span className="text-5xl md:text-6xl relative z-10 filter drop-shadow-lg">{icon}</span>
          {/* Day badge */}
          <div className="absolute top-4 right-4 text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-md bg-white/[0.05] text-slate-300 border border-white/[0.10] shadow-lg z-20">
            Day {day.day}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-white leading-tight">
            {formatDateDisplay(day.date)}
          </h3>
          <p className="text-slate-400 text-sm md:text-base mb-4 flex-grow line-clamp-2 leading-relaxed">
            {day.title}
          </p>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-4"></div>

          {/* Badge */}
          <div className="mb-4">
            <span className="text-xs text-slate-400 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
              {day.badge}
            </span>
          </div>

          {/* Accommodation */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <span>🏨</span>
            <span className="truncate">{day.accommodation}</span>
          </div>

          {/* Bottom CTA */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
            <span className="text-sm text-slate-400 group-hover:text-white transition-colors font-medium">
              查看详情
            </span>
            <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-white/[0.1] flex items-center justify-center transition-all group-hover:translate-x-1">
              <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

