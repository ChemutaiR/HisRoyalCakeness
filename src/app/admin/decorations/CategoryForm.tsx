"use client";

import React from 'react';
import { Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { CategoryFormState } from './CategoriesSection';

interface CategoryFormProps {
  formData: CategoryFormState;
  editingCategory: boolean;
  isSubmitting: boolean;
  onFormChange: (data: Partial<CategoryFormState>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function CategoryForm({
  formData,
  editingCategory,
  isSubmitting,
  onFormChange,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => onFormChange({ name: e.target.value })}
            placeholder="Category name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
          <Select
            value={formData.icon || '🌸'}
            onValueChange={(v) => onFormChange({ icon: v })}
          >
            <SelectTrigger className="w-full">
              <span className="truncate">{formData.icon || '🌸'}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="🌸">🌸</SelectItem>
              <SelectItem value="🍫">🍫</SelectItem>
              <SelectItem value="✨">✨</SelectItem>
              <SelectItem value="🎂">🎂</SelectItem>
              <SelectItem value="🖨️">🖨️</SelectItem>
              <SelectItem value="🎁">🎁</SelectItem>
              <SelectItem value="🧁">🧁</SelectItem>
              <SelectItem value="🍰">🍰</SelectItem>
              <SelectItem value="🌟">🌟</SelectItem>
              <SelectItem value="🧵">🧵</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{editingCategory ? 'Update' : 'Create'}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

