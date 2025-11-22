import { useCurrentDate } from '../hooks/useCurrentDate';
import { useLocationAndWeather } from '../hooks/useLocationAndWeather';
import { CalendarIcon, LocationIcon, LightBulbIcon, CloudSunIcon, RefreshIcon } from './icons';
import { WeatherIcon } from './icons/WeatherIcon';

export function CurrentInfo() {
  const date = useCurrentDate();
  const { location, weather, loading, refreshing, error, permissionStatus, refresh } = useLocationAndWeather();

  if (loading) {
    return (
      <div className="mb-8 animate-fade-in">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10">
          <div className="flex items-center justify-center gap-3">
            <div className="mexico-spinner w-6 h-6 border-3"></div>
            <span className="text-slate-200 text-base md:text-lg font-medium">正在加载实时信息...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 animate-fade-in">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-medium text-slate-300">实时信息</h2>
        <button
          onClick={refresh}
          disabled={refreshing || permissionStatus === 'denied'}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-slate-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshIcon 
            className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} 
          />
          <span className="text-sm font-medium">{refreshing ? '刷新中...' : '刷新'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {/* Current Date Card */}
        <div 
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <CalendarIcon className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">当前日期</div>
              <div className="text-2xl md:text-3xl font-bold text-white leading-tight">{date}</div>
            </div>
          </div>
        </div>

        {/* Location Card */}
        {location ? (
          <div 
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <LocationIcon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">当前位置</div>
                <div className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {location.city}
                  {location.country && location.country !== location.city && (
                    <span className="text-slate-400 text-base md:text-lg ml-1 font-normal">, {location.country}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : error && permissionStatus === 'denied' ? (
          <div 
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <LocationIcon className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">当前位置</div>
              <div className="text-sm text-amber-400">需要位置权限</div>
            </div>
          </div>
        ) : null}

        {/* Weather Card */}
        {weather ? (
          <div 
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-rose-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-rose-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <WeatherIcon code={weather.code || '800'} className="w-6 h-6 text-rose-400" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">当前天气</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-white">{weather.temperature}</span>
                  <span className="text-lg md:text-xl text-slate-400">°C</span>
                </div>
                <div className="text-sm text-slate-300 mt-1">{weather.description}</div>
              </div>
            </div>
          </div>
        ) : permissionStatus === 'granted' ? (
          <div 
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20">
                <CloudSunIcon className="w-6 h-6 text-slate-400" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">当前天气</div>
              <div className="text-sm text-slate-400">天气信息不可用</div>
            </div>
          </div>
        ) : null}
      </div>

      {error && permissionStatus === 'denied' && (
        <div className="mt-4 animate-fade-in">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm text-amber-300 text-center flex items-center justify-center gap-2">
              <LightBulbIcon className="w-4 h-4" />
              <span>提示：允许位置权限可以查看当前位置和天气信息</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

