import { TripCard } from '../components/TripCard';
import { CurrentInfo } from '../components/CurrentInfo';
import { getAllTrips } from '../data/trips';

export function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl safe-area-top safe-area-bottom">
      <header className="text-center mb-12 md:mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-white tracking-tight">
          Nabi & Grace's
          <br />
          <span className="font-normal">Travel Plans</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg px-4 max-w-2xl mx-auto leading-relaxed">
          我们的旅行计划集合
        </p>
      </header>

      {/* Current Date, Location, and Weather */}
      <CurrentInfo />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        {getAllTrips().map((trip, index) => (
          <TripCard
            key={trip.id}
            trip={trip}
            animationDelay={index * 0.1}
          />
        ))}
        <div
          className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.08] border-dashed h-full flex flex-col items-center justify-center min-h-[400px] animate-stagger transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.04]"
          style={{ animationDelay: `${getAllTrips().length * 0.1}s` }}
        >
          <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/[0.10] flex items-center justify-center mb-4">
            <span className="text-2xl text-slate-400">➕</span>
          </div>
          <p className="text-slate-400 text-sm text-center font-medium">更多旅行计划<br />即将到来</p>
        </div>
      </div>

      <footer className="text-center text-slate-400 text-sm mt-16 mb-20 md:mb-8">
        <p>最后更新：2025 年 · 使用 React + TypeScript 构建</p>
      </footer>
    </div>
  );
}

