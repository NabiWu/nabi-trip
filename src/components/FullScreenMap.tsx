import { useState } from 'react';
import type { Location } from '../types';

interface FullScreenMapProps {
  location: Location | string;
}

/**
 * Extract location name from Google Maps URL
 */
function extractLocationName(mapsUrl: string): string {
  try {
    const url = new URL(mapsUrl);
    const query = url.searchParams.get('query');
    if (query) {
      return decodeURIComponent(query).replace(/\+/g, ' ');
    }
    return 'Location';
  } catch {
    return 'Location';
  }
}

/**
 * Convert Google Maps search URL to embed URL
 */
function convertToEmbedUrl(mapsUrl: string): string {
  try {
    const url = new URL(mapsUrl);
    const query = url.searchParams.get('query');
    if (query) {
      const encodedQuery = encodeURIComponent(query);
      return `https://www.google.com/maps?q=${encodedQuery}&output=embed&hl=zh-CN`;
    }
    return mapsUrl;
  } catch {
    return mapsUrl;
  }
}

export function FullScreenMap({ location }: FullScreenMapProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (typeof location === 'string') {
    return null;
  }

  const locationName = location.name || extractLocationName(location.mapsUrl);
  const embedUrl = convertToEmbedUrl(location.mapsUrl);

  if (!isFullScreen) {
    return (
      <button
        onClick={() => setIsFullScreen(true)}
        className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 active:bg-blue-500/40 text-blue-300 rounded-lg border border-blue-500/30 transition-all text-sm font-medium min-h-[44px]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
        </svg>
        <span>全屏查看地图</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black safe-area-top safe-area-bottom">
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <h3 className="text-white font-semibold text-lg">{locationName}</h3>
          <button
            onClick={() => setIsFullScreen(false)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
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

        {/* Footer */}
        <div className="p-4 bg-black/80 backdrop-blur-xl border-t border-white/10">
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-3 bg-blue-500/20 active:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-500/30 transition-all text-center font-medium min-h-[44px] flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            <span>在 Google Maps 中打开</span>
          </a>
        </div>
      </div>
    </div>
  );
}

