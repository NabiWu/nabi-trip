/**
 * Custom hook for getting user location and weather
 */

import { useState, useEffect } from 'react';
import { LocationData, WeatherData, LocationPermissionStatus } from '../types/weather';
import { getCurrentPosition, reverseGeocode } from '../services/geolocationService';
import { fetchWeather } from '../services/weatherService';

interface UseLocationAndWeatherResult {
  location: LocationData | null;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  permissionStatus: LocationPermissionStatus;
}

/**
 * Hook to get user location and weather data
 */
export function useLocationAndWeather(): UseLocationAndWeatherResult {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus>('prompt');

  useEffect(() => {
    let isMounted = true;

    async function fetchLocationAndWeather() {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        if (!isMounted) return;

        setPermissionStatus('granted');

        // Fetch location name
        try {
          const locationData = await reverseGeocode(latitude, longitude);
          
          if (!isMounted) return;
          
          setLocation(locationData);

          // Fetch weather
          const weatherData = await fetchWeather(
            latitude,
            longitude,
            locationData.city
          );

          if (!isMounted) return;

          setWeather(weatherData);
        } catch (err) {
          if (!isMounted) {
          console.error('Error fetching location or weather:', err);
          setError('无法获取位置或天气信息');
        }
        }
      } catch (err: any) {
        if (!isMounted) return;

        console.error('Geolocation error:', err);
        setPermissionStatus('denied');
        setError(err.message || '无法获取位置，请允许位置权限');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchLocationAndWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    location,
    weather,
    loading,
    error,
    permissionStatus,
  };
}

