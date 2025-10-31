/**
 * Decorations Validation Utilities
 * 
 * Validation logic for decoration and category forms
 */

import { CategoryFormState } from '@/app/admin/decorations/CategoriesSection';
import { DecorationFormState } from '@/app/admin/decorations/DecorationForm';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate category form data
 */
export function validateCategoryForm(formData: CategoryFormState): ValidationResult {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Category name is required';
  }

  if (!formData.icon.trim()) {
    errors.icon = 'Icon is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate decoration form data
 */
export function validateDecorationForm(formData: DecorationFormState, selectedCategory: string | null): ValidationResult {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Decoration name is required';
  }

  if (formData.price < 0) {
    errors.price = 'Price must be 0 or greater';
  }

  if (!selectedCategory) {
    errors.category = 'Please select a category';
  }

  if (!formData.description.trim()) {
    errors.description = 'Description is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

