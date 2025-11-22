import { Trip, DateStatus } from '../types';

/**
 * Get today's date in YYYY-MM-DD format (using local timezone)
 */
export function getTodayDate(): string {
  const now = new Date();
  // Use local timezone instead of UTC to avoid timezone issues
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Compare two dates (YYYY-MM-DD format)
 * Returns: -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export function compareDates(date1: string, date2: string): number {
  if (date1 < date2) return -1;
  if (date1 > date2) return 1;
  return 0;
}

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get the status of a trip based on current date
 */
export function getTripStatus(trip: Trip): DateStatus {
  const today = getTodayDate();
  const { startDate, endDate, days } = trip;

  // Trip hasn't started yet
  if (compareDates(today, startDate) < 0) {
    const daysUntil = daysBetween(today, startDate);
    return {
      status: 'upcoming',
      daysUntilStart: daysUntil,
      message: `行程还有 ${daysUntil} 天开始`,
    };
  }

  // Trip has ended
  if (compareDates(today, endDate) > 0) {
    const daysSince = daysBetween(endDate, today);
    return {
      status: 'completed',
      daysSinceEnd: daysSince,
      message: `行程已于 ${daysSince} 天前结束`,
    };
  }

  // Trip is active - find current day
  // Find the day that matches today's date, or the most recent day if today is between days
  let currentDay = 1;
  for (let i = 0; i < days.length; i++) {
    const dayDate = days[i].date;
    if (compareDates(today, dayDate) === 0) {
      // Exact match
      currentDay = days[i].day;
      break;
    } else if (compareDates(today, dayDate) > 0) {
      // Today is after this day, so this could be the current day
      currentDay = days[i].day;
    } else {
      // Today is before this day, stop searching
      break;
    }
  }

  return {
    status: 'active',
    currentDay,
    message: `今天是 Day ${currentDay}`,
  };
}

/**
 * Get the day info for a specific date
 */
export function getDayByDate(trip: Trip, date: string) {
  return trip.days.find(day => day.date === date);
}

/**
 * Get the day info for a specific day number
 */
export function getDayByNumber(trip: Trip, dayNumber: number) {
  // Validate dayNumber is within valid range
  if (dayNumber < 1 || dayNumber > trip.days.length) {
    return undefined;
  }
  return trip.days.find(day => day.day === dayNumber);
}

/**
 * Format date for display (e.g., "11/22/2025（周六）")
 * Uses local timezone to avoid date offset issues
 */
export function formatDateDisplay(dateStr: string): string {
  // Parse YYYY-MM-DD format using local timezone
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const weekday = weekdays[date.getDay()];
  return `${monthStr}/${dayStr}/${year}（${weekday}）`;
}

