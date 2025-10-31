/**
 * Promotion Data Formatters
 * 
 * Utility functions to format promotion data for API submission
 * and transform API responses for UI consumption.
 */

import { AdminPromotion, PromotionFormData } from '@/types/admin/promotions';

/**
 * Format form data for creating/updating a promotion
 */
export function formatPromotionForSubmit(
  formData: PromotionFormData,
  imageFile: File | null
): FormData | (PromotionFormData & { status?: string }) {
  // If there's an image file, use FormData; otherwise, use JSON
  if (imageFile) {
    const formDataObj = new FormData();
    
    // Append all fields
    formDataObj.append('name', formData.name);
    formDataObj.append('description', formData.description);
    formDataObj.append('discountType', formData.discountType);
    formDataObj.append('discountValue', formData.discountValue.toString());
    formDataObj.append('startDate', formData.startDate);
    formDataObj.append('endDate', formData.endDate);
    formDataObj.append('status', 'Active'); // Default for new promotions
    
    // Append optional fields
    if (formData.maxUsage !== undefined) {
      formDataObj.append('maxUsage', formData.maxUsage.toString());
    }
    if (formData.minOrderValue !== undefined) {
      formDataObj.append('minOrderValue', formData.minOrderValue.toString());
    }
    if (formData.applicableProducts && formData.applicableProducts.length > 0) {
      formData.applicableProducts.forEach((product, index) => {
        formDataObj.append(`applicableProducts[${index}]`, product);
      });
    }
    if (formData.code) {
      formDataObj.append('code', formData.code);
    }
    
    // Append image
    formDataObj.append('image', imageFile);
    
    return formDataObj;
  }
  
  // Return JSON format without image
  return {
    ...formData,
    status: 'Active', // Default for new promotions
  };
}

/**
 * Format API response to AdminPromotion
 */
export function formatPromotionFromApi(data: any): AdminPromotion {
  return {
    id: data.id || data._id || '',
    name: data.name || '',
    description: data.description || '',
    discountType: data.discountType || 'Percentage',
    discountValue: data.discountValue || 0,
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    status: data.status || 'Active',
    usageCount: data.usageCount || 0,
    maxUsage: data.maxUsage || 0,
    applicableProducts: data.applicableProducts || [],
    minOrderValue: data.minOrderValue || 0,
    code: data.code || '',
    image: data.image || null,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}

/**
 * Format promotion for edit modal (extract applicable products)
 */
export function formatPromotionForEdit(promotion: AdminPromotion): {
  applyToAll: boolean;
  selectedCakes: string[];
} {
  const isAll = promotion.applicableProducts?.includes('All Cakes') || 
                promotion.applicableProducts?.length === 0;
  
  return {
    applyToAll: isAll,
    selectedCakes: isAll ? [] : (promotion.applicableProducts || []),
  };
}

