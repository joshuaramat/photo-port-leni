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
      currentSlide: (prev.currentSlide + 1) % (items.length + 1)
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
        setState(prev => {
          // If we're at the cloned slide, instantly jump back to the first slide
          if (prev.currentSlide === items.length) {
            return { ...prev, currentSlide: 0, isTransitioning: false };
          }
          return { ...prev, isTransitioning: false };
        });
      }, 500);
    }
    return () => {
      if (transitionRef.current) {
        window.clearTimeout(transitionRef.current);
      }
    };
  }, [state.isTransitioning, items.length]);

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
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${state.currentSlide * 100}%)` }}
        >
          {items.map((item, index) => (
            <GallerySlide
              key={item.imageId}
              item={item}
              isActive={true}
              priority={index === 0}
            />
          ))}
          {/* Clone first slide for smooth loop */}
          <GallerySlide
            key="first-clone"
            item={items[0]}
            isActive={true}
            priority={false}
          />
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