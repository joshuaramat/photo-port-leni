import type { GalleryNavProps } from '../types';

export function GalleryNav({
  totalSlides,
  currentSlide,
  onPrevious,
  onNext,
  onSlideChange
}: GalleryNavProps) {
  return (
    <div 
      className="flex items-center justify-center mt-4 sm:mt-6 md:mt-8 space-x-2 sm:space-x-3 md:space-x-4"
      role="navigation"
      aria-label="Gallery navigation"
      aria-controls="gallery-carousel"
    >
      <button 
        className="bg-primary/10 hover:bg-primary/20 p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center justify-center group" 
        onClick={onPrevious}
        aria-label="Previous slide"
        disabled={currentSlide === 0}
      >
        <svg 
          className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div 
        className="flex items-center space-x-1.5"
        role="tablist"
        aria-label="Gallery slides"
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className="relative w-1 h-1 rounded-full bg-gray-300/30 hover:bg-gray-400/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
            onClick={() => onSlideChange(index)}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
            aria-controls={`slide-${index}`}
            aria-current={index === currentSlide ? 'true' : undefined}
          >
            <span className={`absolute inset-0 rounded-full bg-primary/80 transition-transform duration-300 ${
              index === currentSlide ? 'scale-100' : 'scale-0'
            }`} />
          </button>
        ))}
      </div>
      <button 
        className="bg-primary/10 hover:bg-primary/20 p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center justify-center group" 
        onClick={onNext}
        aria-label="Next slide"
        disabled={currentSlide === totalSlides - 1}
      >
        <svg 
          className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
} 