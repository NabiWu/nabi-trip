import { useState, useEffect } from 'react';
import type { Location } from '../types';
import { extractLocationName, convertToEmbedUrl } from '../utils/mapUtils';

interface FullScreenMapProps {
  location: Location | string;
}

export function FullScreenMap({ location }: FullScreenMapProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (typeof location === 'string') {
    return null;
  }

  const locationName = location.name || extractLocationName(location.mapsUrl);
  const embedUrl = convertToEmbedUrl(location.mapsUrl);

  // Prevent body scroll when fullscreen map is open
  useEffect(() => {
    if (isFullScreen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable body scroll using overflow instead of position fixed
      document.body.style.overflow = 'hidden';
      // Scroll to top immediately
      window.scrollTo(0, 0);
      
      return () => {
        // Restore body scroll
        document.body.style.overflow = '';
        // Restore scroll position when closing
        window.scrollTo(0, scrollY);
      };
    }
  }, [isFullScreen]);

  const handleOpenFullScreen = () => {
    setIsFullScreen(true);
  };

  if (!isFullScreen) {
    return (
      <button
        onClick={handleOpenFullScreen}
        className="mt-2 inline-flex items-center gap-2 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 active:bg-purple-500/40 text-purple-300 rounded-lg border border-purple-500/30 transition-all text-sm font-medium min-h-[40px]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
        </svg>
        <span>全屏查看地图</span>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm"
        onClick={() => setIsFullScreen(false)}
        style={{ 
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      
      {/* Full screen map container */}
      <div 
        className="fixed z-[9999] bg-black overflow-hidden"
        style={{ 
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100dvh', // Use dynamic viewport height for mobile
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="relative w-full h-full flex flex-col"
          style={{ 
            height: '100%',
          }}
        >
          {/* Header - Always visible at top with safe area */}
          <div 
            className="flex items-center justify-between px-4 py-3 bg-black/95 backdrop-blur-xl border-b border-white/10 flex-shrink-0 relative z-10"
            style={{
              paddingTop: `calc(0.75rem + env(safe-area-inset-top, 0px))`,
            }}
          >
            <h3 className="text-white font-semibold text-base">{locationName}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullScreen(false);
              }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center relative z-20"
              aria-label="关闭"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Map */}
          <div className="flex-1 relative overflow-hidden min-h-0">
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
          <div 
            className="px-4 py-3 bg-black/95 backdrop-blur-xl border-t border-white/10 flex-shrink-0 relative z-10"
            style={{
              paddingBottom: `calc(0.75rem + env(safe-area-inset-bottom, 0px))`,
            }}
          >
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2.5 bg-blue-500/20 active:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-500/30 transition-all text-center text-sm font-medium min-h-[40px] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              <span>在 Google Maps 中打开</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

