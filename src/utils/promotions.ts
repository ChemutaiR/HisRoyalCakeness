export type PromotionDetail = {
  id: string;
  title: string;
  description?: string;
  applicableProductNames: string[];
  discountType?: 'Percentage' | 'Fixed Amount';
  discountValue?: number;
  minOrderValue?: number;
};

// Mock promotion mapping for catalog filtering
export const PROMOTION_DETAILS: Record<string, PromotionDetail> = {
  'promo-1': {
    id: 'promo-1',
    title: 'Royal Weekend Sale',
    description: 'Enjoy up to 20% off on selected best-sellers this weekend only.',
    applicableProductNames: [
      'Vanilla Cake',
      'Chocolate Fudge',
      'Red Velvet Cake',
    ],
    discountType: 'Percentage',
    discountValue: 20,
    minOrderValue: 0,
  },
  'promo-2': {
    id: 'promo-2',
    title: 'Buy 2, Get 1 Free',
    description: 'Buy any two cupcakes assorted boxes and get one free.',
    applicableProductNames: [
      'Cupcakes Assorted Box',
    ],
    discountType: 'Percentage',
    discountValue: 33.33, // Approximate for BOGO
    minOrderValue: 0,
  },
  'promo-3': {
    id: 'promo-3',
    title: 'New Seasonal Flavors',
    description: 'Try our limited edition seasonal flavors while stocks last.',
    applicableProductNames: [
      'Strawberry Cake',
      'Black Forest',
    ],
    discountType: 'Percentage',
    discountValue: 15,
    minOrderValue: 0,
  },
};

export function getPromotionDetail(promoId: string | null | undefined): PromotionDetail | null {
  if (!promoId) return null;
  return PROMOTION_DETAILS[promoId] || null;
}

/**
 * Calculate discount for eligible cart items based on active promotion
 */
export function calculatePromotionDiscountForCart(
  promoId: string | null | undefined,
  eligibleItemsSubtotal: number
): { discountAmount: number; isValid: boolean } {
  const promotion = getPromotionDetail(promoId);
  if (!promotion || !promotion.discountType || !promotion.discountValue) {
    return { discountAmount: 0, isValid: false };
  }

  // Check minimum order value
  if (promotion.minOrderValue && eligibleItemsSubtotal < promotion.minOrderValue) {
    return { discountAmount: 0, isValid: false };
  }

  let discountAmount = 0;
  if (promotion.discountType === 'Percentage') {
    discountAmount = (eligibleItemsSubtotal * promotion.discountValue) / 100;
  } else {
    discountAmount = promotion.discountValue;
  }

  return { discountAmount, isValid: true };
}


