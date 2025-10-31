'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminDecorationsStore } from '@/store/slices/admin/decorations';
import { Decoration, DecorationCategory } from '@/types/shop/catalog/decorations';
import CategoriesSection from './CategoriesSection';
import DecorationsSection from './DecorationsSection';
import DecorationForm from './DecorationForm';
import { useDecorationForms } from '@/hooks/admin/decorations/useDecorationForms';
import { useDecorationImage } from '@/hooks/admin/decorations/useDecorationImage';

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

  // Form state management via hooks
  const {
    categoryForm,
    editingCategory,
    setCategoryForm,
    setEditingCategory: _setEditingCategory,
    resetCategoryForm,
    populateCategoryForm,
    updateCategoryForm: _updateCategoryForm,
    decorationForm,
    editingDecoration,
    setDecorationForm: _setDecorationForm,
    setEditingDecoration: _setEditingDecoration,
    resetDecorationForm,
    populateDecorationForm,
    updateDecorationForm,
  } = useDecorationForms();

  const {
    imageFile: _imageFile,
    fileInputRef,
    setImageFile,
  } = useDecorationImage();

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
    
    resetCategoryForm();
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !categoryForm.name.trim() || !categoryForm.icon.trim()) return;
    
    await updateCategory(editingCategory.id, {
      name: categoryForm.name,
      icon: categoryForm.icon
    });
    
    resetCategoryForm();
    setShowCategoryForm(false);
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Are you sure you want to delete this category? This will also delete all decorations in this category.')) {
      await deleteCategory(id);
    }
  };

  const handleEditCategory = (category: DecorationCategory) => {
    populateCategoryForm(category);
    setShowCategoryForm(true);
  };

  // Decoration handlers
  const handleCreateDecoration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decorationForm.name.trim() || !selectedCategory) return;
    
    await createDecoration(decorationForm, selectedCategory);
    
    resetDecorationForm();
  };

  const handleUpdateDecoration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDecoration) return;
    
    await updateDecoration(editingDecoration.id, decorationForm);
    
    resetDecorationForm();
    setShowDecorationForm(false);
  };

  const handleDeleteDecoration = async (id: number) => {
    if (confirm('Are you sure you want to delete this decoration?')) {
      await deleteDecoration(id);
    }
  };

  const handleEditDecoration = (decoration: Decoration) => {
    populateDecorationForm(decoration);
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

      <CategoriesSection
        categories={categories}
        isLoading={isLoading}
        showCategoryForm={showCategoryForm}
        editingCategory={editingCategory}
        categoryForm={categoryForm}
        isSubmitting={isCreating || isUpdating}
        setCategoryForm={setCategoryForm}
        onToggleForm={() => {
          resetCategoryForm();
          setShowCategoryForm(!showCategoryForm);
        }}
        onSubmit={handleCreateCategory}
        onUpdate={handleUpdateCategory}
        onCancel={() => {
          setShowCategoryForm(false);
          resetCategoryForm();
        }}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />

      <DecorationsSection
        decorations={filteredDecorations}
        categories={categories}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        showDecorationForm={showDecorationForm}
        onToggleForm={() => {
          resetDecorationForm();
          setShowDecorationForm(!showDecorationForm);
        }}
        onCategoryFilterChange={(categoryId) => setSelectedCategory(categoryId)}
        onEdit={handleEditDecoration}
        onDelete={handleDeleteDecoration}
      />

      {showDecorationForm && (
        <DecorationForm
          formData={decorationForm}
          categories={categories}
          selectedCategory={selectedCategory}
          editingDecoration={!!editingDecoration}
          isSubmitting={isCreating || isUpdating}
          fileInputRef={fileInputRef}
          onFormChange={updateDecorationForm}
          onCategoryChange={(categoryId) => setSelectedCategory(categoryId)}
          onFileSelect={(file) => {
            const objectUrl = URL.createObjectURL(file);
            setImageFile(file);
            updateDecorationForm({ imageUrl: objectUrl });
          }}
          onFileRemove={() => {
            if (decorationForm.imageUrl && decorationForm.imageUrl.startsWith('blob:')) {
              URL.revokeObjectURL(decorationForm.imageUrl);
            }
            setImageFile(null);
            updateDecorationForm({ imageUrl: '' });
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
          onSubmit={editingDecoration ? handleUpdateDecoration : handleCreateDecoration}
          onCancel={() => {
            if (decorationForm.imageUrl && decorationForm.imageUrl.startsWith('blob:')) {
              URL.revokeObjectURL(decorationForm.imageUrl);
            }
            setShowDecorationForm(false);
            resetDecorationForm();
            setImageFile(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        />
      )}
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
