import { useState } from 'react';
import type { Location } from '../types';

interface LocationMapProps {
  location: Location | string;
  label?: string; // Reserved for future use
}

/**
 * Extract location name from Google Maps URL
 */
function extractLocationName(mapsUrl: string): string {
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
function convertToEmbedUrl(mapsUrl: string): string {
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

export function LocationMap({ location }: LocationMapProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (typeof location === 'string') {
    return null; // Can't show map for string locations
  }

  const locationName = location.name || extractLocationName(location.mapsUrl);
  const embedUrl = convertToEmbedUrl(location.mapsUrl);

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>{isOpen ? '隐藏地图' : '查看地图'}</span>
      </button>

      {isOpen && (
        <div className="mt-3 rounded-lg overflow-hidden border border-white/20">
          <div className="relative w-full" style={{ height: '300px' }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={embedUrl}
            ></iframe>
          </div>
          <div className="bg-white/5 px-3 py-2 text-xs text-slate-400 text-center">
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              在 Google Maps 中打开 {locationName}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

interface MultiLocationMapProps {
  locations: (Location | string)[];
  title?: string;
}


/**
 * Map component that shows multiple locations with toggle controls for each location
 */
export function MultiLocationMap({ locations }: MultiLocationMapProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter out string locations and extract valid locations
  const validLocations = locations.filter(
    (loc): loc is Location => typeof loc !== 'string'
  );

  if (validLocations.length === 0) {
    return null;
  }

  // Only show one location at a time - select which one to display
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Get the currently selected location
  const selectedLocation = validLocations[selectedIndex];
  const locationName = selectedLocation.name || extractLocationName(selectedLocation.mapsUrl);
  const currentEmbedUrl = convertToEmbedUrl(selectedLocation.mapsUrl);

  // Generate a Google Maps link to view all locations
  const generateAllLocationsLink = (): string => {
    if (validLocations.length === 1) return validLocations[0].mapsUrl;
    
    const queries = validLocations.map(loc => {
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
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200 active:text-purple-100 transition-colors min-h-[44px] px-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
        </svg>
        <span>{isOpen ? '隐藏地图' : '查看地图'}</span>
        {validLocations.length > 1 && (
          <span className="text-xs text-slate-400">({validLocations.length} 个地点)</span>
        )}
      </button>

      {isOpen && (
        <div className="mt-3 rounded-lg overflow-hidden border border-white/20">
          {/* Location selector - choose which location to display */}
          {validLocations.length > 1 && (
            <div className="bg-white/5 px-3 md:px-4 py-2 md:py-3 border-b border-white/10">
              <div className="text-xs text-slate-300 font-semibold mb-2">选择要查看的地点：</div>
              <div className="flex flex-wrap gap-2">
                {validLocations.map((loc, idx) => {
                  const name = loc.name || extractLocationName(loc.mapsUrl);
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs transition-all border min-h-[36px] md:min-h-[44px] flex items-center ${
                        isSelected
                          ? 'bg-purple-500/30 text-purple-200 border-purple-400/50'
                          : 'bg-white/5 text-slate-300 border-white/10 active:bg-white/10'
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Map iframe - shows only one location */}
          <div className="relative w-full h-[300px] md:h-[400px]">
            <iframe
              key={selectedIndex} // Force re-render when selection changes
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={currentEmbedUrl}
            ></iframe>
          </div>

          {/* Footer with links */}
          <div className="bg-white/5 px-3 md:px-4 py-2 md:py-3">
            <div className="text-xs text-slate-400">
              <div className="mb-2">
                <span className="text-slate-300 font-semibold">当前查看：</span>
                <a
                  href={selectedLocation.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline ml-1"
                >
                  {locationName}
                </a>
              </div>
              {validLocations.length > 1 && (
                <>
                  <div className="mb-2 mt-2 pt-2 border-t border-white/10">
                    <a
                      href={generateAllLocationsLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 md:py-1.5 bg-blue-500/20 active:bg-blue-500/30 text-blue-200 rounded-lg border border-blue-400/30 transition-all text-xs font-medium min-h-[44px]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      在 Google Maps 中查看所有地点
                    </a>
                  </div>
                  <div className="mt-2">
                    <span className="text-slate-300 font-semibold">所有地点：</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {validLocations.map((loc, idx) => {
                        const name = loc.name || extractLocationName(loc.mapsUrl);
                        return (
                          <a
                            key={idx}
                            href={loc.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline text-xs"
                          >
                            {name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

