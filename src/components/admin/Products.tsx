"use client";

import { useState } from 'react';
import { Pencil, Trash2, X, FolderPlus, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  image: string;
  prices: {
    p05: number;
    p1: number;
    p15: number;
    p2: number;
    p3: number;
    p4: number;
    p5: number;
  };
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
}

export default function Products() {
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories');
  // const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  // const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample categories
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'cat1',
      name: 'Classic Cakes',
      description: 'Traditional and timeless cake flavors',
      image: '/product-images/vanilla cake.jpg',
      isActive: true
    },
    {
      id: 'cat2',
      name: 'Chocolate Cakes',
      description: 'Rich and decadent chocolate varieties',
      image: '/product-images/chocolate fudge.jpg',
      isActive: true
    },
    {
      id: 'cat3',
      name: 'Fruit Cakes',
      description: 'Fresh and fruity cake options',
      image: '/product-images/strawberry cake.jpg',
      isActive: true
    },
    {
      id: 'cat4',
      name: 'Specialty Cakes',
      description: 'Unique and premium cake selections',
      image: '/product-images/rainbow cake.jpg',
      isActive: true
    },
    {
      id: 'cat5',
      name: 'Meal Prep',
      description: 'Weekly meal plans and healthy prepared meals',
      image: '/product-images/vanilla cake.jpg',
      isActive: true
    },
    {
      id: 'cat6',
      name: 'Salad Dressings',
      description: 'Homemade dressings and vinaigrettes',
      image: '/product-images/vanilla cake.jpg',
      isActive: true
    },
    {
      id: 'cat7',
      name: 'Baking Classes',
      description: 'Workshops, tutorials, and cooking courses',
      image: '/product-images/vanilla cake.jpg',
      isActive: true
    },
    {
      id: 'cat8',
      name: 'Beverages',
      description: 'Smoothies, juices, coffee, and tea',
      image: '/product-images/vanilla cake.jpg',
      isActive: true
    },
    {
      id: 'cat9',
      name: 'Snacks',
      description: 'Healthy snacks, treats, and bars',
      image: '/product-images/vanilla cake.jpg',
      isActive: true
    }
  ]);

  // Sample products
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'prod1',
      name: 'Vanilla Cake',
      description: 'Classic vanilla flavor with smooth texture',
      categoryId: 'cat1',
      image: '/product-images/vanilla cake.jpg',
      prices: { p05: 1500, p1: 2600, p15: 3822, p2: 5096, p3: 7644, p4: 10192, p5: 12740 },
      isActive: true
    },
    {
      id: 'prod2',
      name: 'Chocolate Fudge',
      description: 'Rich chocolate cake with fudge frosting',
      categoryId: 'cat2',
      image: '/product-images/chocolate fudge.jpg',
      prices: { p05: 1700, p1: 3000, p15: 4410, p2: 5880, p3: 8820, p4: 11760, p5: 14700 },
      isActive: true
    },
    {
      id: 'prod3',
      name: 'Strawberry Cake',
      description: 'Fresh strawberry flavor with cream',
      categoryId: 'cat3',
      image: '/product-images/strawberry cake.jpg',
      prices: { p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
      isActive: true
    },
    {
      id: 'prod4',
      name: 'Rainbow Cake',
      description: 'Colorful layers with vanilla frosting',
      categoryId: 'cat4',
      image: '/product-images/rainbow cake.jpg',
      prices: { p05: 1800, p1: 3200, p15: 4704, p2: 6272, p3: 9408, p4: 12544, p5: 15680 },
      isActive: true
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: ''
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    categoryId: '',
    image: '',
    prices: {
      p05: 0,
      p1: 0,
      p15: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      p5: 0
    }
  });

  const handleAddCategory = () => {
    const category: Category = {
      id: `cat${Date.now()}`,
      name: newCategory.name,
      description: newCategory.description,
      image: newCategory.image,
      isActive: true
    };
    setCategories(prev => [...prev, category]);
    setNewCategory({ name: '', description: '', image: '' });
    setShowAddCategoryModal(false);
  };

  const handleAddProduct = () => {
    const product: Product = {
      id: `prod${Date.now()}`,
      name: newProduct.name,
      description: newProduct.description,
      categoryId: newProduct.categoryId,
      image: newProduct.image,
      prices: newProduct.prices,
      isActive: true
    };
    setProducts(prev => [...prev, product]);
    setNewProduct({
      name: '',
      description: '',
      categoryId: '',
      image: '',
      prices: { p05: 0, p1: 0, p15: 0, p2: 0, p3: 0, p4: 0, p5: 0 }
    });
    setShowAddProductModal(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setProducts(prev => prev.filter(prod => prod.categoryId !== id));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(prod => prod.id !== id));
  };

  const getProductsByCategory = (categoryId: string) => {
    if (categoryId === 'all') return products;
    return products.filter(product => product.categoryId === categoryId);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Products Management</h2>
          <p className="text-gray-600 text-base">Manage categories and products in your catalog.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddCategoryModal(true)}
            className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2 text-sm"
          >
            <FolderPlus size={16} />
            Add Category
          </button>
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2 text-sm"
          >
            <Package size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 text-base font-semibold border-b-2 transition-colors ${
            activeTab === 'categories' 
              ? 'border-[#c7b8ea] text-[#c7b8ea]' 
              : 'border-transparent text-gray-500 hover:text-black hover:border-[#c7b8ea]'
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 text-base font-semibold border-b-2 transition-colors ${
            activeTab === 'products' 
              ? 'border-[#c7b8ea] text-[#c7b8ea]' 
              : 'border-transparent text-gray-500 hover:text-black hover:border-[#c7b8ea]'
          }`}
        >
          Products
        </button>
      </div>

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map(category => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {products.filter(p => p.categoryId === category.id).length} products
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => {/* setEditingCategory(category) */}}
                        className="text-indigo-600 hover:text-indigo-900" 
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-900" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">0.5 kg</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">1 kg</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">1.5 kg</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2 kg</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">3 kg</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">4 kg</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">5 kg</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getProductsByCategory(selectedCategory).map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getCategoryName(product.categoryId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {product.prices.p05.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {product.prices.p1.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {product.prices.p15.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {product.prices.p2.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {product.prices.p3.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {product.prices.p4.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {product.prices.p5.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => {/* setEditingProduct(product) */}}
                          className="text-indigo-600 hover:text-indigo-900" 
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add New Category</h3>
              <button 
                onClick={() => setShowAddCategoryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                  placeholder="e.g., Meal Prep, Salad Dressings, Baking Classes, Custom Cakes, Beverages"
                />
                <p className="text-xs text-gray-500 mt-1">Enter any food-related category name</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewCategory(prev => ({ ...prev, name: 'Meal Prep' }))}
                    className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                  >
                    Meal Prep
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCategory(prev => ({ ...prev, name: 'Salad Dressings' }))}
                    className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                  >
                    Salad Dressings
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCategory(prev => ({ ...prev, name: 'Baking Classes' }))}
                    className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                  >
                    Baking Classes
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCategory(prev => ({ ...prev, name: 'Custom Cakes' }))}
                    className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                  >
                    Custom Cakes
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCategory(prev => ({ ...prev, name: 'Beverages' }))}
                    className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                  >
                    Beverages
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCategory(prev => ({ ...prev, name: 'Snacks' }))}
                    className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                  >
                    Snacks
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                  placeholder="Describe what this category includes, target audience, or special features..."
                />
                <p className="text-xs text-gray-500 mt-1">Provide a detailed description to help customers understand this category</p>
              </div>



              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Category Ideas</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• <strong>Meal Prep:</strong> Weekly meal plans, healthy options</p>
                  <p>• <strong>Salad Dressings:</strong> Homemade dressings, vinaigrettes</p>
                  <p>• <strong>Baking Classes:</strong> Workshops, tutorials, courses</p>
                  <p>• <strong>Custom Cakes:</strong> Special occasion cakes, designs</p>
                  <p>• <strong>Beverages:</strong> Smoothies, juices, coffee, tea</p>
                  <p>• <strong>Snacks:</strong> Healthy snacks, treats, bars</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategory.name}
                  className="px-3 py-1.5 bg-[#c7b8ea] text-black rounded text-sm font-semibold hover:bg-[#c7b8ea]/80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add New Product</h3>
              <button 
                onClick={() => setShowAddProductModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                  placeholder="e.g., Vanilla Cake, Chocolate Fudge, Strawberry Cake"
                />
                <p className="text-xs text-gray-500 mt-1">Enter a descriptive product name</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={newProduct.categoryId}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                >
                  <option value="">Select a category for this product</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Choose the appropriate category for this product</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                  placeholder="Describe the product, its features, ingredients, or special characteristics..."
                />
                <p className="text-xs text-gray-500 mt-1">Provide detailed information to help customers understand this product</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                  placeholder="https://example.com/product-image.jpg or leave empty for default"
                />
                <p className="text-xs text-gray-500 mt-1">Optional: Add a high-quality image for this product</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Structure (KES)</label>
                <p className="text-xs text-gray-500 mb-3">Set prices for different sizes/portions of this product</p>
                
                {/* Cake Categories - Show weight-based pricing */}
                {(newProduct.categoryId === 'cat1' || newProduct.categoryId === 'cat2' || newProduct.categoryId === 'cat3' || newProduct.categoryId === 'cat4') && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">0.5 kg / Small Cake</label>
                      <input
                        type="number"
                        value={newProduct.prices.p05}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p05: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">1 kg / Medium Cake</label>
                      <input
                        type="number"
                        value={newProduct.prices.p1}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p1: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">1.5 kg</label>
                      <input
                        type="number"
                        value={newProduct.prices.p15}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p15: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">2 kg / Large Cake</label>
                      <input
                        type="number"
                        value={newProduct.prices.p2}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p2: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">3 kg</label>
                      <input
                        type="number"
                        value={newProduct.prices.p3}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p3: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">4 kg</label>
                      <input
                        type="number"
                        value={newProduct.prices.p4}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p4: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">5 kg / Extra Large Cake</label>
                      <input
                        type="number"
                        value={newProduct.prices.p5}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p5: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Meal Prep - Show meal-based pricing */}
                {newProduct.categoryId === 'cat5' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Single Meal</label>
                      <input
                        type="number"
                        value={newProduct.prices.p05}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p05: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">3-Day Plan</label>
                      <input
                        type="number"
                        value={newProduct.prices.p1}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p1: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">5-Day Plan</label>
                      <input
                        type="number"
                        value={newProduct.prices.p15}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p15: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">7-Day Plan</label>
                      <input
                        type="number"
                        value={newProduct.prices.p2}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p2: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Family Pack (4 people)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p3}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p3: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Salad Dressings - Show bottle sizes */}
                {newProduct.categoryId === 'cat6' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Small Bottle (250ml)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p05}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p05: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Medium Bottle (500ml)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p1}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p1: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Large Bottle (1L)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p15}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p15: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Bulk Pack (2L)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p2}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p2: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Baking Classes - Show class types */}
                {newProduct.categoryId === 'cat7' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Single Class (2 hours)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p05}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p05: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">4-Week Course</label>
                      <input
                        type="number"
                        value={newProduct.prices.p1}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p1: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">8-Week Course</label>
                      <input
                        type="number"
                        value={newProduct.prices.p15}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p15: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Private Lesson</label>
                      <input
                        type="number"
                        value={newProduct.prices.p2}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p2: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Beverages - Show drink sizes */}
                {newProduct.categoryId === 'cat8' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Small (250ml)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p05}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p05: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Medium (500ml)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p1}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p1: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Large (750ml)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p15}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p15: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Family Size (1L)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p2}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p2: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Snacks - Show package sizes */}
                {newProduct.categoryId === 'cat9' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Small Pack (100g)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p05}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p05: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Medium Pack (250g)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p1}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p1: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Large Pack (500g)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p15}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p15: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Bulk Pack (1kg)</label>
                      <input
                        type="number"
                        value={newProduct.prices.p2}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          prices: { ...prev.prices, p2: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Default pricing for unselected category */}
                {!newProduct.categoryId && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">Please select a category to see relevant pricing options.</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Product Tips</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• <strong>Clear Names:</strong> Use descriptive names like &quot;Chocolate Fudge Cake&quot;</p>
                  <p>• <strong>Detailed Descriptions:</strong> Include ingredients, flavors, or special features</p>
                  <p>• <strong>Quality Images:</strong> High-quality photos help customers choose</p>
                  <p>• <strong>Flexible Pricing:</strong> Set prices for different sizes to accommodate various needs</p>
                  <p>• <strong>Category Organization:</strong> Choose the most appropriate category for easy discovery</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  disabled={!newProduct.name || !newProduct.categoryId}
                  className="px-3 py-1.5 bg-[#c7b8ea] text-black rounded text-sm font-semibold hover:bg-[#c7b8ea]/80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 