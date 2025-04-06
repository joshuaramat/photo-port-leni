import { useState, useEffect } from 'react';
import styles from './Gallery.module.css';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const FALLBACK_IMAGE = 'https://placehold.co/800x600/e2e8f0/94a3b8?text=Photo+Coming+Soon';

  const handleImageError = (imageId: number) => {
    setFailedImages(prev => new Set(prev).add(imageId));
  };

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateCarousel = (newDirection: 'prev' | 'next') => {
    setCurrentIndex(prevIndex => {
      let newIndex;
      if (newDirection === 'next') {
        newIndex = (prevIndex + 1) % images.length;
      } else {
        newIndex = (prevIndex - 1 + images.length) % images.length;
      }
      
      // Skip failed images
      while (failedImages.has(images[newIndex].id)) {
        if (newDirection === 'next') {
          newIndex = (newIndex + 1) % images.length;
        } else {
          newIndex = (newIndex - 1 + images.length) % images.length;
        }
      }
      
      return newIndex;
    });
  };

  const navigateImage = (newDirection: 'prev' | 'next') => {
    if (!selectedImage) return;

    const newIndex = newDirection === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;

    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedImage) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateImage('prev');
        break;
      case 'ArrowRight':
        navigateImage('next');
        break;
    }
  };

  return (
    <div className={styles.gallery} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={styles.carousel}>
        <div 
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className={styles.carouselSlide}
            >
              <img
                src={failedImages.has(image.id) ? FALLBACK_IMAGE : image.src}
                alt={failedImages.has(image.id) ? "Fallback image" : image.alt}
                className={styles.carouselImage}
                onClick={() => openLightbox(image, index)}
                onError={() => handleImageError(image.id)}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className={styles.carouselNav}>
          <button 
            className={styles.carouselButton}
            onClick={() => navigateCarousel('prev')}
            aria-label="Previous image"
          >
            ←
          </button>
          <button 
            className={styles.carouselButton}
            onClick={() => navigateCarousel('next')}
            aria-label="Next image"
          >
            →
          </button>
        </div>
        <div className={styles.carouselDots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselDot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button 
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <button 
            className={styles.navButton + ' ' + styles.prevButton}
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            aria-label="Previous image"
          >
            ←
          </button>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <img
              src={failedImages.has(selectedImage.id) ? FALLBACK_IMAGE : selectedImage.src}
              alt={failedImages.has(selectedImage.id) ? "Fallback image" : selectedImage.alt}
              className={styles.lightboxImage}
              onError={() => {
                handleImageError(selectedImage.id);
                closeLightbox();
              }}
            />
          </div>
          <button 
            className={styles.navButton + ' ' + styles.nextButton}
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
} 