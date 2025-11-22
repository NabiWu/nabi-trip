/**
 * Weather-related constants
 */

export const WEATHER_API_BASE_URL = 'https://wttr.in';
export const GEOCODE_API_BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 300000, // Cache for 5 minutes
};

/**
 * Map weather codes to emoji icons
 */
export const WEATHER_CODE_TO_ICON: Record<string, string> = {
  // Thunderstorm (200-299)
  '200-299': '⛈️',
  // Drizzle (300-399)
  '300-399': '🌧️',
  // Rain (500-599)
  '500-599': '🌧️',
  // Snow (600-699)
  '600-699': '❄️',
  // Atmosphere (700-799)
  '700-799': '🌫️',
  // Clear (800)
  '800': '☀️',
  // Clouds (801-809)
  '801-809': '☁️',
  // Default
  'default': '🌤️',
};

/**
 * Get weather icon emoji based on weather code
 */
export function getWeatherIcon(code: string): string {
  const codeNum = parseInt(code);
  
  if (codeNum >= 200 && codeNum < 300) return WEATHER_CODE_TO_ICON['200-299'];
  if (codeNum >= 300 && codeNum < 400) return WEATHER_CODE_TO_ICON['300-399'];
  if (codeNum >= 500 && codeNum < 600) return WEATHER_CODE_TO_ICON['500-599'];
  if (codeNum >= 600 && codeNum < 700) return WEATHER_CODE_TO_ICON['600-699'];
  if (codeNum >= 700 && codeNum < 800) return WEATHER_CODE_TO_ICON['700-799'];
  if (codeNum === 800) return WEATHER_CODE_TO_ICON['800'];
  if (codeNum >= 801 && codeNum < 810) return WEATHER_CODE_TO_ICON['801-809'];
  
  return WEATHER_CODE_TO_ICON['default'];
}

