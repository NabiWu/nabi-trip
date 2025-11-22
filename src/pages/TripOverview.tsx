import { useParams, Link } from 'react-router-dom';
import { DayCard } from '../components/DayCard';
import { TodayButton } from '../components/TodayButton';
import { getTripById } from '../data/trips';
import { useCurrentDate } from '../hooks/useCurrentDate';
import { useWeather } from '../hooks/useWeather';

export function TripOverview() {
  const { tripId } = useParams<{ tripId: string }>();
  const trip = tripId ? getTripById(tripId) : null;
  const currentDate = useCurrentDate();
  const weather = useWeather();

  if (!trip) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center text-slate-300">
          <p>未找到该旅行计划</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            返回主页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl safe-area-top safe-area-bottom">
      <Link 
        to="/" 
        className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        返回主页
      </Link>

      <header className="mb-12 md:mb-16">
        {/* Hero Section */}
        <div className="bg-black/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/[0.2] mb-8 transition-all duration-500 hover:border-white/[0.3]">
          {/* Header with large emoji */}
          <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-800/30 via-slate-900/20 to-slate-800/30 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <span className="text-9xl md:text-[12rem] relative z-10 filter drop-shadow-2xl">{trip.emoji}</span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-3 text-white tracking-tight">
                {trip.name}
              </h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-6">
                {trip.description}
              </p>
            </div>

            {/* Info Cards */}
            {(currentDate || weather) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentDate && (
                  <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-white/[0.2]">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📅</div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">当前日期</div>
                        <div className="text-base font-medium text-white">{currentDate}</div>
                      </div>
                    </div>
                  </div>
                )}
                {weather && (
                  <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-white/[0.2]">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{weather.icon}</div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">当前天气</div>
                        <div className="text-base font-medium text-white">
                          {weather.temperature}°C · {weather.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Trip metadata */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-xs text-slate-400 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                {trip.dateRange}
              </span>
              <span className="text-xs text-slate-400 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                {trip.duration}
              </span>
              {trip.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="text-xs text-slate-400 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <TodayButton trip={trip} />
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {trip.days.map((day, index) => (
          <DayCard
            key={day.day}
            tripId={trip.id}
            day={day}
            animationDelay={index * 0.08}
          />
        ))}
      </main>

      <footer className="text-center text-slate-500 text-sm mt-16 mb-8">
        <p>点击日期卡片查看当天的详细行程</p>
      </footer>
    </div>
  );
}

