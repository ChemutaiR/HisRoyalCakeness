'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Search, X, SlidersHorizontal } from 'lucide-react';

// Sample product data - in real app this would come from API
const products = [
  // Classic Cakes
  { id: 1, name: 'Vanilla', description: 'Classic vanilla cake with smooth buttercream frosting', imageUrl: '/product-images/vanilla cake.jpg', price: 1500, size: '0.5 kg', category: 'Classic Cakes', subcategory: 'Vanilla' },
  { id: 2, name: 'Eggless Cake', description: 'Delicious eggless vanilla cake perfect for everyone', imageUrl: '/product-images/eggless cake.jpg', price: 1500, size: '0.5 kg', category: 'Classic Cakes', subcategory: 'Eggless' },
  { id: 3, name: 'Vanilla Orange', description: 'Zesty orange flavor with vanilla base', imageUrl: '/product-images/vanilla orange.jpg', price: 1600, size: '0.5 kg', category: 'Classic Cakes', subcategory: 'Citrus' },
  { id: 4, name: 'Vanilla Blueberry', description: 'Fresh blueberries with vanilla cake', imageUrl: '/product-images/vanilla blueberry.jpg', price: 1600, size: '0.5 kg', category: 'Classic Cakes', subcategory: 'Berry' },
  { id: 6, name: 'Marble (Vanilla Chocolate)', description: 'Beautiful marble pattern with chocolate and vanilla', imageUrl: '/product-images/marble vanilla chocolate.jpg', price: 1600, size: '0.5 kg', category: 'Classic Cakes', subcategory: 'Marble' },
  { id: 32, name: 'Chocolate Chip Cake', description: 'Vanilla cake with chocolate chips', imageUrl: '/product-images/chocolate chip cake.jpg', price: 2000, size: '0.5 kg', category: 'Classic Cakes', subcategory: 'Chocolate Chip' },
  { id: 36, name: 'Solo Slice Set', description: 'Perfect individual slice portions', imageUrl: '/product-images/custom loaves.jpg', price: 1800, size: '0.5 kg', category: 'Classic Cakes', subcategory: 'Individual' },

  // Chocolate Cakes
  { id: 7, name: 'Black Forest', description: 'Classic chocolate cake with cherries and cream', imageUrl: '/product-images/black forest.jpg', price: 1600, size: '0.5 kg', category: 'Chocolate Cakes', subcategory: 'Classic' },
  { id: 13, name: 'Chocolate Fudge', description: 'Rich chocolate fudge cake', imageUrl: '/product-images/chcocolate fudge.jpg', price: 1700, size: '0.5 kg', category: 'Chocolate Cakes', subcategory: 'Fudge' },
  { id: 9, name: 'Chocolate Orange', description: 'Rich chocolate with orange zest', imageUrl: '/product-images/chocolate orange.jpg', price: 1600, size: '0.5 kg', category: 'Chocolate Cakes', subcategory: 'Citrus' },
  { id: 14, name: 'Chocolate Mint', description: 'Chocolate cake with mint frosting', imageUrl: '/product-images/chocolate mint.jpg', price: 1700, size: '0.5 kg', category: 'Chocolate Cakes', subcategory: 'Mint' },
  { id: 20, name: 'Mocha Cake', description: 'Coffee and chocolate combination', imageUrl: '/product-images/mocha cake.jpg', price: 1700, size: '0.5 kg', category: 'Chocolate Cakes', subcategory: 'Coffee' },

  // Fruit Cakes
  { id: 8, name: 'Strawberry Forest', description: 'Strawberry cake with fresh strawberries', imageUrl: '/product-images/strawberry forest.jpg', price: 1600, size: '0.5 kg', category: 'Fruit Cakes', subcategory: 'Strawberry' },
  { id: 22, name: 'Strawberry Cake', description: 'Fresh strawberry cake with strawberry frosting', imageUrl: '/product-images/strawberry cake.jpg', price: 1800, size: '0.5 kg', category: 'Fruit Cakes', subcategory: 'Strawberry' },
  { id: 5, name: 'White Forest', description: 'White chocolate with cherry filling', imageUrl: '/product-images/white forest.jpg', price: 1600, size: '0.5 kg', category: 'Fruit Cakes', subcategory: 'Cherry' },
  { id: 19, name: 'Banana Cake', description: 'Moist banana cake with walnuts', imageUrl: '/product-images/banana cake.jpg', price: 1700, size: '0.5 kg', category: 'Fruit Cakes', subcategory: 'Banana' },
  { id: 34, name: 'Lemon Blueberry', description: 'Lemon cake with fresh blueberries', imageUrl: '/product-images/lemon blueberry cake.jpg', price: 2000, size: '0.5 kg', category: 'Fruit Cakes', subcategory: 'Blueberry' },

  // Citrus Cakes
  { id: 10, name: 'Lemon Cake', description: 'Tangy lemon cake with lemon glaze', imageUrl: '/product-images/lemon cake.jpg', price: 1600, size: '0.5 kg', category: 'Citrus Cakes', subcategory: 'Lemon' },
  { id: 17, name: 'Pinacolada Cake', description: 'Tropical pineapple and coconut cake', imageUrl: '/product-images/pinacolada cake.jpg', price: 1700, size: '0.5 kg', category: 'Citrus Cakes', subcategory: 'Pineapple' },
  { id: 18, name: 'Passion Cake', description: 'Passion fruit flavored cake', imageUrl: '/product-images/passion cake.jpg', price: 1700, size: '0.5 kg', category: 'Citrus Cakes', subcategory: 'Passion Fruit' },
  { id: 28, name: 'Orange Poppy', description: 'Orange cake with poppy seeds', imageUrl: '/product-images/orange poppy cake.jpg', price: 1800, size: '0.5 kg', category: 'Citrus Cakes', subcategory: 'Orange' },
  { id: 29, name: 'Lemon Poppy', description: 'Lemon cake with poppy seeds', imageUrl: '/product-images/lemon poppy cake.jpg', price: 1800, size: '0.5 kg', category: 'Citrus Cakes', subcategory: 'Lemon' },

  // Specialty Cakes
  { id: 11, name: 'Red Velvet', description: 'Classic red velvet with cream cheese frosting', imageUrl: '/product-images/red velvet.jpg', price: 1700, size: '0.5 kg', category: 'Specialty Cakes', subcategory: 'Red Velvet' },
  { id: 15, name: 'Carrot Cake', description: 'Moist carrot cake with cream cheese frosting', imageUrl: '/product-images/carrot cake.jpg', price: 1700, size: '0.5 kg', category: 'Specialty Cakes', subcategory: 'Carrot' },
  { id: 16, name: 'Zucchini Cake', description: 'Healthy zucchini cake with nuts', imageUrl: '/product-images/zucchini cake.jpg', price: 1700, size: '0.5 kg', category: 'Specialty Cakes', subcategory: 'Zucchini' },
  { id: 33, name: 'Vegan Cake', description: 'Plant-based cake for everyone', imageUrl: '/product-images/vegan cake.webp', price: 2000, size: '0.5 kg', category: 'Specialty Cakes', subcategory: 'Vegan' },

  // Luxury Cakes
  { id: 21, name: 'Rainbow Cake', description: 'Colorful rainbow layers with vanilla frosting', imageUrl: '/product-images/rainbow cake.jpg', price: 1800, size: '0.5 kg', category: 'Luxury Cakes', subcategory: 'Rainbow' },
  { id: 30, name: 'Sprinkles Confetti Cake', description: 'Fun confetti cake with sprinkles', imageUrl: '/product-images/sprinkle confetti cake.jpg', price: 2000, size: '0.5 kg', category: 'Luxury Cakes', subcategory: 'Confetti' },

  // Coconut Cakes
  { id: 23, name: 'Coconut Cake', description: 'Coconut cake with coconut frosting', imageUrl: '/product-images/coconut cake.jpg', price: 1800, size: '0.5 kg', category: 'Coconut Cakes', subcategory: 'Classic' },
  { id: 26, name: 'Orange Coconut Cake', description: 'Orange and coconut combination', imageUrl: '/product-images/orange coconut cake.jpg', price: 1800, size: '0.5 kg', category: 'Coconut Cakes', subcategory: 'Orange' },
  { id: 27, name: 'Lemon Coconut Cake', description: 'Lemon and coconut combination', imageUrl: '/product-images/lemon coconut cake.jpg', price: 1800, size: '0.5 kg', category: 'Coconut Cakes', subcategory: 'Lemon' },

  // Caramel & Butterscotch Cakes
  { id: 24, name: 'Butterscotch Cake', description: 'Butterscotch flavored cake with caramel', imageUrl: '/product-images/butterscotch cake.jpg', price: 1800, size: '0.5 kg', category: 'Caramel Cakes', subcategory: 'Butterscotch' },
  { id: 25, name: 'Caramel Cake', description: 'Caramel cake with caramel frosting', imageUrl: '/product-images/caramel cake.jpg', price: 1800, size: '0.5 kg', category: 'Caramel Cakes', subcategory: 'Caramel' },

  // Fruit & Nut Cakes
  { id: 12, name: 'Light Fruit Cake', description: 'Light fruit cake with mixed dried fruits', imageUrl: '/product-images/light fruit cake.jpg', price: 1700, size: '0.5 kg', category: 'Fruit & Nut Cakes', subcategory: 'Light Fruit' },
  { id: 31, name: 'Mild Fruit Cake', description: 'Mild fruit cake with dried fruits', imageUrl: '/product-images/mild fruit cake.jpg', price: 2000, size: '0.5 kg', category: 'Fruit & Nut Cakes', subcategory: 'Mild Fruit' },
  { id: 35, name: 'Rich Fruit Cake', description: 'Traditional rich fruit cake', imageUrl: '/product-images/rich fruit cake.jpg', price: 2300, size: '0.5 kg', category: 'Fruit & Nut Cakes', subcategory: 'Rich Fruit' },
];

const categories = ['All', 'Classic Cakes', 'Chocolate Cakes', 'Fruit Cakes', 'Citrus Cakes', 'Specialty Cakes', 'Luxury Cakes', 'Coconut Cakes', 'Caramel Cakes', 'Fruit & Nut Cakes'];
const subcategories = {
  'Classic Cakes': ['All', 'Vanilla', 'Eggless', 'Citrus', 'Berry', 'Marble', 'Chocolate Chip', 'Individual'],
  'Chocolate Cakes': ['All', 'Classic', 'Fudge', 'Citrus', 'Mint', 'Coffee'],
  'Fruit Cakes': ['All', 'Strawberry', 'Cherry', 'Banana', 'Blueberry'],
  'Citrus Cakes': ['All', 'Lemon', 'Pineapple', 'Passion Fruit', 'Orange'],
  'Specialty Cakes': ['All', 'Red Velvet', 'Carrot', 'Zucchini', 'Vegan'],
  'Luxury Cakes': ['All', 'Rainbow', 'Confetti'],
  'Coconut Cakes': ['All', 'Classic', 'Orange', 'Lemon'],
  'Caramel Cakes': ['All', 'Butterscotch', 'Caramel'],
  'Fruit & Nut Cakes': ['All', 'Light Fruit', 'Mild Fruit', 'Rich Fruit']
};
const sizes = ['All', '0.5 kg', '1 kg', '1.5 kg', '2 kg', '3 kg', '4 kg', '5 kg'];

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('name');
  const [showSidebar, setShowSidebar] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSubcategory = selectedSubcategory === 'All' || product.subcategory === selectedSubcategory;
      const matchesSize = selectedSize === 'All' || product.size === selectedSize;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesSubcategory && matchesSize && matchesPrice;
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
  }, [searchTerm, selectedCategory, selectedSubcategory, selectedSize, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setSelectedSize('All');
    setPriceRange([0, 10000]);
    setSortBy('name');
  };

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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 shadow focus:shadow-lg border-2 border-gray-200 focus:border-[#c7b8ea] focus:outline-none transition-colors duration-150 ease-in-out"
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowSidebar(true)}
              className="lg:hidden bg-[#c7b8ea] text-black px-4 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 pr-8 rounded-lg border-2 border-gray-200 focus:border-[#c7b8ea] focus:outline-none appearance-none bg-white transition-colors duration-150 ease-in-out"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${showSidebar ? 'block' : 'hidden'}`} onClick={() => setShowSidebar(false)} />
          <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:relative lg:transform-none ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setSelectedSubcategory('All');
                        }}
                        className="mr-2 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategory Filter */}
              {selectedCategory !== 'All' && subcategories[selectedCategory as keyof typeof subcategories] && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Subcategory</h3>
                  <div className="space-y-2">
                    {subcategories[selectedCategory as keyof typeof subcategories].map(subcategory => (
                      <label key={subcategory} className="flex items-center">
                        <input
                          type="radio"
                          name="subcategory"
                          value={subcategory}
                          checked={selectedSubcategory === subcategory}
                          onChange={(e) => setSelectedSubcategory(e.target.value)}
                          className="mr-2 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                        />
                        <span className="text-sm text-gray-700">{subcategory}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-3 py-2 pr-8 border-2 border-gray-300 rounded-lg focus:border-[#c7b8ea] focus:outline-none appearance-none bg-white transition-colors duration-150 ease-in-out"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>KES {priceRange[0].toLocaleString()}</span>
                    <span>KES {priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    price={product.price}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 