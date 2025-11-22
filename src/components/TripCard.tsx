import { Link } from 'react-router-dom';
import { Trip } from '../types';
import { getTripStatus } from '../utils/dateUtils';

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

  return (
    <Link
      to={`/trips/${trip.id}`}
      onClick={handleClick}
      className="group animate-stagger h-full ripple-effect"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="card-hover bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 active:scale-95 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden">
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-5xl md:text-6xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{trip.emoji}</span>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-3 py-1.5 rounded-full font-bold border ${statusColor} border-opacity-30 group-hover:border-opacity-50 transition-colors`}>
                {status.status === 'active' ? '进行中' : status.status === 'upcoming' ? '即将开始' : '已结束'}
              </span>
              <span className="text-xs text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                {trip.dateRange.split(' – ')[0].split('/')[0]}/{trip.dateRange.split(' – ')[0].split('/')[1]}
              </span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-purple-300 transition-colors mexico-gradient-text">
            {trip.name}
          </h2>
          <p className="text-slate-200 text-sm md:text-base mb-4 flex-grow font-medium group-hover:text-white transition-colors">
            {trip.description}<br />
            {trip.duration} · {trip.tags.join(' / ')}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {trip.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-purple-500/30 text-purple-200 px-2.5 py-1 rounded-lg border border-purple-400/30">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center text-sm md:text-base text-slate-300 group-hover:text-purple-300 transition-colors font-medium">
            <span>查看详情</span>
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

