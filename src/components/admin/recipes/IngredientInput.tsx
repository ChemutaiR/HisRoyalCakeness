"use client";

import { X } from 'lucide-react';
import { Ingredient } from '@/types/admin/recipes';
import { Input } from '@/components/ui';

interface IngredientInputProps {
  ingredient: Ingredient;
  onUpdate: (id: string, field: 'measurement' | 'ingredient', value: string) => void;
  onRemove: (id: string) => void;
}

export default function IngredientInput({
  ingredient,
  onUpdate,
  onRemove,
}: IngredientInputProps) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex-1">
        <Input
          type="text"
          value={ingredient.measurement}
          onChange={(e) => onUpdate(ingredient.id, 'measurement', e.target.value)}
          className="text-sm"
          placeholder="e.g., 2 cups, 1/2 tsp, 3 large"
        />
      </div>
      <div className="flex-1">
        <Input
          type="text"
          value={ingredient.ingredient}
          onChange={(e) => onUpdate(ingredient.id, 'ingredient', e.target.value)}
          className="text-sm"
          placeholder="e.g., all-purpose flour, unsalted butter, softened"
        />
      </div>
      <button
        type="button"
        onClick={() => onRemove(ingredient.id)}
        className="text-red-500 hover:text-red-700 p-1"
        title="Remove ingredient"
      >
        <X size={16} />
      </button>
    </div>
  );
}

