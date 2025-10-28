'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon, Tag, Package } from 'lucide-react';
import Image from 'next/image';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminDecorationsStore } from '@/store/slices/admin/decorations';
import { Decoration, DecorationCategory } from '@/types/shop/catalog/decorations';

function DecorationsContent() {
  const {
    decorations,
    categories,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting: _isDeleting,
    error,
    selectedCategory,
    showCategoryForm,
    showDecorationForm,
    loadCategories,
    loadDecorations,
    createCategory,
    updateCategory,
    deleteCategory,
    createDecoration,
    updateDecoration,
    deleteDecoration,
    setSelectedCategory,
    setShowCategoryForm,
    setShowDecorationForm,
    clearError,
    getDecorationsByCategory
  } = useAdminDecorationsStore();

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '',
    description: ''
  });
  const [decorationForm, setDecorationForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    available: true
  });
  const [editingCategory, setEditingCategory] = useState<DecorationCategory | null>(null);
  const [editingDecoration, setEditingDecoration] = useState<Decoration | null>(null);

  // Load data on mount
  useEffect(() => {
    loadCategories();
    loadDecorations();
  }, [loadCategories, loadDecorations]);

  // Category handlers
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim() || !categoryForm.icon.trim()) return;
    
    await createCategory({
      id: `cat_${Date.now()}`,
      name: categoryForm.name,
      icon: categoryForm.icon
    });
    
    setCategoryForm({ name: '', icon: '', description: '' });
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !categoryForm.name.trim() || !categoryForm.icon.trim()) return;
    
    await updateCategory(editingCategory.id, {
      name: categoryForm.name,
      icon: categoryForm.icon
    });
    
    setEditingCategory(null);
    setCategoryForm({ name: '', icon: '', description: '' });
    setShowCategoryForm(false);
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Are you sure you want to delete this category? This will also delete all decorations in this category.')) {
      await deleteCategory(id);
    }
  };

  const handleEditCategory = (category: DecorationCategory) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      icon: category.icon,
      description: ''
    });
    setShowCategoryForm(true);
  };

  // Decoration handlers
  const handleCreateDecoration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decorationForm.name.trim() || !selectedCategory) return;
    
    await createDecoration(decorationForm, selectedCategory);
    
    setDecorationForm({
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      available: true
    });
  };

  const handleUpdateDecoration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDecoration) return;
    
    await updateDecoration(editingDecoration.id, decorationForm);
    
    setEditingDecoration(null);
    setDecorationForm({
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      available: true
    });
    setShowDecorationForm(false);
  };

  const handleDeleteDecoration = async (id: number) => {
    if (confirm('Are you sure you want to delete this decoration?')) {
      await deleteDecoration(id);
    }
  };

  const handleEditDecoration = (decoration: Decoration) => {
    setEditingDecoration(decoration);
    setDecorationForm({
      name: decoration.name,
      description: decoration.description,
      imageUrl: decoration.imageUrl,
      price: decoration.price,
      available: decoration.available
    });
    setShowDecorationForm(true);
  };

  const filteredDecorations = selectedCategory 
    ? getDecorationsByCategory(selectedCategory)
    : decorations;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎨 Decorations Management</h1>
        <p className="text-gray-600">Manage decoration categories and individual decorations</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-800">{error}</p>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CATEGORIES SECTION */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
            </div>
            <button
              onClick={() => {
                setEditingCategory(null);
                setCategoryForm({ name: '', icon: '', description: '' });
                setShowCategoryForm(!showCategoryForm);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Category Form */}
        {showCategoryForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                    placeholder="Category name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                    placeholder="e.g., 🌸"
                    required
                  />
                </div>
                <div className="flex items-end space-x-2">
                  <button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingCategory ? 'Update' : 'Create'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryForm(false);
                      setEditingCategory(null);
                      setCategoryForm({ name: '', icon: '', description: '' });
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Categories List */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c7b8ea] mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{category.decorations.length} decorations</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DECORATIONS SECTION */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Decorations</h2>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setEditingDecoration(null);
                  setDecorationForm({
                    name: '',
                    description: '',
                    imageUrl: '',
                    price: 0,
                    available: true
                  });
                  setShowDecorationForm(!showDecorationForm);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Decoration</span>
              </button>
            </div>
          </div>
        </div>

        {/* Decoration Form */}
        {showDecorationForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={editingDecoration ? handleUpdateDecoration : handleCreateDecoration} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={decorationForm.name}
                    onChange={(e) => setDecorationForm({ ...decorationForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                    placeholder="Decoration name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
                  <input
                    type="number"
                    value={decorationForm.price}
                    onChange={(e) => setDecorationForm({ ...decorationForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={decorationForm.available}
                      onChange={(e) => setDecorationForm({ ...decorationForm, available: e.target.checked })}
                      className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                    />
                    <span className="text-sm text-gray-700">Available</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={decorationForm.description}
                    onChange={(e) => setDecorationForm({ ...decorationForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                    placeholder="Decoration description"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={decorationForm.imageUrl}
                    onChange={(e) => setDecorationForm({ ...decorationForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                    placeholder="/product-images/decoration.jpg"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="submit"
                  disabled={isCreating || isUpdating || !selectedCategory}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingDecoration ? 'Update' : 'Create'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowDecorationForm(false);
                    setEditingDecoration(null);
                    setDecorationForm({
                      name: '',
                      description: '',
                      imageUrl: '',
                      price: 0,
                      available: true
                    });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Decorations List */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c7b8ea] mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading decorations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDecorations.map((decoration) => (
                <div key={decoration.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    {decoration.imageUrl ? (
                      <Image
                        src={decoration.imageUrl}
                        alt={decoration.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{decoration.name}</h3>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEditDecoration(decoration)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDecoration(decoration.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{decoration.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">KES {decoration.price.toLocaleString()}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        decoration.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {decoration.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDecorationsPage() {
  return (
    <AdminLayout 
      title="Decorations Management" 
      description="Manage decoration categories and individual decorations"
    >
      <DecorationsContent />
    </AdminLayout>
  );
}
