"use client";

import { useCallback } from 'react';

interface PricePoint {
  weight: string;
  amount: number;
  servings: number;
}

interface UseProductPricingProps {
  prices: PricePoint[];
  onUpdate: (prices: PricePoint[]) => void;
}

/**
 * Hook for managing product pricing
 */
export function useProductPricing({ prices, onUpdate }: UseProductPricingProps) {
  const handleAddPrice = useCallback(() => {
    const newPrice: PricePoint = { weight: '', amount: 0, servings: 0 };
    onUpdate([...prices, newPrice]);
  }, [prices, onUpdate]);

  const handleUpdatePrice = useCallback((index: number, field: keyof PricePoint, value: any) => {
    if (index >= 0 && index < prices.length) {
      const updatedPrices = prices.map((price, i) => 
        i === index ? { ...price, [field]: value } : price
      );
      onUpdate(updatedPrices);
    }
  }, [prices, onUpdate]);

  const handleRemovePrice = useCallback((index: number) => {
    if (index >= 0 && index < prices.length) {
      const updatedPrices = prices.filter((_, i) => i !== index);
      onUpdate(updatedPrices);
    }
  }, [prices, onUpdate]);

  return {
    handleAddPrice,
    handleUpdatePrice,
    handleRemovePrice,
  };
}

