/**
 * Custom hook for getting user location and weather
 */

import { useState, useEffect, useCallback } from 'react';
import { LocationData, WeatherData, LocationPermissionStatus } from '../types/weather';
import { getCurrentPosition, reverseGeocode } from '../services/geolocationService';
import { fetchWeather } from '../services/weatherService';
import { 
  getLocationCache, 
  saveLocationCache, 
  getWeatherCache, 
  saveWeatherCache 
} from '../utils/cache';

interface UseLocationAndWeatherResult {
  location: LocationData | null;
  weather: WeatherData | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  permissionStatus: LocationPermissionStatus;
  refresh: () => Promise<void>;
}

/**
 * Hook to get user location and weather data with caching
 */
export function useLocationAndWeather(): UseLocationAndWeatherResult {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus>('prompt');

  const fetchLocationAndWeather = useCallback(async () => {
    let isMounted = true;

    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      if (!isMounted) return;

      setPermissionStatus('granted');
      setError(null);

      // Fetch location name
      try {
        const locationData = await reverseGeocode(latitude, longitude);
        
        if (!isMounted) return;
        
        setLocation(locationData);
        saveLocationCache(locationData);

        // Fetch weather
        const weatherData = await fetchWeather(
          latitude,
          longitude,
          locationData.city
        );

        if (!isMounted) return;

        if (weatherData) {
          setWeather(weatherData);
          saveWeatherCache(weatherData);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching location or weather:', err);
        setError('无法获取位置或天气信息');
      }
    } catch (err: any) {
      if (!isMounted) return;

      console.error('Geolocation error:', err);
      setPermissionStatus('denied');
      setError(err.message || '无法获取位置，请允许位置权限');
    } finally {
      if (isMounted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  // Initial load - use cache if available, then refresh in background
  useEffect(() => {
    let isMounted = true;

    async function initialLoad() {
      const cachedLocation = getLocationCache();
      const cachedWeather = getWeatherCache();

      // If we have cached data, show it immediately and set loading to false
      if (cachedLocation || cachedWeather) {
        if (isMounted) {
          if (cachedLocation) setLocation(cachedLocation);
          if (cachedWeather) setWeather(cachedWeather);
          setLoading(false);
        }
        // Refresh in background
        if (isMounted) {
          fetchLocationAndWeather();
        }
      } else {
        // No cache, do full load
        if (isMounted) {
          await fetchLocationAndWeather();
        }
      }
    }

    initialLoad();

    return () => {
      isMounted = false;
    };
  }, [fetchLocationAndWeather]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchLocationAndWeather();
  }, [fetchLocationAndWeather]);

  return {
    location,
    weather,
    loading,
    refreshing,
    error,
    permissionStatus,
    refresh,
  };
}

