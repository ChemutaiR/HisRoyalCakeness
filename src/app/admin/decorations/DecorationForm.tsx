"use client";

import React from 'react';
import { Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import DecorationImageUpload from './DecorationImageUpload';
import { DecorationCategory } from '@/types/shop/catalog/decorations';

export interface DecorationFormState {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  available: boolean;
}

interface DecorationFormProps {
  formData: DecorationFormState;
  categories: DecorationCategory[];
  selectedCategory: string | null;
  editingDecoration: boolean;
  isSubmitting: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFormChange: (data: Partial<DecorationFormState>) => void;
  onCategoryChange: (categoryId: string | null) => void;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function DecorationForm({
  formData,
  categories,
  selectedCategory,
  editingDecoration,
  isSubmitting,
  fileInputRef,
  onFormChange,
  onCategoryChange,
  onFileSelect,
  onFileRemove,
  onSubmit,
  onCancel,
}: DecorationFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => onFormChange({ name: e.target.value })}
                placeholder="Decoration name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
              <Input
                type="number"
                value={formData.price as any}
                onChange={(e) => onFormChange({ price: Number(e.target.value) })}
                placeholder="0"
                min={0}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select value={selectedCategory || 'none'} onValueChange={(v) => onCategoryChange(v === 'none' ? null : v)}>
                <SelectTrigger className="w-full">
                  <span className="truncate">
                    {selectedCategory 
                      ? `${categories.find(c => c.id === selectedCategory)?.icon} ${categories.find(c => c.id === selectedCategory)?.name}` 
                      : 'Select Category'}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Select Category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => onFormChange({ available: e.target.checked })}
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
                value={formData.description}
                onChange={(e) => onFormChange({ description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                placeholder="Decoration description"
                rows={3}
                required
              />
            </div>
            <div>
              <DecorationImageUpload
                imageUrl={formData.imageUrl}
                fileInputRef={fileInputRef}
                onFileSelect={onFileSelect}
                onRemove={onFileRemove}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              disabled={isSubmitting || !selectedCategory}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{editingDecoration ? 'Update' : 'Create'}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

