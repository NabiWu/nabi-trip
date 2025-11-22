/**
 * Weather-related type definitions
 */

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  city: string;
}

export interface LocationData {
  city: string;
  country: string;
  lat: number;
  lon: number;
}

export type LocationPermissionStatus = 'granted' | 'denied' | 'prompt';

