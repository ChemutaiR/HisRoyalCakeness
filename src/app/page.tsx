'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import InfiniteScrollCards from '@/components/InfiniteScrollCards';
import { useCatalogStore } from '@/store/slices/shop/catalog';
import Promotions from '@/components/home/Promotions';

const primaryButton =
  'bg-[#c7b8ea] text-black text-base px-8 py-3 rounded-full font-semibold transition-colors hover:bg-[#c7b8ea]/80 shadow';

export default function Page() {
  const router = useRouter();
  const { cakes, loadCakes } = useCatalogStore();

  // Load cakes on mount
  useEffect(() => {
    loadCakes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // loadCakes is stable from Zustand store

  const handleShopNow = () => {
    router.push('/shop/catalog');
  };

  // Get featured cakes from centralized store
  const featuredCakes = cakes.filter(cake => cake.featured).slice(0, 4);

  return (
    <main className="min-h-screen bg-white text-black font-work-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[520px] md:h-[640px] flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-top sm:bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-light italic mb-4 font-pacifico">A Slice Above the Rest</h1>
          <p className="text-xl md:text-2xl mb-8 italic font-light font-pacifico">Discover cakes and pastries fit for royalty—baked with passion, served with elegance.</p>
          <button onClick={handleShopNow} className={primaryButton}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Promotions Section */}
      <Promotions />

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-normal text-center mb-12 font-pacifico">Our Signature Creations</h2>
          
          {/* Mobile: Infinite Horizontal Scroll */}
          <div className="md:hidden">
            <InfiniteScrollCards cakes={featuredCakes} />
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-4 gap-8">
            {featuredCakes.map((cake) => (
              <ProductCard 
                key={cake.id} 
                id={cake.id}
                name={cake.name}
                description={cake.description}
                imageUrl={cake.image}
                minPrice={Math.min(...cake.prices.map(p => p.amount))}
                maxPrice={Math.max(...cake.prices.map(p => p.amount))}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 