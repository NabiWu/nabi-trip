import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getTripById } from '../data/trips';
import { formatDateDisplay, getDayByNumber, getTripStatus } from '../utils/dateUtils';
import { LocationMap, MultiLocationMap } from '../components/LocationMap';
import { DayDetailNavigation } from '../components/DayDetailNavigation';
import { DayDetailHeader } from '../components/DayDetailHeader';
import { useSwipeWithFeedback } from '../hooks/useSwipeWithFeedback';
import { useImagePreload } from '../hooks/useImagePreload';
import { classNames } from '../utils/classNames';
import { BuildingIcon, MapPinIcon, UtensilsIcon, LightBulbIcon, PlaneIcon } from '../components/icons';
import type { Location } from '../types';
import type { DayInfo } from '../types';

/**
 * Get background image path based on day information
 * Uses the 8 images provided by user: 1.jpg to 8.jpg
 */
function getDayBackgroundImage(day: DayInfo): string {
  // Use day number directly to select the corresponding image (1.jpg to 8.jpg)
  // Ensure day number is between 1 and 8
  const dayNum = Math.min(Math.max(day.day, 1), 8);
  return `${dayNum}.jpg`;
}

/**
 * Header background component with location-based image
 * Uses lazy loading for better performance
 */
function HeaderBackground({ day }: { day: DayInfo }) {
  const backgroundImage = getDayBackgroundImage(day);
  const imageUrl = `/nabi-trip/images/${backgroundImage}`;
  
  // Preload next and previous day images for smooth navigation
  const nextDay = day.day < 8 ? day.day + 1 : 1;
  const prevDay = day.day > 1 ? day.day - 1 : 8;
  const preloadImages = [
    `/nabi-trip/images/${nextDay}.jpg`,
    `/nabi-trip/images/${prevDay}.jpg`,
  ];
  
  useImagePreload(preloadImages);
  
  return (
    <div 
      className="relative h-48 md:h-64 flex items-center justify-center overflow-hidden bg-slate-900"
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Very light gradient only at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      <div className="absolute top-6 left-6 z-10">
        <div className="text-sm font-medium text-white/90 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/30 shadow-xl">
          Day {day.day} <span className="text-white/60">·</span> <span className="text-white/80">{day.badge}</span>
        </div>
      </div>
    </div>
  );
}

function renderLocation(item: string | Location) {
  if (typeof item === 'string') {
    return <span className="text-white/90">{item}</span>;
  }
  return (
    <a
      href={item.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-blue-300 underline underline-offset-2 decoration-blue-400/50 hover:decoration-blue-400 transition-all font-medium"
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
  
  // Track previous day number for animation direction
  const prevDayNumRef = useRef<number | null>(null);
  
  // Force re-render when route changes by using location.key
  // This ensures the component updates when navigating between days
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    
    // Determine animation direction based on day change
    if (prevDayNumRef.current !== null && dayNum) {
      const direction = dayNum > prevDayNumRef.current ? 'right' : 'left';
      const contentElement = document.querySelector('.day-detail-content') as HTMLElement;
      if (contentElement) {
        contentElement.classList.remove('slide-in-left', 'slide-in-right');
        // Force reflow
        void contentElement.offsetWidth;
        contentElement.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');
      }
    }
    
    prevDayNumRef.current = dayNum;
  }, [location.pathname, dayNum]);

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

  // Enhanced swipe navigation with visual feedback
  const navigate = useNavigate();
  const { handlers: swipeHandlers, swipeState } = useSwipeWithFeedback({
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
    threshold: 60, // Reduced from 80 for easier triggering
    velocity: 0.15, // Reduced from 0.2 for easier triggering
    preventScroll: true,
  });

  // Calculate transform for swipe feedback
  const swipeTransform = swipeState.isSwiping && swipeState.deltaX !== 0
    ? `translateX(${swipeState.deltaX}px)`
    : undefined;
  
  const swipeOpacity = swipeState.isSwiping
    ? 1 - Math.min(0.3, Math.abs(swipeState.deltaX) / 200)
    : undefined;

  return (
    <div 
      className="container mx-auto px-4 py-6 md:py-8 max-w-4xl safe-area-top touch-pan-y relative"
      {...swipeHandlers}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 120px)' }}
    >
      {/* Header with Back Button and Today Button */}
      {tripId && (
        <DayDetailHeader
          tripId={tripId}
          showTodayButton={tripStatus.status === 'active' && tripStatus.currentDay !== undefined && !isToday}
          todayDay={tripStatus.currentDay || undefined}
        />
      )}

      <div 
        className={classNames(
          "day-detail-content bg-black/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/[0.2]",
          swipeState.isSwiping ? "transition-none swiping" : "transition-all duration-500 hover:border-white/[0.3]"
        )}
        style={{
          transform: swipeTransform,
          opacity: swipeOpacity,
        }}
      >
        {/* Header with location-based background */}
        <HeaderBackground day={day} />

        {/* Content */}
        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6 md:mb-8">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-3 md:mb-4 text-white tracking-tight">
                  {formatDateDisplay(day.date)}
                </h1>
                <h2 className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-normal">
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
              <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-slate-900/50 to-black/60 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-white/80 flex-shrink-0">
                  <BuildingIcon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-300/80 mb-2 uppercase tracking-wider font-medium">住宿</div>
                  <div className="text-lg font-semibold text-white">{day.accommodation}</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Transportation */}
            <div className="bg-gradient-to-br from-slate-900/50 to-black/60 rounded-2xl p-5 md:p-6 lg:p-7 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="text-white/80 flex-shrink-0">
                  <PlaneIcon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white/90 uppercase tracking-wider">交通</h3>
              </div>
              <div className="text-white/80 text-base md:text-lg leading-relaxed space-y-3">
                {day.transport.details && <p className="text-white">{day.transport.details}</p>}
                {day.transport.departure && (
                  <div className="flex items-start gap-2">
                    <span className="text-slate-300/80 font-medium flex-shrink-0">出发：</span>
                    <span className="text-white/90">{renderLocation(day.transport.departure)}</span>
                  </div>
                )}
                {day.transport.arrival && (
                  <div className="flex items-start gap-2">
                    <span className="text-slate-300/80 font-medium flex-shrink-0">抵达：</span>
                    <span className="text-white/90">{renderLocation(day.transport.arrival)}</span>
                  </div>
                )}
                {!day.transport.details && !day.transport.departure && (
                  <p className="text-white">{day.transport.type}</p>
                )}
              </div>
            </div>

            {/* Accommodation with link */}
            {day.accommodationLink && (
              <div className="bg-gradient-to-br from-slate-900/50 to-black/60 rounded-2xl p-5 md:p-6 lg:p-7 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="text-white/80 flex-shrink-0">
                    <BuildingIcon className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white/90 uppercase tracking-wider">住宿</h3>
                </div>
                <div className="text-lg font-semibold text-white mb-4">
                  <a
                    href={day.accommodationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300 underline underline-offset-2 decoration-blue-400/50 hover:decoration-blue-400 transition-all"
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
              <div className="bg-gradient-to-br from-slate-900/50 to-black/60 rounded-2xl p-5 md:p-6 lg:p-7 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="text-white/80 flex-shrink-0">
                    <MapPinIcon className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white/90 uppercase tracking-wider">关键景点</h3>
                </div>
                <div className="text-white/80 text-base md:text-lg mb-4 md:mb-5 leading-relaxed">
                  {day.attractions.map((item, idx) => (
                    <span key={idx}>
                      {renderLocation(item)}
                      {idx < day.attractions.length - 1 && <span className="text-white/40 mx-2">·</span>}
                    </span>
                  ))}
                </div>
                <MultiLocationMap locations={day.attractions} title="关键景点" />
              </div>
            )}

            {/* Dining */}
            {day.dining.length > 0 && (
              <div className="bg-gradient-to-br from-slate-900/50 to-black/60 rounded-2xl p-5 md:p-6 lg:p-7 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="text-white/80 flex-shrink-0">
                    <UtensilsIcon className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white/90 uppercase tracking-wider">餐饮建议</h3>
                </div>
                <div className="text-white/80 text-base md:text-lg mb-4 md:mb-5 leading-relaxed">
                  {day.dining.map((item, idx) => (
                    <span key={idx}>
                      {renderLocation(item)}
                      {idx < day.dining.length - 1 && <span className="text-white/40 mx-2">·</span>}
                    </span>
                  ))}
                </div>
                <MultiLocationMap locations={day.dining} title="餐饮建议" />
              </div>
            )}

            {/* Note */}
            {day.note && (
              <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 rounded-2xl p-4 md:p-5 lg:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="text-amber-300/80 flex-shrink-0">
                    <LightBulbIcon className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-amber-300/80 mb-2 uppercase tracking-wider font-medium">备注</div>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed">{day.note}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Return to overview button */}
      <div className="flex justify-center mt-8 md:mt-10 mb-20 md:mb-24">
        <Link
          to={`/trips/${tripId}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 text-base font-semibold text-white/80 hover:text-white shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回总览
        </Link>
      </div>

      {/* Floating Navigation Bar */}
      {tripId && (
        <DayDetailNavigation
          tripId={tripId}
          prevDay={prevDayValid ? prevDay : null}
          nextDay={nextDayValid ? nextDay : null}
          prevDayValid={prevDayValid}
          nextDayValid={nextDayValid}
          swipeState={swipeState}
        />
      )}
    </div>
  );
}

