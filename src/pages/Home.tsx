import { TripCard } from '../components/TripCard';
import { CurrentInfo } from '../components/CurrentInfo';
import { getAllTrips } from '../data/trips';

export function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl safe-area-top safe-area-bottom">
      <header className="text-center mb-8 md:mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 mexico-title mexico-flag-text animate-tech-pulse">
          ✈️ Nabi's Travel Plans
        </h1>
        <p className="text-slate-200 text-base md:text-lg lg:text-xl px-4 mexico-subtitle">
          我的个人旅行计划集合 · 点击卡片查看详细行程
        </p>
        <div className="mexico-divider mt-6"></div>
      </header>

      {/* Current Date, Location, and Weather */}
      <CurrentInfo />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
        {getAllTrips().map((trip, index) => (
          <TripCard
            key={trip.id}
            trip={trip}
            animationDelay={index * 0.1}
          />
        ))}
        <div
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 border-dashed h-full flex flex-col items-center justify-center min-h-[200px] animate-stagger hover-scale-glow"
          style={{ animationDelay: `${getAllTrips().length * 0.1}s` }}
        >
          <div className="text-4xl mb-4 opacity-50 animate-float">➕</div>
          <p className="text-slate-400 text-sm text-center">更多旅行计划<br />即将到来</p>
        </div>
      </div>

      <footer className="text-center text-slate-400 text-sm mt-16">
        <p>最后更新：2025 年 · 使用 React + TypeScript 构建</p>
      </footer>
    </div>
  );
}

