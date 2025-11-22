export interface Location {
  name: string;
  mapsUrl: string;
}

// Re-export weather types for convenience
export type { WeatherData, LocationData, LocationPermissionStatus } from './weather';

export interface DayInfo {
  day: number;
  date: string; // YYYY-MM-DD format
  title: string;
  subtitle: string;
  badge: string;
  accommodation: string;
  accommodationLink?: string;
  transport: {
    type: string;
    details?: string;
    departure?: Location;
    arrival?: Location;
  };
  attractions: (string | Location)[];
  dining: (string | Location)[];
  note?: string;
}

export interface Trip {
  id: string;
  name: string;
  emoji: string;
  dateRange: string;
  duration: string;
  description: string;
  tags: string[];
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  days: DayInfo[];
}

export type TripStatus = 'upcoming' | 'active' | 'completed';

export interface DateStatus {
  status: TripStatus;
  currentDay?: number;
  daysUntilStart?: number;
  daysSinceEnd?: number;
  message: string;
}

