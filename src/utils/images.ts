export interface ImageConfig {
    src: string;
    alt: string;
    width: number;
    height: number;
    sizes?: string;
}

export function getImagePath(category: string, filename: string): string {
    return `/images/${category}/${filename}`;
}

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
        'gallery': 0.6,
        'couple': 0.7,
        'lifestyle': 0.8,
        'maternity': 0.9,
        'commercial': 1.0,
        'art': 1.1
    };

    const seedValue = category ? categorySeeds[category] || seed : seed;
    return `${baseUrl}/seed/${seedValue}/${width}/${height}`;
}

export function getImageConfig(
    category: string,
    filename: string,
    alt: string,
    width: number,
    height: number,
    usePlaceholder: boolean = true,
    imageCategory?: string
): ImageConfig {
    return {
        src: usePlaceholder ? getPlaceholderImage(width, height, imageCategory) : getImagePath(category, filename),
        alt,
        width,
        height
    };
}

export function getResponsiveImageConfig(
    category: string,
    filename: string,
    alt: string,
    baseWidth: number,
    baseHeight: number,
    usePlaceholder: boolean = true,
    imageCategory?: string
): ImageConfig {
    // Calculate responsive sizes
    const sizes = {
        sm: { width: baseWidth * 0.5, height: baseHeight * 0.5 },
        md: { width: baseWidth * 0.75, height: baseHeight * 0.75 },
        lg: { width: baseWidth, height: baseHeight }
    };

    return {
        src: usePlaceholder ? getPlaceholderImage(sizes.lg.width, sizes.lg.height, imageCategory) : getImagePath(category, filename),
        alt,
        width: sizes.lg.width,
        height: sizes.lg.height,
        sizes: `(max-width: 640px) ${sizes.sm.width}px, (max-width: 1024px) ${sizes.md.width}px, ${sizes.lg.width}px`
    };
} 