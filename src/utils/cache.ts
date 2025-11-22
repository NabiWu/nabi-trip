/**
 * Cache utility for storing and retrieving location and weather data
 */

import { LocationData, WeatherData } from '../types/weather';

const CACHE_PREFIX = 'nabi-trip-';
const LOCATION_CACHE_KEY = `${CACHE_PREFIX}location`;
const WEATHER_CACHE_KEY = `${CACHE_PREFIX}weather`;
const CACHE_TIMESTAMP_KEY = `${CACHE_PREFIX}cache-timestamp`;

// Cache duration: 10 minutes for weather, 30 minutes for location
const WEATHER_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const LOCATION_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

/**
 * Save data to cache with timestamp
 */
function saveToCache<T>(key: string, data: T): void {
  try {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  } catch (error) {
    console.warn('Failed to save to cache:', error);
  }
}

/**
 * Get data from cache if it's still valid
 */
function getFromCache<T>(key: string, maxAge: number): T | null {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cacheItem: CacheItem<T> = JSON.parse(cached);
    const age = Date.now() - cacheItem.timestamp;

    if (age > maxAge) {
      // Cache expired, remove it
      localStorage.removeItem(key);
      return null;
    }

    return cacheItem.data;
  } catch (error) {
    console.warn('Failed to read from cache:', error);
    return null;
  }
}

/**
 * Clear all cache
 */
export function clearCache(): void {
  try {
    localStorage.removeItem(LOCATION_CACHE_KEY);
    localStorage.removeItem(WEATHER_CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}

/**
 * Save location data to cache
 */
export function saveLocationCache(location: LocationData): void {
  saveToCache<LocationData>(LOCATION_CACHE_KEY, location);
}

/**
 * Get location data from cache
 */
export function getLocationCache(): LocationData | null {
  return getFromCache<LocationData>(LOCATION_CACHE_KEY, LOCATION_CACHE_DURATION);
}

/**
 * Save weather data to cache
 */
export function saveWeatherCache(weather: WeatherData): void {
  saveToCache<WeatherData>(WEATHER_CACHE_KEY, weather);
}

/**
 * Get weather data from cache
 */
export function getWeatherCache(): WeatherData | null {
  return getFromCache<WeatherData>(WEATHER_CACHE_KEY, WEATHER_CACHE_DURATION);
}

