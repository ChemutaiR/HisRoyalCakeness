// Cart validation utility functions

import { CartItem, CustomLoafItem } from '@/types/shop/cart';

/**
 * Validate cart item
 */
export function validateCartItem(item: CartItem): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!item.id || item.id.trim().length === 0) {
    errors.push('Invalid item ID');
  }
  
  if (!item.cake.name || item.cake.name.trim().length === 0) {
    errors.push('Item name is required');
  }
  
  if (!item.totalPrice || item.totalPrice <= 0) {
    errors.push('Item price must be greater than 0');
  }
  
  if (!item.quantity || item.quantity <= 0) {
    errors.push('Item quantity must be greater than 0');
  }
  
  if (item.quantity > 10) {
    errors.push('Maximum quantity per item is 10');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate custom loaf item
 */
export function validateCustomLoafItem(item: CustomLoafItem): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!item.cakeSelection) {
    errors.push('Cake selection is required');
  }
  
  if (!item.quantity || item.quantity <= 0) {
    errors.push('Quantity must be greater than 0');
  }
  
  if (item.quantity > 5) {
    errors.push('Maximum quantity for custom loaves is 5');
  }
  
  if (item.customNotes && item.customNotes.length > 500) {
    errors.push('Custom notes cannot exceed 500 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate entire cart
 */
export function validateCart(
  items: CartItem[],
  customLoafItems: CustomLoafItem[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate regular items
  items.forEach((item, index) => {
    const itemValidation = validateCartItem(item);
    if (!itemValidation.isValid) {
      errors.push(`Item ${index + 1}: ${itemValidation.errors.join(', ')}`);
    }
  });
  
  // Validate custom loaf items
  customLoafItems.forEach((item, index) => {
    const itemValidation = validateCustomLoafItem(item);
    if (!itemValidation.isValid) {
      errors.push(`Custom loaf ${index + 1}: ${itemValidation.errors.join(', ')}`);
    }
  });
  
  // Check total items limit
  const totalItems = items.length + customLoafItems.length;
  if (totalItems > 20) {
    errors.push('Maximum 20 items allowed in cart');
  }
  
  // Check total quantity limit
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0) +
                       customLoafItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalQuantity > 50) {
    errors.push('Maximum 50 total quantity allowed in cart');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Check if item can be added to cart
 */
export function canAddItemToCart(
  item: CartItem,
  existingItems: CartItem[],
  maxQuantityPerItem: number = 10
): { canAdd: boolean; reason?: string } {
  const existingItem = existingItems.find(existing => existing.id === item.id);
  
  if (existingItem) {
    const newTotalQuantity = existingItem.quantity + item.quantity;
    if (newTotalQuantity > maxQuantityPerItem) {
      return {
        canAdd: false,
        reason: `Cannot add ${item.quantity} more. Maximum ${maxQuantityPerItem} allowed per item.`
      };
    }
  }
  
  if (item.quantity > maxQuantityPerItem) {
    return {
      canAdd: false,
      reason: `Quantity ${item.quantity} exceeds maximum ${maxQuantityPerItem} allowed per item.`
    };
  }
  
  return { canAdd: true };
}

/**
 * Check if custom loaf can be added to cart
 */
export function canAddCustomLoafToCart(
  item: CustomLoafItem,
  existingCustomLoaves: CustomLoafItem[],
  maxCustomLoaves: number = 5
): { canAdd: boolean; reason?: string } {
  if (existingCustomLoaves.length >= maxCustomLoaves) {
    return {
      canAdd: false,
      reason: `Maximum ${maxCustomLoaves} custom loaves allowed in cart.`
    };
  }
  
  if (item.quantity > 5) {
    return {
      canAdd: false,
      reason: 'Maximum quantity for custom loaves is 5.'
    };
  }
  
  return { canAdd: true };
}

/**
 * Validate cart for checkout
 */
export function validateCartForCheckout(
  items: CartItem[],
  customLoafItems: CustomLoafItem[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check if cart is empty
  if (items.length === 0 && customLoafItems.length === 0) {
    errors.push('Cart is empty');
    return { isValid: false, errors };
  }
  
  // Validate all items
  const cartValidation = validateCart(items, customLoafItems);
  if (!cartValidation.isValid) {
    errors.push(...cartValidation.errors);
  }
  
  // Check minimum order amount
  const subtotal = items.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0) +
                   customLoafItems.reduce((sum, item) => {
                     const basePrice = item.cakeSelection.price;
                     const creamPrice = item.cakeSelection.whippingCream ? item.cakeSelection.whippingCream.price : 0;
                     const toppingPrice = item.cakeSelection.topping ? item.cakeSelection.topping.price : 0;
                     return sum + (basePrice + creamPrice + toppingPrice) * item.quantity;
                   }, 0);
  
  const minimumOrderAmount = 500; // KES
  if (subtotal < minimumOrderAmount) {
    errors.push(`Minimum order amount is ${minimumOrderAmount} KES`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Check if cart has items requiring special handling
 */
export function hasSpecialHandlingItems(items: CartItem[], customLoafItems: CustomLoafItem[]): boolean {
  // Check for items that might require special handling
  const specialKeywords = ['frozen', 'refrigerated', 'fragile', 'custom'];
  
  const hasSpecialRegularItems = items.some(item => 
    specialKeywords.some(keyword => 
      item.cake.name.toLowerCase().includes(keyword)
    )
  );
  
  const hasSpecialCustomLoaves = customLoafItems.length > 0;
  
  return hasSpecialRegularItems || hasSpecialCustomLoaves;
}

/**
 * Validate delivery requirements
 */
export function validateDeliveryRequirements(
  items: CartItem[],
  customLoafItems: CustomLoafItem[],
  deliveryAddress: string
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!deliveryAddress || deliveryAddress.trim().length === 0) {
    errors.push('Delivery address is required');
  }
  
  // Check if any items require special delivery
  if (hasSpecialHandlingItems(items, customLoafItems)) {
    if (deliveryAddress.length < 20) {
      errors.push('Detailed delivery address required for special items');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
