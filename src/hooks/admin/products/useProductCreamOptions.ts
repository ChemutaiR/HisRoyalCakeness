"use client";

import { useState, useCallback } from 'react';
import { parseCreamOption, serializeCreamOption } from '@/utils/products/creamOptions';

interface UseProductCreamOptionsProps {
  creamOptions: string[];
  defaultCreamIndex?: number;
  onUpdate: (options: string[]) => void;
  onDefaultChange: (index: number) => void;
}

/**
 * Hook for managing product cream options
 */
export function useProductCreamOptions({
  creamOptions,
  defaultCreamIndex,
  onUpdate,
  onDefaultChange,
}: UseProductCreamOptionsProps) {
  const [showCreamDialog, setShowCreamDialog] = useState(false);
  const [newCreamName, setNewCreamName] = useState('');
  const [newCreamCost, setNewCreamCost] = useState<number | ''>('');

  const handleAddCream = useCallback((name: string, cost: number = 0) => {
    if (name.trim()) {
      const creamOption = serializeCreamOption(name.trim(), cost);
      onUpdate([...creamOptions, creamOption]);
      return true;
    }
    return false;
  }, [creamOptions, onUpdate]);

  const handleUpdateCream = useCallback((index: number, name?: string, cost?: number) => {
    if (index >= 0 && index < creamOptions.length) {
      const current = parseCreamOption(creamOptions[index]);
      const updatedName = name !== undefined ? name : current.name;
      const updatedCost = cost !== undefined ? cost : current.cost;
      const updatedOption = serializeCreamOption(updatedName, updatedCost);
      
      const updatedOptions = creamOptions.map((opt, i) => 
        i === index ? updatedOption : opt
      );
      onUpdate(updatedOptions);
    }
  }, [creamOptions, onUpdate]);

  const handleUpdateCreamField = useCallback((index: number, field: 'name' | 'cost', value: any) => {
    if (index >= 0 && index < creamOptions.length) {
      const current = parseCreamOption(creamOptions[index]);
      const next = field === 'name' 
        ? { ...current, name: String(value) } 
        : { ...current, cost: Number(value) };
      handleUpdateCream(index, next.name, next.cost);
    }
  }, [creamOptions, handleUpdateCream]);

  const handleRemoveCream = useCallback((index: number) => {
    if (index >= 0 && index < creamOptions.length) {
      const updatedOptions = creamOptions.filter((_, i) => i !== index);
      onUpdate(updatedOptions);
      
      // Adjust default index if needed
      if (defaultCreamIndex !== undefined) {
        if (index === defaultCreamIndex) {
          onDefaultChange(0);
        } else if (index < defaultCreamIndex) {
          onDefaultChange(defaultCreamIndex - 1);
        }
      }
    }
  }, [creamOptions, defaultCreamIndex, onUpdate, onDefaultChange]);

  const openAddCreamDialog = useCallback(() => {
    setShowCreamDialog(true);
  }, []);

  const closeAddCreamDialog = useCallback(() => {
    setNewCreamName('');
    setNewCreamCost('');
    setShowCreamDialog(false);
  }, []);

  const saveCreamFromDialog = useCallback(() => {
    if (newCreamName.trim()) {
      const cost = newCreamCost === '' ? 0 : newCreamCost;
      const success = handleAddCream(newCreamName, Number(cost));
      if (success) {
        closeAddCreamDialog();
      }
      return success;
    }
    return false;
  }, [newCreamName, newCreamCost, handleAddCream, closeAddCreamDialog]);

  return {
    showCreamDialog,
    newCreamName,
    newCreamCost,
    setNewCreamName,
    setNewCreamCost,
    openAddCreamDialog,
    closeAddCreamDialog,
    saveCreamFromDialog,
    handleAddCream,
    handleUpdateCream,
    handleUpdateCreamField,
    handleRemoveCream,
  };
}

