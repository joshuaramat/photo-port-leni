export interface ImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function getImageConfig(
  category: string,
  filename: string,
  alt: string,
  width: number,
  height: number,
  priority: boolean = false,
  section?: string
): ImageConfig {
  return {
    src: `/images/${category}/${filename}`,
    alt,
    width,
    height
  };
}

export const imageConfigs: Record<string, ImageConfig> = {
  wedding: {
    src: '/images/services/wedding.jpg',
    alt: 'Wedding Photography',
    width: 800,
    height: 600
  },
  portrait: {
    src: '/images/services/portrait.jpg',
    alt: 'Portrait Photography',
    width: 800,
    height: 600
  },
  event: {
    src: '/images/services/event.jpg',
    alt: 'Event Photography',
    width: 800,
    height: 600
  }
}; 