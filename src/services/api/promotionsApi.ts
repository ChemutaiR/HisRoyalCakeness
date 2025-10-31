/**
 * Promotions API Service
 * 
 * Handles all promotion-related API calls with proper error handling
 * and data transformation between API and frontend formats.
 */

import { apiClient, ApiResponse } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { AdminPromotion, PromotionFormData } from '@/types/admin/promotions';
import { formatPromotionFromApi, formatPromotionForSubmit } from '@/utils/admin/promotionFormatters';

export class PromotionsApiService {
  /**
   * Get all promotions
   */
  async getPromotions(filters?: {
    status?: string;
    discountType?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  }): Promise<ApiResponse<AdminPromotion[]>> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = queryParams.toString() 
      ? `${API_ENDPOINTS.PROMOTIONS.BASE}?${queryParams.toString()}`
      : API_ENDPOINTS.PROMOTIONS.BASE;

    return apiClient.get<AdminPromotion[]>(url).then(response => ({
      ...response,
      data: response.data?.map(formatPromotionFromApi),
    }));
  }

  /**
   * Get a single promotion by ID
   */
  async getPromotionById(id: string): Promise<ApiResponse<AdminPromotion>> {
    return apiClient.get<AdminPromotion>(
      API_ENDPOINTS.PROMOTIONS.BY_ID(id)
    ).then(response => ({
      ...response,
      data: response.data ? formatPromotionFromApi(response.data) : undefined,
    }));
  }

  /**
   * Create a new promotion
   */
  async createPromotion(
    data: PromotionFormData,
    imageFile: File | null = null
  ): Promise<ApiResponse<AdminPromotion>> {
    const formattedData = formatPromotionForSubmit(data, imageFile);
    
    const headers: Record<string, string> | undefined = imageFile ? undefined : { 'Content-Type': 'application/json' };
    
    return apiClient.post<AdminPromotion>(
      API_ENDPOINTS.PROMOTIONS.BASE,
      formattedData,
      { headers }
    ).then(response => ({
      ...response,
      data: response.data ? formatPromotionFromApi(response.data) : undefined,
    }));
  }

  /**
   * Update an existing promotion
   */
  async updatePromotion(
    id: string,
    data: Partial<PromotionFormData>,
    imageFile: File | null = null
  ): Promise<ApiResponse<AdminPromotion>> {
    const formattedData = formatPromotionForSubmit(data as PromotionFormData, imageFile);
    
    const headers: Record<string, string> | undefined = imageFile ? undefined : { 'Content-Type': 'application/json' };
    
    return apiClient.put<AdminPromotion>(
      API_ENDPOINTS.PROMOTIONS.BY_ID(id),
      formattedData,
      { headers }
    ).then(response => ({
      ...response,
      data: response.data ? formatPromotionFromApi(response.data) : undefined,
    }));
  }

  /**
   * Delete a promotion
   */
  async deletePromotion(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.PROMOTIONS.BY_ID(id));
  }

  /**
   * Activate a promotion
   */
  async activatePromotion(id: string): Promise<ApiResponse<AdminPromotion>> {
    return apiClient.post<AdminPromotion>(
      API_ENDPOINTS.PROMOTIONS.ACTIVATE(id)
    ).then(response => ({
      ...response,
      data: response.data ? formatPromotionFromApi(response.data) : undefined,
    }));
  }

  /**
   * Deactivate a promotion
   */
  async deactivatePromotion(id: string): Promise<ApiResponse<AdminPromotion>> {
    return apiClient.post<AdminPromotion>(
      API_ENDPOINTS.PROMOTIONS.DEACTIVATE(id)
    ).then(response => ({
      ...response,
      data: response.data ? formatPromotionFromApi(response.data) : undefined,
    }));
  }

  /**
   * Duplicate a promotion
   */
  async duplicatePromotion(id: string): Promise<ApiResponse<AdminPromotion>> {
    return apiClient.post<AdminPromotion>(
      API_ENDPOINTS.PROMOTIONS.DUPLICATE(id)
    ).then(response => ({
      ...response,
      data: response.data ? formatPromotionFromApi(response.data) : undefined,
    }));
  }
}

// Export singleton instance
export const promotionsApiService = new PromotionsApiService();

