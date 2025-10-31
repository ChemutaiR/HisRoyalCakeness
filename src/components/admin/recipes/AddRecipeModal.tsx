"use client";

import { X } from 'lucide-react';
import { RecipeFormData } from '@/types/admin/recipes';
import RecipeForm from './RecipeForm';

interface AddRecipeModalProps {
  isOpen: boolean;
  formData: RecipeFormData;
  onClose: () => void;
  onFieldChange: (field: keyof RecipeFormData, value: any) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (id: string) => void;
  onUpdateIngredient: (id: string, field: 'measurement' | 'ingredient', value: string) => void;
  onAddInstruction: () => void;
  onRemoveInstruction: (id: string) => void;
  onUpdateInstruction: (id: string, value: string) => void;
  onSubmit: () => void;
}

export default function AddRecipeModal({
  isOpen,
  formData,
  onClose,
  onFieldChange,
  onAddIngredient,
  onRemoveIngredient,
  onUpdateIngredient,
  onAddInstruction,
  onRemoveInstruction,
  onUpdateInstruction,
  onSubmit,
}: AddRecipeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Add New Recipe</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <RecipeForm
          formData={formData}
          onFieldChange={onFieldChange}
          onAddIngredient={onAddIngredient}
          onRemoveIngredient={onRemoveIngredient}
          onUpdateIngredient={onUpdateIngredient}
          onAddInstruction={onAddInstruction}
          onRemoveInstruction={onRemoveInstruction}
          onUpdateInstruction={onUpdateInstruction}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

