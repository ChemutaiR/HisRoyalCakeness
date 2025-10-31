"use client";

import { Plus, Edit, Trash2, Image as ImageIcon, Package } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Decoration, DecorationCategory } from '@/types/shop/catalog/decorations';

interface DecorationsSectionProps {
  decorations: Decoration[];
  categories: DecorationCategory[];
  isLoading: boolean;
  selectedCategory: string | null;
  showDecorationForm: boolean;
  onToggleForm: () => void;
  onCategoryFilterChange: (categoryId: string | null) => void;
  onEdit: (decoration: Decoration) => void;
  onDelete: (id: number) => void;
}

export default function DecorationsSection({
  decorations,
  categories,
  isLoading,
  selectedCategory,
  showDecorationForm,
  onToggleForm,
  onCategoryFilterChange,
  onEdit,
  onDelete,
}: DecorationsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Decorations</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedCategory || 'all'} onValueChange={(v) => onCategoryFilterChange(v === 'all' ? null : v)}>
              <SelectTrigger className="w-[220px]">
                <span className="truncate">
                  {selectedCategory 
                    ? `${categories.find(c => c.id === selectedCategory)?.icon} ${categories.find(c => c.id === selectedCategory)?.name}` 
                    : 'All Categories'}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={onToggleForm}
              className="flex items-center space-x-2 px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Decoration</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c7b8ea] mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading decorations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {decorations.map((decoration) => (
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
                        onClick={() => onEdit(decoration)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(decoration.id)}
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
  );
}

