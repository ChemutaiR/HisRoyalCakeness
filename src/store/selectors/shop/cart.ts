import { useCartStore } from '@/store/slices/shop/cart';
// import { CartItem, CustomLoafItem } from '@/types/shop/cart';
import { calculateCartSubtotal, getCartSummary } from '@/utils/cart/calculations';

// Basic selectors
export const selectCartItems = (state: ReturnType<typeof useCartStore.getState>) => state.items;
export const selectCustomLoafItems = (state: ReturnType<typeof useCartStore.getState>) => state.customLoafItems;
export const selectTotalItems = (state: ReturnType<typeof useCartStore.getState>) => state.totalItems;
export const selectTotalPrice = (state: ReturnType<typeof useCartStore.getState>) => state.totalPrice;
export const selectIsCartOpen = (state: ReturnType<typeof useCartStore.getState>) => state.isOpen;
export const selectIsLoading = (state: ReturnType<typeof useCartStore.getState>) => state.isLoading;
export const selectError = (state: ReturnType<typeof useCartStore.getState>) => state.error;
export const selectLastUpdated = (state: ReturnType<typeof useCartStore.getState>) => state.lastUpdated;

// Computed selectors
export const selectCartSummary = (state: ReturnType<typeof useCartStore.getState>) => {
  const { items, customLoafItems } = state;
  return getCartSummary(items, customLoafItems, 200, 0, 0); // 200 delivery fee, 0 tax, 0 discount
};

export const selectCartItemCount = (state: ReturnType<typeof useCartStore.getState>) => {
  return state.items.length + state.customLoafItems.length;
};

export const selectIsCartEmpty = (state: ReturnType<typeof useCartStore.getState>) => {
  return state.items.length === 0 && state.customLoafItems.length === 0;
};

export const selectCartSubtotal = (state: ReturnType<typeof useCartStore.getState>) => {
  return calculateCartSubtotal(state.items, state.customLoafItems);
};

export const selectDeliveryFee = (state: ReturnType<typeof useCartStore.getState>) => {
  const subtotal = calculateCartSubtotal(state.items, state.customLoafItems);
  return subtotal >= 2000 ? 0 : 200; // Free delivery over 2000 - will be overridden by zone-based calculation
};

export const selectCartTotal = (state: ReturnType<typeof useCartStore.getState>) => {
  const subtotal = calculateCartSubtotal(state.items, state.customLoafItems);
  const deliveryFee = subtotal >= 2000 ? 0 : 200;
  return subtotal + deliveryFee;
};

// Item-specific selectors
export const selectItemById = (itemId: string) => (state: ReturnType<typeof useCartStore.getState>) => {
  return state.items.find(item => item.id === itemId);
};

export const selectCustomLoafById = (itemId: string) => (state: ReturnType<typeof useCartStore.getState>) => {
  return state.customLoafItems.find(item => item.id === itemId);
};

// Cart actions selectors
export const selectCartActions = (state: ReturnType<typeof useCartStore.getState>) => ({
  addItem: state.addItem,
  removeItem: state.removeItem,
  updateQuantity: state.updateQuantity,
  clearCart: state.clearCart,
  toggleCart: state.toggleCart,
  addCustomLoaf: state.addCustomLoaf,
  removeCustomLoaf: state.removeCustomLoaf
});

// Cart state selectors
export const selectCartState = (state: ReturnType<typeof useCartStore.getState>) => ({
  items: state.items,
  customLoafItems: state.customLoafItems,
  totalItems: state.totalItems,
  totalPrice: state.totalPrice,
  isOpen: state.isOpen,
  isLoading: state.isLoading,
  error: state.error,
  lastUpdated: state.lastUpdated
});

// Memoized selectors for performance
export const selectCartDisplayData = (state: ReturnType<typeof useCartStore.getState>) => {
  const { items, customLoafItems, totalItems, totalPrice, isOpen, isLoading, error } = state;
  const subtotal = calculateCartSubtotal(items, customLoafItems);
  const deliveryFee = subtotal >= 2000 ? 0 : 200;
  const total = subtotal + deliveryFee;
  
  return {
    items,
    customLoafItems,
    totalItems,
    totalPrice,
    subtotal,
    deliveryFee,
    total,
    isOpen,
    isLoading,
    error,
    isEmpty: items.length === 0 && customLoafItems.length === 0
  };
};

// Cart validation selectors
export const selectCartValidation = (state: ReturnType<typeof useCartStore.getState>) => {
  const { items, customLoafItems } = state;
  const hasItems = items.length > 0 || customLoafItems.length > 0;
  const hasValidItems = items.every(item => 
    item.quantity > 0 && 
    item.totalPrice > 0 && 
    item.cake && 
    item.customization
  );
  
  return {
    hasItems,
    hasValidItems,
    isValid: hasItems && hasValidItems
  };
};
