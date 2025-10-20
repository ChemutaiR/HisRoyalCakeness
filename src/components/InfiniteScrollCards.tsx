'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface Cake {
  id: number;
  name: string;
  description: string;
  image: string;
  prices: Array<{ weight: string; amount: number; servings: number }>;
  featured: boolean;
}

interface InfiniteScrollCardsProps {
  cakes: Cake[];
}

const InfiniteScrollCards = ({ cakes }: InfiniteScrollCardsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [, setCanScrollLeft] = useState(false);
  const [, setCanScrollRight] = useState(true);

  // Duplicate the cakes array to create seamless infinite scroll
  const duplicatedCakes = [...cakes, ...cakes];

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = 288 + 24; // w-72 (288px) + gap-6 (24px)
    container.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = 288 + 24; // w-72 (288px) + gap-6 (24px)
    container.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      checkScrollButtons();
      
      // Reset scroll position when we've scrolled through one set of cards
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    };

    container.addEventListener('scroll', handleScroll);
    checkScrollButtons();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {duplicatedCakes.map((cake, index) => (
          <div key={`${cake.id}-${index}`} className="flex-shrink-0 w-72">
            <ProductCard 
              id={cake.id}
              name={cake.name}
              description={cake.description}
              imageUrl={cake.image}
              minPrice={Math.min(...cake.prices.map(p => p.amount))}
              maxPrice={Math.max(...cake.prices.map(p => p.amount))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollCards;
