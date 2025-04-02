import type { ImageConfig } from '../../../utils/images/types';

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