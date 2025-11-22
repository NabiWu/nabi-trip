import { useRef, useState, useCallback } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // Minimum distance for a swipe (default: 50px)
  velocity?: number; // Minimum velocity for a swipe (default: 0.3)
  preventScroll?: boolean; // Prevent vertical scroll during horizontal swipe
}

interface SwipeState {
  isSwiping: boolean;
  deltaX: number;
  deltaY: number;
  progress: number; // 0-1, how far through the swipe
}

/**
 * Enhanced swipe hook with visual feedback
 * Returns touch event handlers and swipe state for visual feedback
 */
export function useSwipeWithFeedback({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  velocity = 0.2,
  preventScroll = true,
}: SwipeHandlers) {
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isSwiping: false,
    deltaX: 0,
    deltaY: 0,
    progress: 0,
  });
  const swipeDirection = useRef<'horizontal' | 'vertical' | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    swipeDirection.current = null;
    setSwipeState({
      isSwiping: false,
      deltaX: 0,
      deltaY: 0,
      progress: 0,
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Determine swipe direction on first significant movement
    if (!swipeDirection.current && (absX > 10 || absY > 10)) {
      swipeDirection.current = absX > absY ? 'horizontal' : 'vertical';
    }

    // Only process if we have a clear direction
    if (swipeDirection.current === 'horizontal') {
      // Prevent vertical scroll during horizontal swipe
      if (preventScroll && absX > absY && absX > 10) {
        e.preventDefault();
      }

      // Calculate progress (0-1) based on threshold
      const progress = Math.min(1, absX / threshold);
      
      setSwipeState({
        isSwiping: true,
        deltaX,
        deltaY: 0,
        progress,
      });
    } else if (swipeDirection.current === 'vertical') {
      // Don't interfere with vertical scrolling
      setSwipeState({
        isSwiping: false,
        deltaX: 0,
        deltaY,
        progress: 0,
      });
    }
  }, [threshold, preventScroll]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) {
      setSwipeState({
        isSwiping: false,
        deltaX: 0,
        deltaY: 0,
        progress: 0,
      });
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    const deltaTime = Date.now() - touchStart.current.time;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const speed = deltaTime > 0 ? distance / deltaTime : 0;

    // Reset swipe state
    setSwipeState({
      isSwiping: false,
      deltaX: 0,
      deltaY: 0,
      progress: 0,
    });

    // Check if swipe meets threshold and velocity requirements
    // Lower threshold for quick swipes, higher for slow swipes
    const effectiveThreshold = speed > 0.5 ? threshold * 0.6 : threshold;
    const effectiveVelocity = speed > 0.5 ? velocity * 0.5 : velocity;

    if (distance > effectiveThreshold && speed > effectiveVelocity) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Determine primary direction
      if (absX > absY && absX > 20) {
        // Horizontal swipe - require minimum horizontal movement
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else if (absY > absX && absY > 20) {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    touchStart.current = null;
    swipeDirection.current = null;
  }, [threshold, velocity, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    swipeState,
  };
}

