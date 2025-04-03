import type { GalleryItem } from '../types';
import { getResponsiveImageConfig } from '../../../utils/images/config';

interface GallerySlideProps {
  item: GalleryItem;
  isActive: boolean;
  priority?: boolean;
}

export function GallerySlide({ item, isActive, priority = false }: GallerySlideProps) {
  const imageConfig = getResponsiveImageConfig(
    'gallery',
    item.filename,
    item.title,
    { priority, category: item.imageId }
  );

  return (
    <div 
      className="w-full flex-shrink-0 px-4 sm:px-8"
      role="group"
      aria-roledescription="slide"
      aria-label={`${item.title} - ${item.description}`}
    >
      <div className="relative group rounded-2xl overflow-hidden">
        <img
          {...imageConfig}
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-2xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl">
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 font-['Cormorant_Garamond'] text-primary/90">
              {item.title}
            </h3>
            <p className="text-base sm:text-lg font-light opacity-90">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 