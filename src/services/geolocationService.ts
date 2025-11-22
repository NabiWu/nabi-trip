/**
 * Geolocation service for getting user location
 */

import { LocationData } from '../types/weather';
import { GEOCODE_API_BASE_URL, GEOLOCATION_OPTIONS } from '../constants/weather';

export interface GeolocationError {
  code: number;
  message: string;
}

/**
 * Get user's current position
 */
export async function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: -1,
        message: '浏览器不支持地理位置服务',
      } as GeolocationError);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      (error: GeolocationPositionError) => {
        reject({
          code: error.code,
          message: error.message,
        } as GeolocationError);
      },
      GEOLOCATION_OPTIONS
    );
  });
}

/**
 * Reverse geocode coordinates to get location name
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<LocationData> {
  const response = await fetch(
    `${GEOCODE_API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=zh`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }

  const data = await response.json();

  return {
    city: data.city || data.locality || '未知城市',
    country: data.countryName || '未知国家',
    lat: latitude,
    lon: longitude,
  };
}

