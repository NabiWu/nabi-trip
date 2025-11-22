/**
 * Weather service for fetching weather data
 */

import { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../constants/weather';
import { WEATHER_API_BASE_URL } from '../constants/weather';

interface WttrApiResponse {
  current_condition?: Array<{
    temp_C: string;
    weatherCode: string;
    lang_zh?: Array<{ value: string }>;
    weatherDesc?: Array<{ value: string }>;
  }>;
}

/**
 * Fetch weather data for given coordinates
 */
export async function fetchWeather(
  latitude: number,
  longitude: number,
  cityName?: string
): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `${WEATHER_API_BASE_URL}/${latitude},${longitude}?format=j1&lang=zh`,
      {
        headers: {
          'Accept-Language': 'zh-CN,zh;q=0.9',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data: WttrApiResponse = await response.json();
    const current = data.current_condition?.[0];

    if (!current) {
      return null;
    }

    return {
      temperature: parseInt(current.temp_C) || 0,
      description:
        current.lang_zh?.[0]?.value ||
        current.weatherDesc?.[0]?.value ||
        '未知',
      icon: getWeatherIcon(current.weatherCode),
      city: cityName || '当前位置',
    };
  } catch (error) {
    console.warn('Weather API error:', error);
    return null;
  }
}

