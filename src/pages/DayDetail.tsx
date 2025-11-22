import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getTripById } from '../data/trips';
import { formatDateDisplay, getDayByNumber } from '../utils/dateUtils';
import { LocationMap, MultiLocationMap } from '../components/LocationMap';
import type { Location } from '../types';

function renderLocation(item: string | Location) {
  if (typeof item === 'string') {
    return <span>{item}</span>;
  }
  return (
    <a
      href={item.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 underline"
    >
      {item.name}
    </a>
  );
}

export function DayDetail() {
  const { tripId, dayNumber } = useParams<{ tripId: string; dayNumber: string }>();
  const location = useLocation();
  const trip = tripId ? getTripById(tripId) : null;
  
  // Parse dayNumber with validation
  let dayNum: number | null = null;
  if (dayNumber) {
    const parsed = parseInt(dayNumber, 10);
    if (!isNaN(parsed) && parsed > 0) {
      dayNum = parsed;
    }
  }
  
  // Validate dayNum is within valid range and get the day
  let day = null;
  if (trip && dayNum && dayNum >= 1 && dayNum <= trip.days.length) {
    day = getDayByNumber(trip, dayNum);
    // Double-check that we found the day
    if (!day || day.day !== dayNum) {
      day = null;
    }
  }
  
  // Force re-render when route changes by using location.key
  // This ensures the component updates when navigating between days
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!trip) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl safe-area-top safe-area-bottom">
        <div className="text-center text-slate-300">
          <p>未找到该旅行计划</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            返回主页
          </Link>
        </div>
      </div>
    );
  }

  if (!day || !dayNum) {
    // Redirect to first day if invalid day number
    return (
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl safe-area-top safe-area-bottom">
        <div className="text-center text-slate-300">
          <p>未找到该日期信息</p>
          <p className="text-sm text-slate-500 mt-2">
            Day {dayNumber} 不存在，共有 {trip.days.length} 天
          </p>
          <div className="flex gap-3 justify-center mt-4">
            <Link to={`/trips/${tripId}`} className="text-blue-400 hover:text-blue-300">
              返回总览
            </Link>
            <Link to={`/trips/${tripId}/day/1`} className="text-blue-400 hover:text-blue-300">
              查看第一天
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate prev/next day with proper bounds checking
  const prevDay = dayNum > 1 ? dayNum - 1 : trip.days.length;
  const nextDay = dayNum < trip.days.length ? dayNum + 1 : 1;
  
  // Ensure prevDay and nextDay are valid
  const prevDayValid = prevDay >= 1 && prevDay <= trip.days.length;
  const nextDayValid = nextDay >= 1 && nextDay <= trip.days.length;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl safe-area-top safe-area-bottom">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <Link to={`/trips/${tripId}`} className="inline-flex items-center text-slate-300 hover:text-white transition-colors text-sm md:text-base min-h-[44px]">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回总览
        </Link>
        <div className="flex gap-3 sm:gap-2">
          {prevDayValid && (
            <Link 
              to={`/trips/${tripId}/day/${prevDay}`} 
              className="text-slate-400 hover:text-white active:text-white text-sm min-h-[44px] flex items-center px-2"
            >
              ← Day {prevDay}
            </Link>
          )}
          {prevDayValid && nextDayValid && (
            <span className="text-slate-600 hidden sm:inline">|</span>
          )}
          {nextDayValid && (
            <Link 
              to={`/trips/${tripId}/day/${nextDay}`} 
              className="text-slate-400 hover:text-white active:text-white text-sm min-h-[44px] flex items-center px-2"
            >
              Day {nextDay} →
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 relative overflow-hidden">
        <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
          <div className="flex-1">
            <div className="inline-block bg-pink-500/20 text-pink-300 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3">
              Day {day.day} · {day.badge}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{formatDateDisplay(day.date)}</h1>
            <h2 className="text-lg md:text-xl text-slate-300">{day.title}</h2>
          </div>
          <div className="text-left md:text-right">
            <div className="text-slate-400 text-xs md:text-sm mb-1">住宿</div>
            <div className="text-slate-200 font-medium text-sm md:text-base">{day.accommodation}</div>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="bg-white/5 rounded-lg p-4 md:p-5">
            <div className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <span className="text-xl">{day.transport.type.split(' ')[0]}</span>
              <span>交通</span>
            </div>
            <div className="text-slate-300 text-sm leading-relaxed">
              {day.transport.details && <>{day.transport.details}<br /></>}
              {day.transport.departure && (
                <>出发：{renderLocation(day.transport.departure)}<br /></>
              )}
              {day.transport.arrival && (
                <>抵达：{renderLocation(day.transport.arrival)}</>
              )}
              {!day.transport.details && !day.transport.departure && day.transport.type}
            </div>
          </div>

          {day.accommodationLink && (
            <div className="bg-white/5 rounded-lg p-4 md:p-5">
              <div className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <span className="text-xl">🏨</span>
                <span>住宿</span>
              </div>
              <div className="text-slate-300 text-sm">
                <a
                  href={day.accommodationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {day.accommodation}
                </a>
              </div>
              <LocationMap
                location={{ name: day.accommodation, mapsUrl: day.accommodationLink }}
                label="住宿"
              />
            </div>
          )}

          {day.attractions.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 md:p-5">
              <div className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <span className="text-xl">📍</span>
                <span>关键景点</span>
              </div>
              <div className="text-slate-300 text-sm">
                {day.attractions.map((item, idx) => (
                  <span key={idx}>
                    {renderLocation(item)}
                    {idx < day.attractions.length - 1 && '；'}
                  </span>
                ))}
              </div>
              <MultiLocationMap locations={day.attractions} title="关键景点" />
            </div>
          )}

          {day.dining.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 md:p-5">
              <div className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <span className="text-xl">🍽️</span>
                <span>餐饮建议</span>
              </div>
              <div className="text-slate-300 text-sm">
                {day.dining.map((item, idx) => (
                  <span key={idx}>
                    {renderLocation(item)}
                    {idx < day.dining.length - 1 && '；'}
                  </span>
                ))}
              </div>
              <MultiLocationMap locations={day.dining} title="餐饮建议" />
            </div>
          )}

          {day.note && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 md:p-4 text-amber-200 text-xs md:text-sm">
              💡 <strong>备注：</strong>{day.note}
            </div>
          )}
        </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6 md:mt-8">
        {prevDayValid && (
          <Link
            to={`/trips/${tripId}/day/${prevDay}`}
            className="flex-1 sm:flex-none px-4 py-3 bg-white/10 hover:bg-white/20 active:bg-white/15 rounded-lg border border-white/20 transition-all text-sm text-center min-h-[44px] flex items-center justify-center"
          >
            ← Day {prevDay}
          </Link>
        )}
        <Link
          to={`/trips/${tripId}`}
          className="flex-1 sm:flex-none px-4 py-3 bg-white/10 hover:bg-white/20 active:bg-white/15 rounded-lg border border-white/20 transition-all text-sm text-center min-h-[44px] flex items-center justify-center"
        >
          返回总览
        </Link>
        {nextDayValid && (
          <Link
            to={`/trips/${tripId}/day/${nextDay}`}
            className="flex-1 sm:flex-none px-4 py-3 bg-white/10 hover:bg-white/20 active:bg-white/15 rounded-lg border border-white/20 transition-all text-sm text-center min-h-[44px] flex items-center justify-center"
          >
            Day {nextDay} →
          </Link>
        )}
      </div>
    </div>
  );
}

