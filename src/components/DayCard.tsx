import { Link } from 'react-router-dom';
import { DayInfo } from '../types';
import { formatDateDisplay } from '../utils/dateUtils';
import { useImagePreload } from '../hooks/useImagePreload';

interface DayCardProps {
  tripId: string;
  day: DayInfo;
  animationDelay?: number;
}

export function DayCard({ tripId, day, animationDelay = 0 }: DayCardProps) {
  // Get background image based on day number (1.jpg to 8.jpg)
  const dayNum = Math.min(Math.max(day.day, 1), 8);
  const backgroundImage = `${dayNum}.jpg`;
  const imageUrl = `/nabi-trip/images/${backgroundImage}`;

  // Preload images for first 3 cards (most visible on page load)
  // Always call hook, but only pass images for first 3 days
  useImagePreload(dayNum <= 3 ? [imageUrl] : []);

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
        {/* Header with beautiful background */}
        <div 
          className="relative h-32 flex items-center justify-center overflow-hidden bg-slate-900"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Very light gradient only at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          {/* Day badge */}
          <div className="absolute top-4 right-4 text-base px-4 py-2 rounded-full font-medium backdrop-blur-md bg-black/60 text-white border border-white/30 shadow-lg z-20">
            Day {day.day}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white leading-tight">
            {formatDateDisplay(day.date)}
          </h3>
          <p className="text-slate-400 text-base md:text-lg mb-4 flex-grow line-clamp-2 leading-relaxed">
            {day.title}
          </p>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-4"></div>

          {/* Badge */}
          <div className="mb-4">
            <span className="text-base text-slate-400 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
              {day.badge}
            </span>
          </div>

          {/* Accommodation */}
          <div className="flex items-center gap-2 text-base text-slate-500 mb-4">
            <span className="truncate">{day.accommodation}</span>
          </div>

          {/* Bottom CTA */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
            <span className="text-base text-slate-400 group-hover:text-white transition-colors font-medium">
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

