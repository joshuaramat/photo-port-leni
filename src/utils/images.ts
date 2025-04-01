interface ImageConfig {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export const getImagePath = (category: 'hero' | 'about' | 'services' | 'gallery', filename: string): string => {
    return `/images/${category}/${filename}`;
};

export const getPlaceholderImage = (width: number, height: number, random?: number): string => {
    const randomParam = random ? `?random=${random}` : '';
    return `https://picsum.photos/${width}/${height}${randomParam}`;
};

export const getImageConfig = (
    category: 'hero' | 'about' | 'services' | 'gallery',
    filename: string,
    alt: string,
    width: number,
    height: number,
    usePlaceholder: boolean = true
): ImageConfig => {
    return {
        src: usePlaceholder ? getPlaceholderImage(width, height) : getImagePath(category, filename),
        alt,
        width,
        height
    };
}; 