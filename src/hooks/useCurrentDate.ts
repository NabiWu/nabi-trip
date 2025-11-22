/**
 * Custom hook for getting and updating current date
 */

import { useState, useEffect } from 'react';
import { formatDateDisplay, getTodayDate } from '../utils/dateUtils';

const UPDATE_INTERVAL_MS = 60000; // 1 minute

/**
 * Hook to get current formatted date, updates every minute
 */
export function useCurrentDate(): string {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateDate = () => {
      const today = getTodayDate();
      setDate(formatDateDisplay(today));
    };

    // Initial update
    updateDate();

    // Set up interval for periodic updates
    const interval = setInterval(updateDate, UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return date;
}

