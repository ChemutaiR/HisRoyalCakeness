// Promotion-related type definitions

export type PromotionType = 'percentage' | 'fixed_amount' | 'free_delivery' | 'buy_one_get_one';

export type PromotionStatus = 'active' | 'inactive' | 'expired' | 'scheduled';

export interface Promotion {
  id: number;
  name: string;
  description: string;
  type: PromotionType;
  status: PromotionStatus;
  value: number; // percentage or fixed amount
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  applicableCakes?: number[]; // cake IDs
  applicableCategories?: string[];
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  usedCount: number;
  code?: string; // for promo codes
  createdAt: Date;
  updatedAt: Date;
}

export interface PromoCode {
  id: number;
  code: string;
  promotionId: number;
  isActive: boolean;
  usageLimit?: number;
  usedCount: number;
  expiresAt: Date;
  createdAt: Date;
}

export interface PromotionUsage {
  id: number;
  promotionId: number;
  userId: number;
  orderId: number;
  discountAmount: number;
  usedAt: Date;
}

export interface CreatePromotionData {
  name: string;
  description: string;
  type: PromotionType;
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  applicableCakes?: number[];
  applicableCategories?: string[];
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  code?: string;
}

export interface UpdatePromotionData {
  name?: string;
  description?: string;
  status?: PromotionStatus;
  value?: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  applicableCakes?: number[];
  applicableCategories?: string[];
  startDate?: Date;
  endDate?: Date;
  usageLimit?: number;
}

export interface PromotionStats {
  totalPromotions: number;
  activePromotions: number;
  totalUsage: number;
  totalDiscountGiven: number;
  averageDiscount: number;
}

export interface PromotionFilters {
  status?: PromotionStatus;
  type?: PromotionType;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}
