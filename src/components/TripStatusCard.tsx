import { Link } from 'react-router-dom';
import { Trip, DateStatus } from '../types';
import { formatDateDisplay } from '../utils/dateUtils';

interface TripStatusCardProps {
  trip: Trip;
  dateStatus: DateStatus;
}

export function TripStatusCard({ trip, dateStatus }: TripStatusCardProps) {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  if (dateStatus.status === 'upcoming') {
    return (
      <div className="bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-blue-400/30 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="text-5xl md:text-6xl">📅</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              旅行尚未开始
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-4">
              {trip.name} 将在 <strong className="text-white">{formatDateDisplay(trip.startDate)}</strong> 开始
            </p>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 md:p-5 mb-4">
              <p className="text-blue-200 text-sm md:text-base mb-2">
                📍 今天是 {formatDateDisplay(today)}
              </p>
              <p className="text-blue-300 text-xl md:text-2xl font-bold">
                还有 {dateStatus.daysUntilStart} 天开始
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                to={`/trips/${trip.id}/day/1`}
                className="px-5 md:px-6 py-3 bg-blue-500/20 active:bg-blue-500/30 text-blue-300 rounded-xl border border-blue-500/30 transition-all text-sm min-h-[44px] flex items-center justify-center hover:bg-blue-500/30"
              >
                查看第一天行程
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (dateStatus.status === 'completed') {
    return (
      <div className="bg-gradient-to-br from-gray-500/20 via-slate-500/20 to-zinc-500/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-400/30 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="text-5xl md:text-6xl">✈️</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-400 to-slate-400 bg-clip-text text-transparent">
              旅行已结束
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-4">
              {trip.name} 已于 <strong className="text-white">{formatDateDisplay(trip.endDate)}</strong> 结束
            </p>
            <div className="bg-gray-500/20 border border-gray-500/30 rounded-xl p-4 md:p-5 mb-4">
              <p className="text-gray-200 text-sm md:text-base mb-2">
                📍 今天是 {formatDateDisplay(today)}
              </p>
              <p className="text-gray-300 text-xl md:text-2xl font-bold">
                已结束 {dateStatus.daysSinceEnd} 天
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                to={`/trips/${trip.id}/day/${trip.days.length}`}
                className="px-5 md:px-6 py-3 bg-gray-500/20 active:bg-gray-500/30 text-gray-300 rounded-xl border border-gray-500/30 transition-all text-sm min-h-[44px] flex items-center justify-center hover:bg-gray-500/30"
              >
                查看最后一天
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (dateStatus.status === 'active' && dateStatus.currentDay) {
    const currentDayInfo = trip.days.find(d => d.day === dateStatus.currentDay);
    return (
      <div className="bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-green-400/30 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="text-5xl md:text-6xl">🎉</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              旅行进行中
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-4">
              今天是 <strong className="text-white">{formatDateDisplay(today)}</strong>
            </p>
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 md:p-5 mb-4">
              <p className="text-green-200 text-sm md:text-base mb-2">
                📍 当前行程
              </p>
              <p className="text-green-300 text-xl md:text-2xl font-bold mb-2">
                Day {dateStatus.currentDay}
              </p>
              {currentDayInfo && (
                <p className="text-green-200 text-sm md:text-base">
                  {currentDayInfo.title}
                </p>
              )}
            </div>
            <Link
              to={`/trips/${trip.id}/day/${dateStatus.currentDay}`}
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 active:from-green-600 active:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all transform active:scale-95 text-sm md:text-base min-h-[44px] flex items-center justify-center hover:shadow-xl hover:shadow-green-500/30"
            >
              查看今天的详细行程 →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

