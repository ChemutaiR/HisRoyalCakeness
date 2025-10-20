// Pricing-related utility functions

import { Size, CreamOption } from '@/types/shop/catalog';

/**
 * Calculate base price with size
 */
export function calculateSizePrice(basePrice: number, size: Size): number {
  return basePrice + size.price;
}

/**
 * Calculate total price with all options
 */
export function calculateTotalPrice(
  basePrice: number,
  size?: Size,
  cream?: CreamOption,
  quantity: number = 1
): number {
  let totalPrice = basePrice;
  
  if (size) {
    totalPrice += size.price;
  }
  
  if (cream) {
    totalPrice += cream.price;
  }
  
  return totalPrice * quantity;
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(originalPrice: number, discountPercentage: number): number {
  return (originalPrice * discountPercentage) / 100;
}

/**
 * Calculate price after discount
 */
export function calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
  const discount = calculateDiscount(originalPrice, discountPercentage);
  return originalPrice - discount;
}

/**
 * Calculate catalog tax amount
 */
export function calculateCatalogTax(price: number, taxRate: number): number {
  return (price * taxRate) / 100;
}

/**
 * Calculate price with tax
 */
export function calculatePriceWithTax(price: number, taxRate: number): number {
  const tax = calculateCatalogTax(price, taxRate);
  return price + tax;
}

/**
 * Calculate catalog delivery fee
 */
export function calculateCatalogDeliveryFee(
  orderTotal: number,
  freeDeliveryThreshold: number = 2000,
  deliveryFee: number = 200
): number {
  if (orderTotal >= freeDeliveryThreshold) {
    return 0;
  }
  return deliveryFee;
}

/**
 * Calculate final order total
 */
export function calculateOrderTotal(
  subtotal: number,
  deliveryFee: number = 0,
  taxRate: number = 0,
  discountAmount: number = 0
): number {
  const afterDiscount = subtotal - discountAmount;
  const tax = calculateCatalogTax(afterDiscount, taxRate);
  return afterDiscount + tax + deliveryFee;
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = 'KES'): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

/**
 * Get price breakdown
 */
export function getPriceBreakdown(
  basePrice: number,
  size?: Size,
  cream?: CreamOption,
  quantity: number = 1,
  taxRate: number = 0,
  deliveryFee: number = 0
) {
  const sizePrice = size ? size.price : 0;
  const creamPrice = cream ? cream.price : 0;
  const subtotal = (basePrice + sizePrice + creamPrice) * quantity;
  const tax = calculateCatalogTax(subtotal, taxRate);
  const total = subtotal + tax + deliveryFee;
  
  return {
    basePrice,
    sizePrice,
    creamPrice,
    quantity,
    subtotal,
    tax,
    deliveryFee,
    total
  };
}

/**
 * Compare prices
 */
export function comparePrices(price1: number, price2: number): 'higher' | 'lower' | 'equal' {
  if (price1 > price2) return 'higher';
  if (price1 < price2) return 'lower';
  return 'equal';
}

/**
 * Calculate price per serving
 */
export function calculatePricePerServing(totalPrice: number, servings: number): number {
  if (servings === 0) return 0;
  return totalPrice / servings;
}

/**
 * Get price range for multiple items
 */
export function getPriceRange(prices: number[]): { min: number; max: number } {
  if (prices.length === 0) return { min: 0, max: 0 };
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}
