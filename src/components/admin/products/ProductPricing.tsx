"use client";

import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui';

interface PricePoint {
  weight: string;
  amount: number;
  servings: number;
}

interface ProductPricingProps {
  prices: PricePoint[];
  isEditing: boolean;
  error?: string;
  onAddPrice: () => void;
  onUpdatePrice: (index: number, field: keyof PricePoint, value: any) => void;
  onRemovePrice: (index: number) => void;
}

export default function ProductPricing({
  prices,
  isEditing,
  error,
  onAddPrice,
  onUpdatePrice,
  onRemovePrice,
}: ProductPricingProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Configuration</h3>
      
      <div className="space-y-4">
        {prices.map((price, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <Input
                type="text"
                value={price.weight}
                onChange={(e) => onUpdatePrice(index, 'weight', (e.target as HTMLInputElement).value)}
                disabled={!isEditing}
                placeholder="e.g., 0.5 kg"
                className={`${!isEditing ? 'bg-gray-50' : ''}`}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KES)</label>
              <Input
                type="number"
                value={price.amount}
                onChange={(e) => onUpdatePrice(index, 'amount', Number((e.target as HTMLInputElement).value))}
                disabled={!isEditing}
                placeholder="1500"
                className={`${!isEditing ? 'bg-gray-50' : ''}`}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
              <Input
                type="number"
                value={price.servings}
                onChange={(e) => onUpdatePrice(index, 'servings', Number((e.target as HTMLInputElement).value))}
                disabled={!isEditing}
                placeholder="10"
                className={`${!isEditing ? 'bg-gray-50' : ''}`}
              />
            </div>
            {isEditing && (
              <button
                onClick={() => onRemovePrice(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <button
          onClick={onAddPrice}
          className="mt-4 flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Price Point
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

