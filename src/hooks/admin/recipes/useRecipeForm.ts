"use client";

import { useState, useCallback } from 'react';
import { RecipeFormData, Ingredient, Instruction } from '@/types/admin/recipes';

const initialFormData: RecipeFormData = {
  name: '',
  category: '', // Kept for type compatibility but not used in form
  prepTime: '',
  cookTime: '',
  servings: 8,
  ingredients: [],
  instructions: [],
};

/**
 * Hook for managing recipe form state
 */
export function useRecipeForm() {
  const [formData, setFormData] = useState<RecipeFormData>(initialFormData);

  const handleFieldChange = useCallback((field: keyof RecipeFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const addIngredient = useCallback(() => {
    const newIngredient: Ingredient = {
      id: `ing${Date.now()}`,
      measurement: '',
      ingredient: '',
    };
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient],
    }));
  }, []);

  const removeIngredient = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== id),
    }));
  }, []);

  const updateIngredient = useCallback((id: string, field: 'measurement' | 'ingredient', value: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(ing =>
        ing.id === id ? { ...ing, [field]: value } : ing
      ),
    }));
  }, []);

  const addInstruction = useCallback(() => {
    const newInstruction: Instruction = {
      id: `step${Date.now()}`,
      step: '',
    };
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, newInstruction],
    }));
  }, []);

  const removeInstruction = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter(step => step.id !== id),
    }));
  }, []);

  const updateInstruction = useCallback((id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map(step =>
        step.id === id ? { ...step, step: value } : step
      ),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  const validateForm = useCallback((): boolean => {
    return !!(
      formData.name &&
      formData.ingredients.length > 0 &&
      formData.instructions.length > 0
    );
  }, [formData]);

  return {
    formData,
    setFormData,
    handleFieldChange,
    addIngredient,
    removeIngredient,
    updateIngredient,
    addInstruction,
    removeInstruction,
    updateInstruction,
    resetForm,
    validateForm,
  };
}

