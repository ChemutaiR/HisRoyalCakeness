// Cart calculation utility functions

import { CartItem, CustomLoafItem } from '@/types/shop/cart';

/**
 * Calculate item total price
 */
export function calculateItemTotal(item: CartItem): number {
  return item.totalPrice * item.quantity;
}

/**
 * Calculate custom loaf item total price
 */
export function calculateCustomLoafTotal(item: CustomLoafItem): number {
  const basePrice = item.cakeSelection.price;
  const creamPrice = item.cakeSelection.whippingCream ? item.cakeSelection.whippingCream.price : 0;
  const toppingPrice = item.cakeSelection.topping ? item.cakeSelection.topping.price : 0;
  
  return (basePrice + creamPrice + toppingPrice) * item.quantity;
}

/**
 * Calculate cart subtotal
 */
export function calculateCartSubtotal(items: CartItem[], customLoafItems: CustomLoafItem[]): number {
  const regularItemsTotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const customLoafTotal = customLoafItems.reduce((sum, item) => sum + calculateCustomLoafTotal(item), 0);
  
  return regularItemsTotal + customLoafTotal;
}

/**
 * Calculate delivery fee based on zone and subtotal
 */
export function calculateDeliveryFee(
  subtotal: number,
  zoneDeliveryFee: number = 0,
  freeDeliveryThreshold: number = 2000
): number {
  if (subtotal >= freeDeliveryThreshold) {
    return 0;
  }
  return zoneDeliveryFee;
}

/**
 * Calculate tax amount
 */
export function calculateTax(amount: number, taxRate: number = 0): number {
  return (amount * taxRate) / 100;
}

/**
 * Calculate total cart amount
 */
export function calculateCartTotal(
  subtotal: number,
  deliveryFee: number = 0,
  taxRate: number = 0,
  discountAmount: number = 0
): number {
  const afterDiscount = subtotal - discountAmount;
  const tax = calculateTax(afterDiscount, taxRate);
  return afterDiscount + tax + deliveryFee;
}

/**
 * Calculate total items count
 */
export function calculateTotalItems(items: CartItem[], customLoafItems: CustomLoafItem[]): number {
  const regularItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const customLoafCount = customLoafItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return regularItemsCount + customLoafCount;
}

/**
 * Calculate weight-based pricing
 */
export function calculateWeightBasedPrice(basePrice: number, weight: number): number {
  // Assuming base price is for 1kg, adjust for different weights
  return basePrice * weight;
}

/**
 * Calculate bulk discount
 */
export function calculateBulkDiscount(
  subtotal: number,
  discountThresholds: { min: number; discount: number }[] = [
    { min: 5000, discount: 5 },
    { min: 10000, discount: 10 },
    { min: 20000, discount: 15 }
  ]
): { discountAmount: number; discountPercentage: number } {
  const applicableThreshold = discountThresholds
    .filter(threshold => subtotal >= threshold.min)
    .sort((a, b) => b.min - a.min)[0];
  
  if (!applicableThreshold) {
    return { discountAmount: 0, discountPercentage: 0 };
  }
  
  const discountAmount = (subtotal * applicableThreshold.discount) / 100;
  return {
    discountAmount,
    discountPercentage: applicableThreshold.discount
  };
}

/**
 * Calculate promotional discount
 */
export function calculatePromotionalDiscount(
  subtotal: number,
  promotionCode: string,
  validPromotions: { code: string; type: 'percentage' | 'fixed'; value: number; minOrder: number }[]
): { discountAmount: number; isValid: boolean } {
  const promotion = validPromotions.find(p => p.code === promotionCode);
  
  if (!promotion || subtotal < promotion.minOrder) {
    return { discountAmount: 0, isValid: false };
  }
  
  let discountAmount = 0;
  if (promotion.type === 'percentage') {
    discountAmount = (subtotal * promotion.value) / 100;
  } else {
    discountAmount = promotion.value;
  }
  
  return { discountAmount, isValid: true };
}

/**
 * Get cart summary
 */
export function getCartSummary(
  items: CartItem[],
  customLoafItems: CustomLoafItem[],
  deliveryFee: number = 0,
  taxRate: number = 0,
  discountAmount: number = 0
) {
  const subtotal = calculateCartSubtotal(items, customLoafItems);
  const totalItems = calculateTotalItems(items, customLoafItems);
  const tax = calculateTax(subtotal - discountAmount, taxRate);
  const total = calculateCartTotal(subtotal, deliveryFee, taxRate, discountAmount);
  
  return {
    subtotal,
    deliveryFee,
    tax,
    discountAmount,
    total,
    totalItems,
    itemCount: items.length + customLoafItems.length
  };
}

/**
 * Check if cart qualifies for free delivery
 */
export function qualifiesForFreeDelivery(
  subtotal: number,
  freeDeliveryThreshold: number = 2000
): boolean {
  return subtotal >= freeDeliveryThreshold;
}

/**
 * Calculate estimated delivery time
 */
export function calculateEstimatedDeliveryTime(
  items: CartItem[],
  customLoafItems: CustomLoafItem[],
  basePreparationTime: number = 2 // hours
): Date {
  // const totalItems = calculateTotalItems(items, customLoafItems); // Not currently used
  const customLoafCount = customLoafItems.length;
  
  // Custom loaves take longer to prepare
  const additionalTime = customLoafCount * 1; // 1 hour per custom loaf
  const totalPreparationTime = basePreparationTime + additionalTime;
  
  const deliveryTime = new Date();
  deliveryTime.setHours(deliveryTime.getHours() + totalPreparationTime);
  
  return deliveryTime;
}

/**
 * Calculate cart weight (for delivery purposes)
 */
export function calculateCartWeight(items: CartItem[], customLoafItems: CustomLoafItem[]): number {
  // Assuming average weight per item
  const averageWeightPerItem = 1; // kg
  const totalItems = calculateTotalItems(items, customLoafItems);
  
  return totalItems * averageWeightPerItem;
}
