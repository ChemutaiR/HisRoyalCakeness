// Admin promotions management types

export interface AdminPromotion {
  id: string;
  name: string;
  description: string;
  discountType: 'Percentage' | 'Fixed Amount';
  discountValue: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive' | 'Expired';
  usageCount: number;
  maxUsage: number;
  applicableProducts: string[];
  minOrderValue: number;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromotionFormData {
  name: string;
  description: string;
  discountType: 'Percentage' | 'Fixed Amount';
  discountValue: number;
  startDate: string;
  endDate: string;
  maxUsage: number;
  applicableProducts: string[];
  minOrderValue: number;
  code: string;
}

export interface PromotionFilters {
  status?: 'Active' | 'Inactive' | 'Expired';
  discountType?: 'Percentage' | 'Fixed Amount';
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface PromotionActions {
  createPromotion: (data: PromotionFormData) => Promise<void>;
  updatePromotion: (id: string, data: Partial<PromotionFormData>) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
  activatePromotion: (id: string) => Promise<void>;
  deactivatePromotion: (id: string) => Promise<void>;
  duplicatePromotion: (id: string) => Promise<void>;
}

export interface PromotionStats {
  totalPromotions: number;
  activePromotions: number;
  expiredPromotions: number;
  totalUsage: number;
  totalDiscountGiven: number;
  averageDiscountValue: number;
}

export interface PromotionUsage {
  id: string;
  promotionId: string;
  promotionCode: string;
  customerName: string;
  customerEmail: string;
  orderId: string;
  orderTotal: number;
  discountAmount: number;
  usedAt: string;
}
