// Cart storage utility functions

import { CartItem, CustomLoafItem } from '@/types/shop/cart';

const CART_STORAGE_KEY = 'bakery_cart';
const CUSTOM_LOAF_STORAGE_KEY = 'bakery_custom_loaves';

/**
 * Save cart items to localStorage
 */
export function saveCartToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    // console.error('Failed to save cart to storage:', error);
  }
}

/**
 * Load cart items from localStorage
 */
export function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    // console.error('Failed to load cart from storage:', error);
  }
  return [];
}

/**
 * Save custom loaf items to localStorage
 */
export function saveCustomLoavesToStorage(items: CustomLoafItem[]): void {
  try {
    localStorage.setItem(CUSTOM_LOAF_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    // console.error('Failed to save custom loaves to storage:', error);
  }
}

/**
 * Load custom loaf items from localStorage
 */
export function loadCustomLoavesFromStorage(): CustomLoafItem[] {
  try {
    const stored = localStorage.getItem(CUSTOM_LOAF_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    // console.error('Failed to load custom loaves from storage:', error);
  }
  return [];
}

/**
 * Clear cart from storage
 */
export function clearCartFromStorage(): void {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(CUSTOM_LOAF_STORAGE_KEY);
  } catch (error) {
    // console.error('Failed to clear cart from storage:', error);
  }
}

/**
 * Add item to cart storage
 */
export function addItemToCartStorage(item: CartItem): CartItem[] {
  const existingItems = loadCartFromStorage();
  const existingItemIndex = existingItems.findIndex(existing => existing.id === item.id);
  
  if (existingItemIndex >= 0) {
    // Update existing item quantity
    existingItems[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item
    existingItems.push(item);
  }
  
  saveCartToStorage(existingItems);
  return existingItems;
}

/**
 * Update item quantity in cart storage
 */
export function updateItemQuantityInStorage(itemId: string, quantity: number): CartItem[] {
  const existingItems = loadCartFromStorage();
  const itemIndex = existingItems.findIndex(item => item.id === itemId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      existingItems.splice(itemIndex, 1);
    } else {
      // Update quantity
      existingItems[itemIndex].quantity = quantity;
    }
  }
  
  saveCartToStorage(existingItems);
  return existingItems;
}

/**
 * Remove item from cart storage
 */
export function removeItemFromCartStorage(itemId: string): CartItem[] {
  const existingItems = loadCartFromStorage();
  const filteredItems = existingItems.filter(item => item.id !== itemId);
  saveCartToStorage(filteredItems);
  return filteredItems;
}

/**
 * Add custom loaf to storage
 */
export function addCustomLoafToStorage(item: CustomLoafItem): CustomLoafItem[] {
  const existingItems = loadCustomLoavesFromStorage();
  existingItems.push(item);
  saveCustomLoavesToStorage(existingItems);
  return existingItems;
}

/**
 * Remove custom loaf from storage
 */
export function removeCustomLoafFromStorage(index: number): CustomLoafItem[] {
  const existingItems = loadCustomLoavesFromStorage();
  existingItems.splice(index, 1);
  saveCustomLoavesToStorage(existingItems);
  return existingItems;
}

/**
 * Update custom loaf in storage
 */
export function updateCustomLoafInStorage(index: number, item: CustomLoafItem): CustomLoafItem[] {
  const existingItems = loadCustomLoavesFromStorage();
  if (index >= 0 && index < existingItems.length) {
    existingItems[index] = item;
    saveCustomLoavesToStorage(existingItems);
  }
  return existingItems;
}

/**
 * Get cart storage size (approximate)
 */
export function getCartStorageSize(): number {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY) || '';
    const customLoafData = localStorage.getItem(CUSTOM_LOAF_STORAGE_KEY) || '';
    return cartData.length + customLoafData.length;
  } catch (error) {
    return 0;
  }
}

/**
 * Check if cart storage is available
 */
export function isCartStorageAvailable(): boolean {
  try {
    const testKey = 'cart_storage_test';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Migrate old cart format to new format
 */
export function migrateCartStorage(): void {
  try {
    // Check for old cart format and migrate if necessary
    const oldCartKey = 'cart';
    const oldCartData = localStorage.getItem(oldCartKey);
    
    if (oldCartData) {
      const oldCart = JSON.parse(oldCartData);
      if (Array.isArray(oldCart)) {
        // Migrate to new format
        saveCartToStorage(oldCart);
        localStorage.removeItem(oldCartKey);
      }
    }
  } catch (error) {
    // console.error('Failed to migrate cart storage:', error);
  }
}

/**
 * Export cart data for backup
 */
export function exportCartData(): string {
  try {
    const cartItems = loadCartFromStorage();
    const customLoafItems = loadCustomLoavesFromStorage();
    
    return JSON.stringify({
      cartItems,
      customLoafItems,
      exportedAt: new Date().toISOString()
    }, null, 2);
  } catch (error) {
    // console.error('Failed to export cart data:', error);
    return '';
  }
}

/**
 * Import cart data from backup
 */
export function importCartData(data: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(data);
    
    if (parsed.cartItems && Array.isArray(parsed.cartItems)) {
      saveCartToStorage(parsed.cartItems);
    }
    
    if (parsed.customLoafItems && Array.isArray(parsed.customLoafItems)) {
      saveCustomLoavesToStorage(parsed.customLoafItems);
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid data format' 
    };
  }
}

/**
 * Get cart storage statistics
 */
export function getCartStorageStats(): {
  itemCount: number;
  customLoafCount: number;
  storageSize: number;
  lastUpdated: string | null;
} {
  const cartItems = loadCartFromStorage();
  const customLoafItems = loadCustomLoavesFromStorage();
  const storageSize = getCartStorageSize();
  
  // Try to get last updated time from storage
  let lastUpdated: string | null = null;
  try {
    const lastUpdatedData = localStorage.getItem('cart_last_updated');
    if (lastUpdatedData) {
      lastUpdated = lastUpdatedData;
    }
  } catch (error) {
    // Ignore error
  }
  
  return {
    itemCount: cartItems.length,
    customLoafCount: customLoafItems.length,
    storageSize,
    lastUpdated
  };
}
