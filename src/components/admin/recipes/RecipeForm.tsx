"use client";

import { Plus } from 'lucide-react';
import { RecipeFormData } from '@/types/admin/recipes';
import { Input } from '@/components/ui';
import IngredientInput from './IngredientInput';
import InstructionInput from './InstructionInput';

interface RecipeFormProps {
  formData: RecipeFormData;
  onFieldChange: (field: keyof RecipeFormData, value: any) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (id: string) => void;
  onUpdateIngredient: (id: string, field: 'measurement' | 'ingredient', value: string) => void;
  onAddInstruction: () => void;
  onRemoveInstruction: (id: string) => void;
  onUpdateInstruction: (id: string, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function RecipeForm({
  formData,
  onFieldChange,
  onAddIngredient,
  onRemoveIngredient,
  onUpdateIngredient,
  onAddInstruction,
  onRemoveInstruction,
  onUpdateInstruction,
  onSubmit,
  onCancel,
}: RecipeFormProps) {
  const isValid = !!(
    formData.name &&
    formData.ingredients.length > 0 &&
    formData.instructions.length > 0
  );

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Name *</label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
          placeholder="e.g., Classic Vanilla Cake, Chocolate Fudge Cake"
        />
        <p className="text-xs text-gray-500 mt-1">Enter a descriptive recipe name</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Ingredients & Measurements *
          </label>
          <button
            type="button"
            onClick={onAddIngredient}
            className="text-[#c7b8ea] text-sm font-medium hover:text-[#c7b8ea]/80 flex items-center gap-1"
          >
            <Plus size={14} />
            Add Ingredient
          </button>
        </div>

        {formData.ingredients.length === 0 && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="text-xs text-gray-600 mb-2 font-medium">📝 Quick Format Tips:</div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Use standard measurements: cups, tbsp, tsp, grams, ounces</p>
              <p>• Include ingredient state: softened butter, room temperature eggs</p>
              <p>• List in order of use: dry ingredients first, then wet</p>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-4">
          {formData.ingredients.map((ingredient) => (
            <IngredientInput
              key={ingredient.id}
              ingredient={ingredient}
              onUpdate={onUpdateIngredient}
              onRemove={onRemoveIngredient}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Cooking/Baking Instructions *
          </label>
          <button
            type="button"
            onClick={onAddInstruction}
            className="text-[#c7b8ea] text-sm font-medium hover:text-[#c7b8ea]/80 flex items-center gap-1"
          >
            <Plus size={14} />
            Add Step
          </button>
        </div>

        {formData.instructions.length === 0 && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="text-xs text-gray-600 mb-2 font-medium">👨‍🍳 Instruction Tips:</div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Number each step clearly: 1, 2, 3...</p>
              <p>• Include temperatures, times, and techniques</p>
              <p>• Mention when to add ingredients: &quot;Add eggs one at a time&quot;</p>
              <p>• Include visual cues: &quot;until light and fluffy&quot;, &quot;until golden brown&quot;</p>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-4">
          {formData.instructions.map((instruction, index) => (
            <InstructionInput
              key={instruction.id}
              instruction={instruction}
              index={index}
              onUpdate={onUpdateInstruction}
              onRemove={onRemoveInstruction}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time *</label>
          <Input
            type="text"
            value={formData.prepTime}
            onChange={(e) => onFieldChange('prepTime', e.target.value)}
            placeholder="e.g., 20 min"
          />
          <p className="text-xs text-gray-500 mt-1">Preparation time</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cook Time *</label>
          <Input
            type="text"
            value={formData.cookTime}
            onChange={(e) => onFieldChange('cookTime', e.target.value)}
            placeholder="e.g., 30 min"
          />
          <p className="text-xs text-gray-500 mt-1">Cooking/baking time</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Servings *</label>
        <Input
          type="number"
          value={formData.servings}
          onChange={(e) => onFieldChange('servings', parseInt(e.target.value) || 8)}
          placeholder="8"
          min="1"
        />
        <p className="text-xs text-gray-500 mt-1">Number of people this recipe serves</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Recipe Tips</h4>
        <div className="text-xs text-blue-700 space-y-1">
          <p>
            • <strong>Clear Names:</strong> Use descriptive names like &quot;Classic Vanilla Cake&quot;
          </p>
          <p>
            • <strong>Accurate Times:</strong> Include prep and cook times for planning
          </p>
          <p>
            • <strong>Organized Ingredients:</strong> Group dry and wet ingredients separately
          </p>
          <p>
            • <strong>Precise Measurements:</strong> Use standard units (cups, tbsp, tsp, grams)
          </p>
          <p>
            • <strong>Detailed Instructions:</strong> Include temperatures, times, and visual cues
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onCancel}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={!isValid}
          className="px-3 py-1.5 bg-[#c7b8ea] text-black rounded text-sm font-semibold hover:bg-[#c7b8ea]/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
}

