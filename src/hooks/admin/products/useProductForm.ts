"use client";

import { useState, useCallback } from 'react';
import { AdminProduct } from '@/store/slices/admin/products';
import { validateProductForm } from '@/lib/validation/products';

interface UseProductFormProps {
  initialData?: Partial<AdminProduct>;
}

/**
 * Hook for managing product form state and validation
 */
export function useProductForm({ initialData }: UseProductFormProps = {}) {
  const [formData, setFormData] = useState<Partial<AdminProduct>>(initialData || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const validation = validateProductForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  }, [formData]);

  const resetForm = useCallback((data?: Partial<AdminProduct>) => {
    setFormData(data || initialData || {});
    setErrors({});
  }, [initialData]);

  const setFormField = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    formData,
    errors,
    setFormData,
    handleInputChange,
    validateForm,
    resetForm,
    setFormField,
    clearError,
    setErrors,
  };
}

