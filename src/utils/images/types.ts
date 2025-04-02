export interface ImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  loading?: 'lazy' | 'eager';
}

export interface ImageCategory {
  id: string;
  name: string;
  description: string;
  filename: string;
}

export interface ResponsiveImageOptions {
  width?: number;
  height?: number;
  priority?: boolean;
  category?: string;
} 