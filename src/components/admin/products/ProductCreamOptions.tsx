"use client";

import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui';
import { parseCreamOption, formatCreamDisplay } from '@/utils/products/creamOptions';

interface ProductCreamOptionsProps {
  creamOptions: string[];
  defaultCreamIndex?: number;
  isEditing: boolean;
  onUpdateCreamField: (index: number, field: 'name' | 'cost', value: any) => void;
  onRemoveCream: (index: number) => void;
  onDefaultCreamChange: (index: number) => void;
  onAddCream: () => void;
}

export default function ProductCreamOptions({
  creamOptions,
  defaultCreamIndex,
  isEditing,
  onUpdateCreamField,
  onRemoveCream,
  onDefaultCreamChange,
  onAddCream,
}: ProductCreamOptionsProps) {
  if (!isEditing) {
    // View mode - display like shop interface
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cake Creams</h3>
        
        <div className="space-y-3">
          {creamOptions.map((option, index) => {
            const isDefault = defaultCreamIndex === index;
            const { name, displayText } = formatCreamDisplay(option, isDefault);
            
            return (
              <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{name}</div>
                  <div className="text-sm text-gray-500">
                    {isDefault ? 'Included' : displayText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Edit mode - show management interface
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Cake Creams</h3>
      
      <div className="space-y-2">
        {creamOptions.map((option, index) => {
          const { name, cost } = parseCreamOption(option);
          const isDefault = defaultCreamIndex === index;
          
          return (
            <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mr-2">
                <input
                  type="radio"
                  name="defaultCream"
                  checked={isDefault}
                  onChange={() => onDefaultCreamChange(index)}
                  className="w-4 h-4 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Cream Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => onUpdateCreamField(index, 'name', (e.target as HTMLInputElement).value)}
                  placeholder="e.g., Vanilla Cream"
                />
                {isDefault && (
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Included
                    </span>
                  </div>
                )}
              </div>

              {!isDefault && (
                <div className="w-40">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Cost (KES)</label>
                  <Input
                    type="number"
                    value={cost}
                    onChange={(e) => onUpdateCreamField(index, 'cost', Number((e.target as HTMLInputElement).value))}
                    placeholder="0"
                    min={0}
                  />
                </div>
              )}

              <button
                onClick={() => onRemoveCream(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
        
        <button
          onClick={onAddCream}
          className="mt-4 flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Cake Cream Option
        </button>
      </div>
    </div>
  );
}

