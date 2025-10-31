"use client";

import { useState, useCallback } from 'react';
import { DecorationCategory, Decoration } from '@/types/shop/catalog/decorations';
import { CategoryFormState } from '@/app/admin/decorations/CategoriesSection';
import { DecorationFormState } from '@/app/admin/decorations/DecorationForm';

export function useDecorationForms() {
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>({
    name: '',
    icon: '',
    description: '',
  });

  const [decorationForm, setDecorationForm] = useState<DecorationFormState>({
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    available: true,
  });

  const [editingCategory, setEditingCategory] = useState<DecorationCategory | null>(null);
  const [editingDecoration, setEditingDecoration] = useState<Decoration | null>(null);

  const resetCategoryForm = useCallback(() => {
    setCategoryForm({ name: '', icon: '', description: '' });
    setEditingCategory(null);
  }, []);

  const resetDecorationForm = useCallback(() => {
    setDecorationForm({
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      available: true,
    });
    setEditingDecoration(null);
  }, []);

  const populateCategoryForm = useCallback((category: DecorationCategory) => {
    setCategoryForm({
      name: category.name,
      icon: category.icon,
      description: '',
    });
    setEditingCategory(category);
  }, []);

  const populateDecorationForm = useCallback((decoration: Decoration) => {
    setDecorationForm({
      name: decoration.name,
      description: decoration.description,
      imageUrl: decoration.imageUrl,
      price: decoration.price,
      available: decoration.available,
    });
    setEditingDecoration(decoration);
  }, []);

  const updateCategoryForm = useCallback((data: Partial<CategoryFormState>) => {
    setCategoryForm(prev => ({ ...prev, ...data }));
  }, []);

  const updateDecorationForm = useCallback((data: Partial<DecorationFormState>) => {
    setDecorationForm(prev => ({ ...prev, ...data }));
  }, []);

  return {
    // Category form
    categoryForm,
    editingCategory,
    setCategoryForm,
    setEditingCategory,
    resetCategoryForm,
    populateCategoryForm,
    updateCategoryForm,
    
    // Decoration form
    decorationForm,
    editingDecoration,
    setDecorationForm,
    setEditingDecoration,
    resetDecorationForm,
    populateDecorationForm,
    updateDecorationForm,
  };
}

