import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getTripById } from '../data/trips';
import { formatDateDisplay, getDayByNumber, getTripStatus } from '../utils/dateUtils';
import { LocationMap, MultiLocationMap } from '../components/LocationMap';
import { useSwipe } from '../hooks/useSwipe';
import type { Location } from '../types';

function renderLocation(item: string | Location) {
  if (typeof item === 'string') {
    return <span className="text-slate-300">{item}</span>;
  }
  return (
    <a
      href={item.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-slate-300 underline transition-colors"
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
          <p className="text-lg">未找到该旅行计划</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block text-base">
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
          <p className="text-lg">未找到该日期信息</p>
          <p className="text-base text-slate-500 mt-2">
            Day {dayNumber} 不存在，共有 {trip.days.length} 天
          </p>
          <div className="flex gap-3 justify-center mt-4">
            <Link to={`/trips/${tripId}`} className="text-blue-400 hover:text-blue-300 text-base">
              返回总览
            </Link>
            <Link to={`/trips/${tripId}/day/1`} className="text-blue-400 hover:text-blue-300 text-base">
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

  // Get trip status to check if we can show "Back to Today" button
  const tripStatus = getTripStatus(trip);
  const isToday = tripStatus.status === 'active' && tripStatus.currentDay === dayNum;

  // Swipe navigation for mobile
  const navigate = useNavigate();
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (nextDayValid) {
        navigate(`/trips/${tripId}/day/${nextDay}`);
      }
    },
    onSwipeRight: () => {
      if (prevDayValid) {
        navigate(`/trips/${tripId}/day/${prevDay}`);
      }
    },
    threshold: 80, // Minimum swipe distance
    velocity: 0.2, // Minimum swipe velocity
  });

  return (
    <div 
      className="container mx-auto px-4 py-6 md:py-8 max-w-4xl safe-area-top safe-area-bottom touch-pan-y"
      {...swipeHandlers}
    >
      <div className="mb-6 md:mb-8">
        <Link 
          to={`/trips/${tripId}`} 
          className="inline-flex items-center text-slate-400 hover:text-white active:text-slate-200 transition-colors text-base font-medium min-h-[44px]"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回总览
        </Link>
      </div>
      
      {/* Swipe hint for mobile */}
      <div className="md:hidden mb-4 text-center">
        <p className="text-base text-slate-500">左右滑动切换日期</p>
      </div>

      {/* Back to Today Button - Only show if not on today */}
      {tripStatus.status === 'active' && tripStatus.currentDay && !isToday && (
        <div className="mb-6 animate-fade-in">
          <Link
            to={`/trips/${tripId}/day/${tripStatus.currentDay}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-xl border border-green-500/30 transition-all text-base font-medium"
          >
            <span>🎉</span>
            <span>回到今天 (Day {tripStatus.currentDay})</span>
          </Link>
        </div>
      )}

      <div className="bg-black/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/[0.2] transition-all duration-500 hover:border-white/[0.3]">
        {/* Header */}
        <div className="relative h-48 md:h-64 bg-gradient-to-br from-slate-800/30 via-slate-900/20 to-slate-800/30 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-6 left-6">
            <div className="text-base text-slate-400 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] backdrop-blur-md">
              Day {day.day} · {day.badge}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6 md:mb-8">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-3 md:mb-4 text-white tracking-tight">
                  {formatDateDisplay(day.date)}
                </h1>
                <h2 className="text-lg md:text-xl lg:text-2xl text-slate-200 leading-relaxed">
                  {day.title}
                </h2>
              </div>
              {/* Share button for mobile */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${day.title} - ${formatDateDisplay(day.date)}`,
                      text: `查看 ${trip.name} 的行程：${day.title}`,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    alert('链接已复制到剪贴板');
                  }
                }}
                className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="分享"
              >
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
              </button>
            </div>
            
            {/* Accommodation */}
            {day.accommodation && (
              <div className="flex items-start gap-3 p-4 bg-black/60 rounded-2xl border border-white/[0.2]">
                <span className="text-2xl">🏨</span>
                <div className="flex-1">
                  <div className="text-base text-slate-200 mb-2 uppercase tracking-wider">住宿</div>
                  <div className="text-lg font-medium text-white">{day.accommodation}</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Transportation */}
            <div className="bg-black/60 rounded-2xl p-4 md:p-5 lg:p-6 border border-white/[0.2]">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">{day.transport.type.split(' ')[0]}</span>
                <h3 className="text-base md:text-lg font-semibold text-white uppercase tracking-wider">交通</h3>
              </div>
              <div className="text-slate-200 text-base md:text-lg leading-relaxed space-y-2">
                {day.transport.details && <p>{day.transport.details}</p>}
                {day.transport.departure && (
                  <p className="flex items-start gap-2">
                    <span className="text-slate-300">出发：</span>
                    <span>{renderLocation(day.transport.departure)}</span>
                  </p>
                )}
                {day.transport.arrival && (
                  <p className="flex items-start gap-2">
                    <span className="text-slate-300">抵达：</span>
                    <span>{renderLocation(day.transport.arrival)}</span>
                  </p>
                )}
                {!day.transport.details && !day.transport.departure && (
                  <p>{day.transport.type}</p>
                )}
              </div>
            </div>

            {/* Accommodation with link */}
            {day.accommodationLink && (
              <div className="bg-black/60 rounded-2xl p-4 md:p-5 lg:p-6 border border-white/[0.2]">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <span className="text-xl md:text-2xl">🏨</span>
                  <h3 className="text-base md:text-lg font-semibold text-white uppercase tracking-wider">住宿</h3>
                </div>
                <div className="text-slate-200 text-base mb-4">
                  <a
                    href={day.accommodationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-slate-300 underline transition-colors"
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

            {/* Attractions */}
            {day.attractions.length > 0 && (
              <div className="bg-black/60 rounded-2xl p-4 md:p-5 lg:p-6 border border-white/[0.2]">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <span className="text-xl md:text-2xl">📍</span>
                  <h3 className="text-base md:text-lg font-semibold text-white uppercase tracking-wider">关键景点</h3>
                </div>
                <div className="text-slate-200 text-base md:text-lg mb-3 md:mb-4 leading-relaxed">
                  {day.attractions.map((item, idx) => (
                    <span key={idx}>
                      {renderLocation(item)}
                      {idx < day.attractions.length - 1 && ' · '}
                    </span>
                  ))}
                </div>
                <MultiLocationMap locations={day.attractions} title="关键景点" />
              </div>
            )}

            {/* Dining */}
            {day.dining.length > 0 && (
              <div className="bg-black/60 rounded-2xl p-4 md:p-5 lg:p-6 border border-white/[0.2]">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <span className="text-xl md:text-2xl">🍽️</span>
                  <h3 className="text-base md:text-lg font-semibold text-white uppercase tracking-wider">餐饮建议</h3>
                </div>
                <div className="text-slate-200 text-base md:text-lg mb-3 md:mb-4 leading-relaxed">
                  {day.dining.map((item, idx) => (
                    <span key={idx}>
                      {renderLocation(item)}
                      {idx < day.dining.length - 1 && ' · '}
                    </span>
                  ))}
                </div>
                <MultiLocationMap locations={day.dining} title="餐饮建议" />
              </div>
            )}

            {/* Note */}
            {day.note && (
              <div className="bg-black/60 border border-white/[0.2] rounded-2xl p-3 md:p-4 lg:p-5">
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-lg md:text-xl">💡</span>
                  <div className="flex-1">
                    <div className="text-base text-slate-200 mb-2 uppercase tracking-wider">备注</div>
                    <p className="text-white text-base md:text-lg leading-relaxed">{day.note}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6 md:mt-8 mb-20 md:mb-8">
        {prevDayValid && (
          <Link
            to={`/trips/${tripId}/day/${prevDay}`}
            className="flex-1 sm:flex-none px-5 py-3 bg-black/30 hover:bg-black/50 rounded-2xl border border-white/[0.12] hover:border-white/[0.2] transition-all duration-300 text-base text-center font-medium text-white hover:text-white flex items-center justify-center gap-2"
            >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Day {prevDay}
          </Link>
        )}
        <Link
          to={`/trips/${tripId}`}
          className="flex-1 sm:flex-none px-5 py-3 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 text-base text-center font-medium text-slate-300 hover:text-white flex items-center justify-center"
        >
          返回总览
        </Link>
        {nextDayValid && (
          <Link
            to={`/trips/${tripId}/day/${nextDay}`}
            className="flex-1 sm:flex-none px-5 py-3 bg-black/30 hover:bg-black/50 rounded-2xl border border-white/[0.12] hover:border-white/[0.2] transition-all duration-300 text-base text-center font-medium text-white hover:text-white flex items-center justify-center gap-2"
          >
            Day {nextDay}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

