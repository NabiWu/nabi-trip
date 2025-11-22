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

  const buttonColor = 
    dateStatus.status === 'active' ? 'bg-white/[0.08] hover:bg-white/[0.12] border-white/[0.15]' :
    dateStatus.status === 'upcoming' ? 'bg-white/[0.08] hover:bg-white/[0.12] border-white/[0.15]' :
    'bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.10]';

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <button
        onClick={handleClick}
        className={`px-6 md:px-8 py-4 ${buttonColor} text-white font-medium rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/50 flex items-center gap-3 group min-h-[56px] text-base md:text-lg`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>{getButtonText()}</span>
        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <p className="text-slate-400 text-sm text-center font-medium">
        {dateStatus.message}
      </p>
    </div>
  );
}

