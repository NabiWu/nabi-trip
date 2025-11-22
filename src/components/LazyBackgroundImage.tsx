import { useEffect, useState, useRef } from 'react';

interface LazyBackgroundImageProps {
  imageUrl: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  placeholder?: React.ReactNode;
  onLoad?: () => void;
}

/**
 * Component for lazy loading background images
 * Only loads images when they're about to enter viewport
 */
export function LazyBackgroundImage({
  imageUrl,
  className = '',
  style = {},
  children,
  placeholder,
  onLoad,
}: LazyBackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // For critical images (flag, first day), load immediately
    const isCritical = imageUrl.includes('flag.jpg') || imageUrl.includes('1.jpg');
    if (isCritical) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [imageUrl]);

  // Load image when in view
  useEffect(() => {
    if (!isInView || isLoaded) return;

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoaded(true); // Stop trying
    };

    img.src = imageUrl;
  }, [imageUrl, isInView, isLoaded, onLoad]);

  const backgroundStyle: React.CSSProperties = {
    ...style,
    ...(isLoaded && !hasError
      ? {
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : {}),
    ...(!isLoaded && !hasError
      ? {
          backgroundColor: style.backgroundColor || '#0f172a',
        }
      : {}),
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={backgroundStyle}
    >
      {!isLoaded && !hasError && placeholder}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
          <span className="text-slate-500 text-sm">图片加载失败</span>
        </div>
      )}
      {children}
    </div>
  );
}

