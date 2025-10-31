"use client";

import { Plus, X } from 'lucide-react';

interface ProductBakingTinOptionsProps {
  bakingTinOptions: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function ProductBakingTinOptions({
  bakingTinOptions,
  onAdd,
  onRemove,
}: ProductBakingTinOptionsProps) {
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-900 mb-4">Baking Tin Options</h4>
      <div className="space-y-2 mb-4">
        {bakingTinOptions.map((option, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">{option}</span>
            <button
              onClick={() => onRemove(index)}
              className="p-1 text-red-500 hover:bg-red-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={onAdd}
        className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Baking Tin Option
      </button>
    </div>
  );
}

