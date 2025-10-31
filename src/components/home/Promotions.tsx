"use client";

import Image from 'next/image';
import { Tag, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useRef, useCallback, useEffect, useState } from 'react';

type Promotion = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  validUntil?: string; // ISO date
};

const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Royal Weekend Sale',
    subtitle: 'Up to 20% off selected cakes',
    // No image poster for current active promotion
    badge: '-20%',
    validUntil: '2999-12-31',
    ctaHref: '/shop/catalog?promoId=promo-1'
  },
  {
    id: 'promo-2',
    title: 'Buy 2, Get 1 Free',
    subtitle: 'Cupcakes assorted box',
    image: '/product-images/red velvet.jpg',
    badge: 'BOGO',
    validUntil: '2000-01-01',
    ctaHref: '/shop/catalog?promoId=promo-2'
  },
  {
    id: 'promo-3',
    title: 'New Seasonal Flavors',
    subtitle: 'Limited edition – try them today',
    image: '/product-images/black forest.jpg',
    badge: 'New',
    validUntil: '2000-01-01',
    ctaHref: '/shop/catalog?promoId=promo-3'
  }
];

export default function Promotions() {
  const promotions = useMemo(() => mockPromotions, []);
  const today = useMemo(() => new Date(), []);
  const activePromotions = useMemo(
    () => promotions.filter(p => !p.validUntil || new Date(p.validUntil) >= today),
    [promotions, today]
  );

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollByAmount = useCallback((direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth + 16 : el.clientWidth; // 16 ~ gap
      const idx = Math.round(el.scrollLeft / Math.max(cardWidth, 1));
      setActiveIndex(Math.max(0, Math.min(idx, activePromotions.length - 1)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [activePromotions.length]);

  if (!activePromotions.length) return null;

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#c7b8ea]" />
            <h2 className="text-2xl md:text-3xl font-semibold">Current Promotions</h2>
          </div>
          <a href="/shop/catalog" className="text-sm md:text-base text-[#7a63c2] hover:text-[#5d49a8]">Shop all</a>
        </div>

        {activePromotions.length <= 4 ? (
          <div
            className={
              activePromotions.length === 1
                ? 'grid grid-cols-1 gap-5 md:gap-6'
                : activePromotions.length === 2
                ? 'grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6'
                : activePromotions.length === 3
                ? 'grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6'
            }
          >
            {activePromotions.map((promo) => (
              <a
                key={promo.id}
                href={promo.ctaHref || '/shop/catalog'}
                className="group block rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:border-[#c7b8ea] hover:shadow-md transition-shadow bg-white"
              >
                {promo.image && (
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    {promo.badge && (
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-white text-gray-900 shadow border border-gray-200">
                        <Tag className="w-3 h-3" />
                        {promo.badge}
                      </div>
                    )}
                  </div>
                )}
                <div className={promo.image ? 'p-4' : 'p-5'}>
                  {!promo.image && promo.badge && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-[#f3effd] text-gray-900 border border-gray-200 mb-2">
                      <Tag className="w-3 h-3" />
                      {promo.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{promo.title}</h3>
                  {promo.subtitle && <p className="text-sm text-gray-600 mt-1">{promo.subtitle}</p>}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#7a63c2] group-hover:text-[#5d49a8] transition-colors">Shop now</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#7a63c2] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByAmount('left')}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-[#c7b8ea] text-black hover:bg-[#c7b8ea]/90 rounded-full p-2 shadow transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 scrollbar-hide relative"
              role="region"
              aria-label="Promotions carousel"
            >
              <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />
              {activePromotions.map((promo) => (
                <a
                  key={promo.id}
                  href={promo.ctaHref || '/shop/catalog'}
                  className="group block rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:border-[#c7b8ea] hover:shadow-md transition-shadow bg-white snap-start flex-none w-[85%] sm:w-[60%] lg:w-[33%]"
                >
                  {promo.image && (
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={promo.image}
                        alt={promo.title}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      {promo.badge && (
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-white text-gray-900 shadow border border-gray-200">
                          <Tag className="w-3 h-3" />
                          {promo.badge}
                        </div>
                      )}
                    </div>
                  )}
                  <div className={promo.image ? 'p-4' : 'p-5'}>
                    {!promo.image && promo.badge && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-[#f3effd] text-gray-900 border border-gray-200 mb-2">
                        <Tag className="w-3 h-3" />
                        {promo.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">{promo.title}</h3>
                    {promo.subtitle && (
                      <p className="text-sm text-gray-600 mt-1">{promo.subtitle}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-[#7a63c2] group-hover:text-[#5d49a8] transition-colors">Shop now</span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-[#7a63c2] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByAmount('right')}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-[#c7b8ea] text-black hover:bg-[#c7b8ea]/90 rounded-full p-2 shadow transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {activePromotions.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {activePromotions.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition-colors ${i === activeIndex ? 'bg-[#7a63c2]' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}


