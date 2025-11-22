import { Link } from 'react-router-dom';
import { Trip } from '../types';
import { getTripStatus } from '../utils/dateUtils';
import { getCardBackgroundStyle } from '../utils/cardBackgrounds';

interface TripCardProps {
  trip: Trip;
  animationDelay?: number;
}

export function TripCard({ trip, animationDelay = 0 }: TripCardProps) {
  const status = getTripStatus(trip);
  const statusColor = 
    status.status === 'active' ? 'bg-green-500/20 text-green-300' :
    status.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
    'bg-gray-500/20 text-gray-300';

  const handleClick = (e: React.MouseEvent) => {
    // Add click animation
    const target = e.currentTarget;
    target.classList.add('card-click-animation');
    setTimeout(() => {
      target.classList.remove('card-click-animation');
    }, 300);
  };

  // Get beautiful background style
  const backgroundStyle = getCardBackgroundStyle(trip.imageUrl, 0);

  return (
    <Link
      to={`/trips/${trip.id}`}
      onClick={handleClick}
      className="group block animate-stagger h-full"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="bg-black/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/[0.2] h-full flex flex-col transition-all duration-500 hover:border-white/[0.3] hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
        {/* Image/Emoji Header with beautiful background */}
        <div 
          className="relative h-48 flex items-center justify-center overflow-hidden"
          style={backgroundStyle}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-black/30"></div>
          <span className="text-7xl md:text-8xl relative z-10 filter drop-shadow-2xl">{trip.emoji}</span>
          {/* Status badge - top right */}
          <span className={`absolute top-4 right-4 text-base px-4 py-2 rounded-full font-medium backdrop-blur-md ${statusColor} border border-white/20 shadow-lg z-20`}>
            {status.status === 'active' ? '进行中' : status.status === 'upcoming' ? '即将开始' : '已结束'}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Trip name */}
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white leading-tight">
            {trip.name}
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-base md:text-lg mb-5 flex-grow line-clamp-2 leading-relaxed">
            {trip.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-5"></div>

          {/* Info row */}
          <div className="flex items-center justify-between text-base text-slate-500 mb-5">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{trip.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{trip.dateRange.split(' – ')[0].split('/')[0]}/{trip.dateRange.split(' – ')[0].split('/')[1]}</span>
            </div>
          </div>

          {/* Tags - minimal design */}
          <div className="flex flex-wrap gap-2 mb-6">
            {trip.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-base text-slate-400 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                {tag}
              </span>
            ))}
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

