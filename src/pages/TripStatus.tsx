import { useParams, Link } from 'react-router-dom';
import { getTripById } from '../data/trips';
import { getTripStatus, formatDateDisplay } from '../utils/dateUtils';
import type { DateStatus } from '../types';

export function TripStatus() {
  const { tripId } = useParams<{ tripId: string }>();
  const trip = tripId ? getTripById(tripId) : null;

  if (!trip) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center text-slate-300">
          <p>未找到该旅行计划</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            返回主页
          </Link>
        </div>
      </div>
    );
  }

  const dateStatus: DateStatus = getTripStatus(trip);
  // Use local timezone for today's date
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl safe-area-top safe-area-bottom">
      <Link to={`/trips/${tripId}`} className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        返回总览
      </Link>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 text-center">
        {dateStatus.status === 'upcoming' && (
          <>
            <div className="text-5xl md:text-6xl mb-4 md:mb-6">📅</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              旅行尚未开始
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-4 md:mb-6">
              {trip.name} 将在 <strong className="text-white">{formatDateDisplay(trip.startDate)}</strong> 开始
            </p>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
              <p className="text-blue-200 text-base md:text-lg mb-2">
                📍 今天是 {formatDateDisplay(today)}
              </p>
              <p className="text-blue-300 text-xl md:text-2xl font-bold">
                还有 {dateStatus.daysUntilStart} 天开始
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                to={`/trips/${tripId}`}
                className="px-5 md:px-6 py-3 bg-white/10 active:bg-white/20 rounded-lg border border-white/20 transition-all text-sm min-h-[44px] flex items-center justify-center"
              >
                查看完整行程
              </Link>
              <Link
                to={`/trips/${tripId}/day/1`}
                className="px-5 md:px-6 py-3 bg-blue-500/20 active:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-500/30 transition-all text-sm min-h-[44px] flex items-center justify-center"
              >
                查看第一天行程
              </Link>
            </div>
          </>
        )}

        {dateStatus.status === 'completed' && (
          <>
            <div className="text-5xl md:text-6xl mb-4 md:mb-6">✈️</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-400 to-slate-400 bg-clip-text text-transparent">
              旅行已结束
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-4 md:mb-6">
              {trip.name} 已于 <strong className="text-white">{formatDateDisplay(trip.endDate)}</strong> 结束
            </p>
            <div className="bg-gray-500/20 border border-gray-500/30 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
              <p className="text-gray-200 text-base md:text-lg mb-2">
                📍 今天是 {formatDateDisplay(today)}
              </p>
              <p className="text-gray-300 text-xl md:text-2xl font-bold">
                已结束 {dateStatus.daysSinceEnd} 天
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                to={`/trips/${tripId}`}
                className="px-5 md:px-6 py-3 bg-white/10 active:bg-white/20 rounded-lg border border-white/20 transition-all text-sm min-h-[44px] flex items-center justify-center"
              >
                查看完整行程
              </Link>
              <Link
                to={`/trips/${tripId}/day/${trip.days.length}`}
                className="px-5 md:px-6 py-3 bg-gray-500/20 active:bg-gray-500/30 text-gray-300 rounded-lg border border-gray-500/30 transition-all text-sm min-h-[44px] flex items-center justify-center"
              >
                查看最后一天
              </Link>
            </div>
          </>
        )}

        {dateStatus.status === 'active' && dateStatus.currentDay && (
          <>
            <div className="text-5xl md:text-6xl mb-4 md:mb-6">🎉</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              旅行进行中
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-4 md:mb-6">
              今天是 <strong className="text-white">{formatDateDisplay(today)}</strong>
            </p>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
              <p className="text-green-200 text-base md:text-lg mb-2">
                📍 当前行程
              </p>
              <p className="text-green-300 text-xl md:text-2xl font-bold mb-2">
                Day {dateStatus.currentDay}
              </p>
              <p className="text-green-200 text-xs md:text-sm">
                {trip.days.find(d => d.day === dateStatus.currentDay)?.title}
              </p>
            </div>
            <Link
              to={`/trips/${tripId}/day/${dateStatus.currentDay}`}
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 active:from-green-600 active:to-emerald-700 text-white font-semibold rounded-full shadow-lg transition-all transform active:scale-95 text-sm md:text-base min-h-[44px] flex items-center justify-center"
            >
              查看今天的详细行程 →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

