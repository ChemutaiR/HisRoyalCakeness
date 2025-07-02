'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const primaryButton =
  'bg-[#c7b8ea] text-black text-base px-8 py-3 rounded-full font-semibold transition-colors hover:bg-[#c7b8ea]/80 shadow';
const secondaryButton =
  'bg-white text-black text-base border border-[#c7b8ea] px-8 py-3 rounded-full font-semibold transition-colors hover:bg-[#c7b8ea] hover:text-black';
const cardPrimaryButton =
  'bg-[#c7b8ea] text-black text-base px-4 py-2 rounded-full font-semibold transition-colors hover:bg-[#c7b8ea]/80 shadow';

export default function Page() {
  const router = useRouter();

  const handleShopNow = () => {
    router.push('/catalog');
  };

  return (
    <main className="min-h-screen bg-white text-black font-work-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-light italic mb-4 font-pacifico">A Slice Above the Rest</h1>
          <p className="text-xl md:text-2xl mb-8 italic font-light font-pacifico">Discover cakes and pastries fit for royalty—baked with passion, served with elegance.</p>
          <button onClick={handleShopNow} className={primaryButton}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-normal text-center mb-12 font-pacifico">Our Signature Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Use ProductCard for signature cakes */}
            {[
              {
                id: 7,
                name: 'Black Forest',
                description: 'Classic chocolate cake with cherries and cream',
                imageUrl: '/product-images/black forest.jpg',
                price: 1600,
                size: '0.5 kg',
              },
              {
                id: 11,
                name: 'Red Velvet',
                description: 'Classic red velvet with cream cheese frosting',
                imageUrl: '/product-images/red velvet.jpg',
                price: 1700,
                size: '0.5 kg',
              },
              {
                id: 21,
                name: 'Rainbow Cake',
                description: 'Colorful rainbow layers with vanilla frosting',
                imageUrl: '/product-images/rainbow cake.jpg',
                price: 1800,
                size: '0.5 kg',
              },
              {
                id: 24,
                name: 'Butterscotch Cake',
                description: 'Butterscotch flavored cake with caramel',
                imageUrl: '/product-images/butterscotch cake.jpg',
                price: 1800,
                size: '0.5 kg',
              },
            ].map((cake) => (
              <ProductCard key={cake.id} {...cake} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 