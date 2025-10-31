/**
 * usePromotionForm Hook
 * 
 * Custom hook for managing promotion form state and validation
 */

'use client';

import { useState, useCallback } from 'react';
import { PromotionFormData } from '@/types/admin/promotions';

export interface PromotionFormState {
  name: string;
  description: string;
  discountType: 'Percentage' | 'Fixed Amount';
  discountValue: number;
  startDate: string;
  endDate: string;
  status: string;
  applyToAll: boolean;
  selectedCakes: string[];
  enableMinOrder: boolean;
  minOrderValue: number;
  enableMaxUsage: boolean;
  maxUsage: number;
}

const initialFormState: PromotionFormState = {
  name: '',
  description: '',
  discountType: 'Percentage',
  discountValue: 0,
  startDate: '',
  endDate: '',
  status: 'Active',
  applyToAll: true,
  selectedCakes: [],
  enableMinOrder: false,
  minOrderValue: 0,
  enableMaxUsage: false,
  maxUsage: 0,
};

export interface UsePromotionFormReturn {
  formState: PromotionFormState;
  updateField: <K extends keyof PromotionFormState>(field: K, value: PromotionFormState[K]) => void;
  resetForm: () => void;
  populateForm: (data: Partial<PromotionFormState>) => void;
  getFormData: () => PromotionFormData;
  validate: () => { isValid: boolean; errors: Record<string, string> };
}

export function usePromotionForm(): UsePromotionFormReturn {
  const [formState, setFormState] = useState<PromotionFormState>(initialFormState);

  const updateField = useCallback(<K extends keyof PromotionFormState>(
    field: K,
    value: PromotionFormState[K]
  ) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialFormState);
  }, []);

  const populateForm = useCallback((data: Partial<PromotionFormState>) => {
    setFormState(prev => ({
      ...prev,
      ...data,
    }));
  }, []);

  const getFormData = useCallback((): PromotionFormData => {
    return {
      name: formState.name,
      description: formState.description,
      discountType: formState.discountType,
      discountValue: formState.discountValue,
      startDate: formState.startDate,
      endDate: formState.endDate,
      applicableProducts: formState.applyToAll 
        ? ['All Cakes'] 
        : formState.selectedCakes,
      minOrderValue: formState.enableMinOrder ? formState.minOrderValue : 0,
      maxUsage: formState.enableMaxUsage ? formState.maxUsage : 0,
      code: '', // Code is generated on backend
    };
  }, [formState]);

  const validate = useCallback((): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!formState.name.trim()) {
      errors.name = 'Promotion name is required';
    }

    if (!formState.description.trim()) {
      errors.description = 'Description is required';
    }

    if (formState.discountValue <= 0) {
      errors.discountValue = 'Discount value must be greater than 0';
    }

    if (formState.discountType === 'Percentage' && formState.discountValue > 100) {
      errors.discountValue = 'Discount percentage cannot exceed 100%';
    }

    if (!formState.startDate) {
      errors.startDate = 'Start date is required';
    }

    if (!formState.endDate) {
      errors.endDate = 'End date is required';
    }

    if (formState.startDate && formState.endDate) {
      const start = new Date(formState.startDate);
      const end = new Date(formState.endDate);
      
      if (end <= start) {
        errors.endDate = 'End date must be after start date';
      }
    }

    if (!formState.applyToAll && formState.selectedCakes.length === 0) {
      errors.applicableProducts = 'Please select at least one cake or apply to all';
    }

    if (formState.enableMinOrder && formState.minOrderValue <= 0) {
      errors.minOrderValue = 'Minimum order value must be greater than 0';
    }

    if (formState.enableMaxUsage && formState.maxUsage <= 0) {
      errors.maxUsage = 'Max usage must be greater than 0';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }, [formState]);

  return {
    formState,
    updateField,
    resetForm,
    populateForm,
    getFormData,
    validate,
  };
}

