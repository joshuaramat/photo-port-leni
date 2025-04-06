export interface PlaceholderConfig {
  width: number;
  height: number;
  seed?: string;
  grayscale?: boolean;
  blur?: number;
}

export function getPlaceholderImage(config: PlaceholderConfig): string {
  const { width, height, seed, grayscale = false, blur = 0 } = config;
  const baseUrl = 'https://picsum.photos';
  
  let url = `${baseUrl}/${width}/${height}`;
  
  if (seed) {
    url += `?random=${seed}`;
  }
  
  if (grayscale) {
    url += `${seed ? '&' : '?'}grayscale`;
  }
  
  if (blur > 0) {
    url += `${seed || grayscale ? '&' : '?'}blur=${blur}`;
  }
  
  return url;
} 