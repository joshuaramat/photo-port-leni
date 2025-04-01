interface ImageConfig {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export const getImagePath = (category: 'hero' | 'about' | 'services' | 'gallery', filename: string): string => {
    return `/images/${category}/${filename}`;
};

export function getPlaceholderImage(width: number, height: number, category?: string, randomize: boolean = true): string {
    const baseUrl = 'https://picsum.photos';
    const seed = randomize ? Math.random() : 0;
    
    // Category-specific seeds for consistent but relevant images
    const categorySeeds: Record<string, number> = {
        'wedding': 0.1,
        'portrait': 0.2,
        'family': 0.3,
        'event': 0.4,
        'about': 0.5,
        'gallery': 0.6
    };

    const seedValue = category ? categorySeeds[category] || seed : seed;
    return `${baseUrl}/seed/${seedValue}/${width}/${height}`;
}

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