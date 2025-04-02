import { useEffect, useRef, useState } from 'react';
import type { GalleryProps, GalleryState } from '../types';
import { GallerySlide } from './GallerySlide';
import { GalleryNav } from './GalleryNav';

export function GalleryCarousel({
  items,
  autoAdvanceInterval = 5000,
  showNavigation = true,
  showDots = true
}: GalleryProps) {
  const [state, setState] = useState<GalleryState>({
    currentSlide: 0,
    isAutoAdvancing: true,
    isTransitioning: false
  });

  const autoAdvanceRef = useRef<number | null>(null);
  const transitionRef = useRef<number | null>(null);

  const nextSlide = () => {
    if (state.isTransitioning) return;
    setState(prev => ({
      ...prev,
      isTransitioning: true,
      currentSlide: (prev.currentSlide + 1) % items.length
    }));
  };

  const prevSlide = () => {
    if (state.isTransitioning) return;
    setState(prev => ({
      ...prev,
      isTransitioning: true,
      currentSlide: (prev.currentSlide - 1 + items.length) % items.length
    }));
  };

  const goToSlide = (index: number) => {
    if (state.isTransitioning) return;
    setState(prev => ({
      ...prev,
      isTransitioning: true,
      currentSlide: index
    }));
  };

  const startAutoAdvance = () => {
    if (!state.isAutoAdvancing) return;
    autoAdvanceRef.current = window.setInterval(nextSlide, autoAdvanceInterval);
  };

  const stopAutoAdvance = () => {
    if (autoAdvanceRef.current) {
      window.clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  };

  useEffect(() => {
    startAutoAdvance();
    return () => stopAutoAdvance();
  }, [state.isAutoAdvancing]);

  useEffect(() => {
    if (state.isTransitioning) {
      transitionRef.current = window.setTimeout(() => {
        setState(prev => ({ ...prev, isTransitioning: false }));
      }, 500);
    }
    return () => {
      if (transitionRef.current) {
        window.clearTimeout(transitionRef.current);
      }
    };
  }, [state.isTransitioning]);

  return (
    <div 
      className="relative max-w-6xl mx-auto"
      onMouseEnter={() => {
        setState(prev => ({ ...prev, isAutoAdvancing: false }));
        stopAutoAdvance();
      }}
      onMouseLeave={() => {
        setState(prev => ({ ...prev, isAutoAdvancing: true }));
        startAutoAdvance();
      }}
    >
      <div className="gallery-carousel overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-in-out">
          {items.map((item, index) => (
            <GallerySlide
              key={item.imageId}
              item={item}
              isActive={index === state.currentSlide}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
      {showNavigation && (
        <GalleryNav
          totalSlides={items.length}
          currentSlide={state.currentSlide}
          onPrevious={prevSlide}
          onNext={nextSlide}
          onSlideChange={goToSlide}
        />
      )}
    </div>
  );
} 