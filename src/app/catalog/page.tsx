'use client';

import { useState, useMemo } from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';

// Sample cake data - in real app this would come from API
const cakes = [
  { id: 1, name: 'Vanilla', description: 'Classic vanilla cake with smooth buttercream frosting', imageUrl: '/product-images/vanilla cake.jpg', price: 1500, size: '0.5 kg', category: 'Basic' },
  { id: 2, name: 'Eggless Cake', description: 'Delicious eggless vanilla cake perfect for everyone', imageUrl: '/product-images/eggless cake.jpg', price: 1500, size: '0.5 kg', category: 'Basic' },
  { id: 3, name: 'Vanilla Orange', description: 'Zesty orange flavor with vanilla base', imageUrl: '/product-images/vanilla orange.jpg', price: 1600, size: '0.5 kg', category: 'Basic' },
  { id: 4, name: 'Vanilla Blueberry', description: 'Fresh blueberries with vanilla cake', imageUrl: '/product-images/vanilla blueberry.jpg', price: 1600, size: '0.5 kg', category: 'Basic' },
  { id: 5, name: 'White Forest', description: 'White chocolate with cherry filling', imageUrl: '/product-images/white forest.jpg', price: 1600, size: '0.5 kg', category: 'Premium' },
  { id: 6, name: 'Marble (Vanilla Chocolate)', description: 'Beautiful marble pattern with chocolate and vanilla', imageUrl: '/product-images/marble vanilla chocolate.jpg', price: 1600, size: '0.5 kg', category: 'Premium' },
  { id: 7, name: 'Black Forest', description: 'Classic chocolate cake with cherries and cream', imageUrl: '/product-images/black forest.jpg', price: 1600, size: '0.5 kg', category: 'Premium' },
  { id: 8, name: 'Strawberry Forest', description: 'Strawberry cake with fresh strawberries', imageUrl: '/product-images/strawberry forest.jpg', price: 1600, size: '0.5 kg', category: 'Premium' },
  { id: 9, name: 'Chocolate Orange', description: 'Rich chocolate with orange zest', imageUrl: '/product-images/chocolate orange.jpg', price: 1600, size: '0.5 kg', category: 'Premium' },
  { id: 10, name: 'Lemon Cake', description: 'Tangy lemon cake with lemon glaze', imageUrl: '/product-images/lemon cake.jpg', price: 1600, size: '0.5 kg', category: 'Premium' },
  { id: 11, name: 'Red Velvet', description: 'Classic red velvet with cream cheese frosting', imageUrl: '/product-images/red velvet.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 12, name: 'Light Fruit Cake', description: 'Light fruit cake with mixed dried fruits', imageUrl: '/product-images/light fruit cake.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 13, name: 'Chocolate Fudge', description: 'Rich chocolate fudge cake', imageUrl: '/product-images/chcocolate fudge.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 14, name: 'Chocolate Mint', description: 'Chocolate cake with mint frosting', imageUrl: '/product-images/chocolate mint.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 15, name: 'Carrot Cake', description: 'Moist carrot cake with cream cheese frosting', imageUrl: '/product-images/carrot cake.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 16, name: 'Zucchini Cake', description: 'Healthy zucchini cake with nuts', imageUrl: '/product-images/zucchini cake.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 17, name: 'Pinacolada Cake', description: 'Tropical pineapple and coconut cake', imageUrl: '/product-images/pinacolada cake.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 18, name: 'Passion Cake', description: 'Passion fruit flavored cake', imageUrl: '/product-images/passion cake.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 19, name: 'Banana Cake', description: 'Moist banana cake with walnuts', imageUrl: '/product-images/banana cake.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 20, name: 'Mocha Cake', description: 'Coffee and chocolate combination', imageUrl: '/product-images/mocha cake.jpg', price: 1700, size: '0.5 kg', category: 'Specialty' },
  { id: 21, name: 'Rainbow Cake', description: 'Colorful rainbow layers with vanilla frosting', imageUrl: '/product-images/rainbow cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury' },
  { id: 22, name: 'Strawberry Cake', description: 'Fresh strawberry cake with strawberry frosting', imageUrl: '/product-images/strawberry cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury' },
  { id: 23, name: 'Coconut Cake', description: 'Coconut cake with coconut frosting', imageUrl: '/product-images/coconut cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury' },
  { id: 24, name: 'Butterscotch Cake', description: 'Butterscotch flavored cake with caramel', imageUrl: '/product-images/butterscotch cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury' },
  { id: 25, name: 'Caramel Cake', description: 'Caramel cake with caramel frosting', imageUrl: '/product-images/caramel cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury' },
  { id: 26, name: 'Orange Coconut Cake', description: 'Orange and coconut combination', imageUrl: '/product-images/orange coconut cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury' },
  { id: 27, name: 'Lemon Coconut Cake', description: 'Lemon and coconut combination', imageUrl: '/product-images/lemon coconut cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury' },
  { id: 28, name: 'Orange Poppy', description: 'Orange cake with poppy seeds', imageUrl: '/product-images/orange poppy cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury' },
  { id: 29, name: 'Lemon Poppy', description: 'Lemon cake with poppy seeds', imageUrl: '/product-images/lemon poppy cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury' },
  { id: 30, name: 'Sprinkles Confetti Cake', description: 'Fun confetti cake with sprinkles', imageUrl: '/product-images/sprinkle confetti cake.jpg', price: 2000, size: '0.5 kg', category: 'Luxury' },
  { id: 31, name: 'Mild Fruit Cake', description: 'Mild fruit cake with dried fruits', imageUrl: '/product-images/mild fruit cake.jpg', price: 2000, size: '0.5 kg', category: 'Luxury' },
  { id: 32, name: 'Chocolate Chip Cake', description: 'Vanilla cake with chocolate chips', imageUrl: '/product-images/chocolate chip cake.jpg', price: 2000, size: '0.5 kg', category: 'Luxury' },
  { id: 33, name: 'Vegan Cake', description: 'Plant-based cake for everyone', imageUrl: '/product-images/vegan cake.webp', price: 2000, size: '0.5 kg', category: 'Luxury' },
  { id: 34, name: 'Lemon Blueberry', description: 'Lemon cake with fresh blueberries', imageUrl: '/product-images/lemon blueberry cake.jpg', price: 2000, size: '0.5 kg', category: 'Luxury' },
  { id: 35, name: 'Rich Fruit Cake', description: 'Traditional rich fruit cake', imageUrl: '/product-images/rich fruit cake.jpg', price: 2300, size: '0.5 kg', category: 'Premium' },
  { id: 36, name: 'Solo Slice Set', description: 'Perfect individual slice portions', imageUrl: '/product-images/custom loaves.jpg', price: 1800, size: '0.5 kg', category: 'Basic' },
];

const categories = ['All', 'Basic', 'Premium', 'Specialty', 'Luxury'];
const sizes = ['0.5 kg', '1 kg', '1.5 kg', '2 kg', '3 kg', '4 kg', '5 kg'];

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('0.5 kg');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCakes = useMemo(() => {
    return cakes.filter(cake => {
      const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cake.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || cake.category === selectedCategory;
      const matchesSize = cake.size === selectedSize;
      
      return matchesSearch && matchesCategory && matchesSize;
    }).sort((a, b) => {
      // Always put Solo Slice Set first
      if (a.name === 'Solo Slice Set') return -1;
      if (b.name === 'Solo Slice Set') return 1;
      
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [searchTerm, selectedCategory, selectedSize, sortBy]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-white via-pink-50 to-purple-50 py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col items-center">
            <h1 className="font-pacifico text-5xl md:text-6xl leading-tight text-black font-normal">
              Baked. Boxed. Delivered.
            </h1>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cakes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 shadow focus:shadow-lg border border-gray-200 focus:ring-2 focus:ring-[#c7b8ea] focus:border-[#c7b8ea] transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCakes.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No cakes found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredCakes.map(cake => (
                  <ProductCard
                    key={cake.id}
                    id={cake.id}
                    name={cake.name}
                    description={cake.description}
                    imageUrl={cake.imageUrl}
                    price={cake.price}
                    size={cake.size}
                  />
                ))}
              </div>
              <div className="mt-6">
                <p className="text-gray-600">Showing {filteredCakes.length} of {cakes.length} cakes</p>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
} 