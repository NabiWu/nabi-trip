/**
 * Simplified hook for getting weather only (without location)
 */

import { useState, useEffect } from 'react';
import { WeatherData } from '../types/weather';
import { getCurrentPosition } from '../services/geolocationService';
import { fetchWeather } from '../services/weatherService';

/**
 * Hook to get weather data only (simplified version)
 */
export function useWeather(): WeatherData | null {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchWeatherData() {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        if (!isMounted) return;

        const weatherData = await fetchWeather(latitude, longitude);

        if (!isMounted) return;

        setWeather(weatherData);
      } catch (error) {
        // Silently fail - weather is optional
        console.warn('Weather fetch error:', error);
      }
    }

    fetchWeatherData();

    return () => {
      isMounted = false;
    };
  }, []);

  return weather;
}

