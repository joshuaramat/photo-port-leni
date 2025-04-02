export interface GalleryItem {
  title: string;
  description: string;
  imageId: string;
  filename: string;
}

export interface GalleryProps {
  items: GalleryItem[];
  autoAdvanceInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
}

export interface GalleryState {
  currentSlide: number;
  isAutoAdvancing: boolean;
  isTransitioning: boolean;
}

export interface GalleryNavProps {
  totalSlides: number;
  currentSlide: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideChange: (index: number) => void;
}

export interface GallerySlideProps {
  item: GalleryItem;
  isActive: boolean;
  priority?: boolean;
} 