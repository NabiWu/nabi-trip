import { useCurrentDate } from '../hooks/useCurrentDate';
import { useLocationAndWeather } from '../hooks/useLocationAndWeather';

export function CurrentInfo() {
  const date = useCurrentDate();
  const { location, weather, loading, error, permissionStatus } = useLocationAndWeather();

  if (loading) {
    return (
      <div className="mb-8 animate-fade-in">
        <div className="bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 mexico-gradient-bg">
          <div className="flex items-center justify-center gap-3">
            <div className="mexico-spinner w-6 h-6 border-3"></div>
            <span className="text-slate-200 text-sm md:text-base font-medium">正在加载实时信息...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Current Date Card */}
        <div 
          className="bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 relative overflow-hidden group animate-stagger"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-3xl md:text-4xl animate-float" style={{ animationDelay: '0s' }}>📅</div>
              <div className="flex-1">
                <div className="text-xs text-green-300/80 mb-2 font-medium uppercase tracking-wider">当前日期</div>
                <div className="text-lg md:text-xl font-bold text-white">{date}</div>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-green-500/50 via-emerald-400/50 to-teal-400/50 rounded-full"></div>
          </div>
        </div>

        {/* Location Card */}
        {location ? (
          <div 
            className="bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group animate-stagger"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-3xl md:text-4xl animate-float" style={{ animationDelay: '0.2s' }}>📍</div>
                <div className="flex-1">
                  <div className="text-xs text-blue-300/80 mb-2 font-medium uppercase tracking-wider">当前位置</div>
                  <div className="text-lg md:text-xl font-bold text-white">
                    {location.city}
                    {location.country && location.country !== location.city && (
                      <span className="text-blue-300/70 text-sm md:text-base ml-1 font-normal">, {location.country}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-500/50 via-indigo-400/50 to-purple-400/50 rounded-full"></div>
            </div>
          </div>
        ) : error && permissionStatus === 'denied' ? (
          <div 
            className="bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-amber-400/30 relative overflow-hidden animate-stagger"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl md:text-4xl">📍</div>
              <div className="flex-1">
                <div className="text-xs text-amber-300/80 mb-2 font-medium uppercase tracking-wider">当前位置</div>
                <div className="text-sm text-amber-300">需要位置权限</div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Weather Card */}
        {weather ? (
          <div 
            className="bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-pink-400/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/20 relative overflow-hidden group animate-stagger"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-pink-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-3xl md:text-4xl animate-float" style={{ animationDelay: '0.4s' }}>{weather.icon}</div>
                <div className="flex-1">
                  <div className="text-xs text-pink-300/80 mb-2 font-medium uppercase tracking-wider">当前天气</div>
                  <div className="text-lg md:text-xl font-bold text-white">
                    <span className="text-2xl md:text-3xl">{weather.temperature}</span>
                    <span className="text-base md:text-lg text-pink-300/70">°C</span>
                    <span className="text-sm md:text-base text-pink-300/60 ml-2 font-normal">· {weather.description}</span>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-pink-500/50 via-rose-400/50 to-orange-400/50 rounded-full"></div>
            </div>
          </div>
        ) : permissionStatus === 'granted' ? (
          <div 
            className="bg-gradient-to-br from-slate-500/20 via-gray-500/20 to-zinc-500/20 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-slate-400/30 relative overflow-hidden animate-stagger"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl md:text-4xl">🌤️</div>
              <div className="flex-1">
                <div className="text-xs text-slate-300/80 mb-2 font-medium uppercase tracking-wider">当前天气</div>
                <div className="text-sm text-slate-300">天气信息不可用</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {error && permissionStatus === 'denied' && (
        <div className="mt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs text-amber-300 text-center flex items-center justify-center gap-2">
              <span className="text-base">💡</span>
              <span>提示：允许位置权限可以查看当前位置和天气信息</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

