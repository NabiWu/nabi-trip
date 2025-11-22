import { useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // Minimum distance for a swipe (default: 50px)
  velocity?: number; // Minimum velocity for a swipe (default: 0.3)
}

/**
 * Hook to detect swipe gestures on mobile devices
 * Returns touch event handlers that should be attached to an element
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  velocity = 0.3,
}: SwipeHandlers) {
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Only prevent default if we're doing a horizontal swipe
    if (touchStart.current) {
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStart.current.x);
      const deltaY = Math.abs(touch.clientY - touchStart.current.y);
      
      // If horizontal movement is dominant, prevent vertical scroll
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    const deltaTime = Date.now() - touchStart.current.time;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const speed = distance / deltaTime;

    // Check if swipe meets threshold and velocity requirements
    if (distance > threshold && speed > velocity) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Determine primary direction
      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    touchStart.current = null;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}

