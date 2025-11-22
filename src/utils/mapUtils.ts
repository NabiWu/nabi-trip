/**
 * Map utility functions for Google Maps URL processing
 */

/**
 * Extract location name from Google Maps URL
 */
export function extractLocationName(mapsUrl: string): string {
  try {
    const url = new URL(mapsUrl);
    const query = url.searchParams.get('query');
    if (query) {
      // Decode and clean up the query
      return decodeURIComponent(query).replace(/\+/g, ' ');
    }
    return 'Location';
  } catch {
    return 'Location';
  }
}

/**
 * Convert Google Maps search URL to embed URL
 * Uses Google Maps iframe embed which doesn't require API key
 */
export function convertToEmbedUrl(mapsUrl: string): string {
  try {
    const url = new URL(mapsUrl);
    const query = url.searchParams.get('query');
    if (query) {
      // Convert to Google Maps embed format
      // Format: https://www.google.com/maps?q=QUERY&output=embed
      const encodedQuery = encodeURIComponent(query);
      return `https://www.google.com/maps?q=${encodedQuery}&output=embed&hl=zh-CN`;
    }
    // If it's already a different format, try to extract location name
    return mapsUrl;
  } catch {
    return mapsUrl;
  }
}

/**
 * Generate a Google Maps link to view all locations
 */
export function generateAllLocationsLink(locations: Array<{ mapsUrl: string; name?: string }>): string {
  if (locations.length === 1) return locations[0].mapsUrl;
  
  const queries = locations.map(loc => {
    try {
      const url = new URL(loc.mapsUrl);
      const query = url.searchParams.get('query');
      return query ? decodeURIComponent(query) : (loc.name || extractLocationName(loc.mapsUrl));
    } catch {
      return loc.name || extractLocationName(loc.mapsUrl);
    }
  });
  const allQueries = queries.join('|');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(allQueries)}`;
}

