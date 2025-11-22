import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trip, DateStatus } from '../types';
import { getTripStatus } from '../utils/dateUtils';

interface TodayButtonProps {
  trip: Trip;
}

export function TodayButton({ trip }: TodayButtonProps) {
  const navigate = useNavigate();
  const dateStatus: DateStatus = useMemo(() => getTripStatus(trip), [trip]);

  const handleClick = () => {
    // 无论什么状态，都跳转到状态页面，让用户看到详细信息
    navigate(`/trips/${trip.id}/status`);
  };

  const getButtonText = () => {
    switch (dateStatus.status) {
      case 'active':
        return `查看今天 (Day ${dateStatus.currentDay})`;
      case 'upcoming':
        return `查看行程状态 (还有 ${dateStatus.daysUntilStart} 天)`;
      case 'completed':
        return `查看行程状态 (已结束 ${dateStatus.daysSinceEnd} 天)`;
      default:
        return '查看行程状态';
    }
  };

  const getButtonStyle = () => {
    switch (dateStatus.status) {
      case 'active':
        return 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700';
      case 'upcoming':
        return 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700';
      case 'completed':
        return 'from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700';
      default:
        return 'from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700';
    }
  };

  return (
    <div className="mt-4 md:mt-6 flex flex-col items-center gap-3 animate-slide-in-up">
      <button
        onClick={handleClick}
        className={`px-6 md:px-8 py-4 bg-gradient-to-r ${getButtonStyle()} text-white font-bold rounded-2xl shadow-2xl transition-all transform hover:scale-110 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-3 relative overflow-hidden group min-h-[56px] text-base md:text-lg border-2 border-white/30 hover:border-white/50`}
      >
        {/* Animated shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
        
        {/* Pulsing glow effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 animate-pulse"></span>
        
        <span className="relative z-10 flex items-center gap-3">
          <svg className="w-6 h-6 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span className="font-extrabold">{getButtonText()}</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </span>
      </button>
      <p className="text-slate-300 text-sm md:text-base text-center animate-fade-in font-medium" style={{ animationDelay: '0.2s', opacity: 0 }}>
        {dateStatus.message}
      </p>
    </div>
  );
}

