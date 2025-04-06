export interface ImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function getImageConfig(
  imageId: string,
  filename: string,
  alt: string,
  width: number,
  height: number
): ImageConfig {
  return {
    src: `/images/services/${filename}`,
    alt,
    width,
    height
  };
} 