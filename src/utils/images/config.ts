import type { ImageConfig, ResponsiveImageOptions } from './types';
import { DEFAULT_IMAGE_CONFIG, DEFAULT_IMAGE_SIZES, RESPONSIVE_SIZES } from './constants';

const PLACEHOLDER_BASE_URL = 'https://placehold.co';

export function getResponsiveImageConfig(
  category: string,
  filename: string,
  alt: string,
  options: ResponsiveImageOptions = {}
): ImageConfig {
  const {
    width = DEFAULT_IMAGE_CONFIG.width,
    height = DEFAULT_IMAGE_CONFIG.height,
    priority = DEFAULT_IMAGE_CONFIG.priority,
    category: imageCategory = category
  } = options;

  const placeholderUrl = `${PLACEHOLDER_BASE_URL}/${width}x${height}/f5f5f5/666666?text=${imageCategory}`;
  
  return {
    src: placeholderUrl,
    alt,
    width,
    height,
    sizes: `(max-width: 640px) ${DEFAULT_IMAGE_SIZES.SMALL}px,
            (max-width: 768px) ${DEFAULT_IMAGE_SIZES.MEDIUM}px,
            (max-width: 1024px) ${DEFAULT_IMAGE_SIZES.LARGE}px,
            ${DEFAULT_IMAGE_SIZES.XLARGE}px`,
    loading: priority ? 'eager' : 'lazy'
  };
}

export function getResponsiveSrcSet(width: number, height: number, category: string): string {
  return Object.entries(RESPONSIVE_SIZES)
    .map(([size, query]) => {
      const sizeWidth = DEFAULT_IMAGE_SIZES[size as keyof typeof DEFAULT_IMAGE_SIZES];
      return `${PLACEHOLDER_BASE_URL}/${sizeWidth}x${height}/f5f5f5/666666?text=${category} ${query} ${sizeWidth}w`;
    })
    .join(', ');
} 