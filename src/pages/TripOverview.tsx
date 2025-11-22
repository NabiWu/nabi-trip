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
      <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        返回主页
      </Link>

      <header className="mb-8 md:mb-12 page-enter">
        <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-6 md:p-8 border-2 border-white/30 mexico-enhanced-gradient mexico-architectural-shadow hover-border-glow relative overflow-hidden group mexico-decorative-border mexico-cultural-glow">
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-white/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="mexico-shimmer absolute inset-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header with emoji and title */}
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 mexico-title mexico-flag-text animate-tech-pulse">
                  {trip.emoji} {trip.name}
                </h1>
                <p className="text-lg md:text-xl text-slate-200 mb-4 font-medium mexico-subtitle">{trip.description}</p>
              </div>
            </div>

            {/* Current Date and Weather Info */}
            {(currentDate || weather) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                {currentDate && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl md:text-3xl animate-float">📅</div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">当前日期</div>
                        <div className="text-sm md:text-base font-semibold text-white">{currentDate}</div>
                      </div>
                    </div>
                  </div>
                )}
                {weather && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl md:text-3xl animate-float" style={{ animationDelay: '0.2s' }}>{weather.icon}</div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">当前天气</div>
                        <div className="text-sm md:text-base font-semibold text-white">
                          {weather.temperature}°C · {weather.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Trip badges */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
              <span className="text-xs md:text-sm bg-purple-500/30 text-purple-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium border border-purple-400/30">{trip.dateRange}</span>
              <span className="text-xs md:text-sm bg-blue-500/30 text-blue-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium border border-blue-400/30">{trip.duration}</span>
              <span className="text-xs md:text-sm bg-pink-500/30 text-pink-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium border border-pink-400/30">{trip.tags.join(' / ')}</span>
            </div>
            <p className="text-slate-300 text-xs md:text-sm">点击下方日期卡片查看当天的详细行程</p>
          </div>
        </div>

        <TodayButton trip={trip} />
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {trip.days.map((day, index) => (
          <DayCard
            key={day.day}
            tripId={trip.id}
            day={day}
            animationDelay={index * 0.08}
          />
        ))}
      </main>

      <footer className="text-center text-slate-400 text-sm mt-12 mb-8">
        <p>最后更新：2025 年 · 点击日期卡片查看当天的详细行程</p>
      </footer>
    </div>
  );
}

