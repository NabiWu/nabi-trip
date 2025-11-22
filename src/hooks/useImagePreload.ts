import { useEffect, useState } from 'react';

/**
 * Preload images for better performance
 */
export function useImagePreload(imageUrls: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const loaded = new Set<string>();

    const loadImage = (url: string): Promise<void> => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          if (isMounted) {
            loaded.add(url);
            setLoadedImages(new Set(loaded));
            resolve();
          }
        };
        
        img.onerror = () => {
          if (isMounted) {
            loaded.add(url); // Still mark as loaded to prevent infinite retries
            setLoadedImages(new Set(loaded));
            resolve();
          }
        };

        img.src = url;
      });
    };

    // Preload all images
    Promise.all(imageUrls.map(url => loadImage(url)))
      .then(() => {
        if (isMounted) {
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [imageUrls.join(',')]);

  return { loadedImages, loading };
}

/**
 * Preload critical images (flag and first day)
 */
export function useCriticalImagePreload() {
  const criticalImages = [
    '/nabi-trip/images/flag.jpg',
    '/nabi-trip/images/1.jpg',
  ];

  return useImagePreload(criticalImages);
}

