/**
 * Centralized trip data access
 */

import { Trip } from '../types';
import { mexicoTrip } from './mexico';

/**
 * All available trips
 */
export const trips: Record<string, Trip> = {
  mexico: mexicoTrip,
};

/**
 * Get trip by ID
 */
export function getTripById(tripId: string): Trip | null {
  return trips[tripId] || null;
}

/**
 * Get all trips as an array
 */
export function getAllTrips(): Trip[] {
  return Object.values(trips);
}

/**
 * Check if trip exists
 */
export function tripExists(tripId: string): boolean {
  return tripId in trips;
}

