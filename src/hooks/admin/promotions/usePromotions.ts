/**
 * usePromotions Hook
 * 
 * Custom hook for fetching and managing promotions data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { promotionsApiService } from '@/services/api/promotionsApi';
import { AdminPromotion } from '@/types/admin/promotions';

export interface UsePromotionsReturn {
  promotions: AdminPromotion[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createPromotion: (data: any, imageFile: File | null) => Promise<void>;
  updatePromotion: (id: string, data: any, imageFile: File | null) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
}

export function usePromotions(filters?: {
  status?: string;
  discountType?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}): UsePromotionsReturn {
  const [promotions, setPromotions] = useState<AdminPromotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await promotionsApiService.getPromotions(filters);
      
      if (response.success && response.data) {
        setPromotions(response.data);
      } else {
        setError(response.error || 'Failed to fetch promotions');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching promotions');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const createPromotion = useCallback(async (data: any, imageFile: File | null) => {
    try {
      setError(null);
      const response = await promotionsApiService.createPromotion(data, imageFile);
      
      if (response.success && response.data) {
        setPromotions(prev => [...prev, response.data!]);
      } else {
        setError(response.error || 'Failed to create promotion');
        throw new Error(response.error || 'Failed to create promotion');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating promotion');
      throw err;
    }
  }, []);

  const updatePromotion = useCallback(async (id: string, data: any, imageFile: File | null) => {
    try {
      setError(null);
      const response = await promotionsApiService.updatePromotion(id, data, imageFile);
      
      if (response.success && response.data) {
        setPromotions(prev => 
          prev.map(p => p.id === id ? response.data! : p)
        );
      } else {
        setError(response.error || 'Failed to update promotion');
        throw new Error(response.error || 'Failed to update promotion');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating promotion');
      throw err;
    }
  }, []);

  const deletePromotion = useCallback(async (id: string) => {
    try {
      setError(null);
      const response = await promotionsApiService.deletePromotion(id);
      
      if (response.success) {
        setPromotions(prev => prev.filter(p => p.id !== id));
      } else {
        setError(response.error || 'Failed to delete promotion');
        throw new Error(response.error || 'Failed to delete promotion');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting promotion');
      throw err;
    }
  }, []);

  return {
    promotions,
    loading,
    error,
    refresh: fetchPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
  };
}

