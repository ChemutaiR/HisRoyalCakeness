import React from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { DecorationCategory } from '@/types/shop/catalog/decorations';
import CategoryForm from './CategoryForm';

export interface CategoryFormState {
  name: string;
  icon: string;
  description: string;
}

interface CategoriesSectionProps {
  categories: DecorationCategory[];
  isLoading: boolean;
  showCategoryForm: boolean;
  editingCategory: DecorationCategory | null;
  categoryForm: CategoryFormState;
  isSubmitting: boolean;
  setCategoryForm: (f: CategoryFormState) => void;
  onToggleForm: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onUpdate: (e: React.FormEvent) => void;
  onCancel: () => void;
  onEdit: (c: DecorationCategory) => void;
  onDelete: (id: string) => void;
}

export default function CategoriesSection({
  categories,
  isLoading,
  showCategoryForm,
  editingCategory,
  categoryForm,
  isSubmitting,
  setCategoryForm,
  onToggleForm,
  onSubmit,
  onUpdate,
  onCancel,
  onEdit,
  onDelete,
}: CategoriesSectionProps) {
  const handleFormChange = (data: Partial<CategoryFormState>) => {
    setCategoryForm({ ...categoryForm, ...data });
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
          </div>
          <button
            onClick={onToggleForm}
            className="flex items-center space-x-2 px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {showCategoryForm && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <CategoryForm
            formData={categoryForm}
            editingCategory={!!editingCategory}
            isSubmitting={isSubmitting}
            onFormChange={handleFormChange}
            onSubmit={editingCategory ? onUpdate : onSubmit}
            onCancel={onCancel}
          />
        </div>
      )}

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
                      onClick={() => onEdit(category)}
                      className="p-1 text-gray-400 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {category.decorations.length === 0 && (
                      <button
                        onClick={() => onDelete(category.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{category.decorations.length} decorations</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
