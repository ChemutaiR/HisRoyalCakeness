'use client';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useCartStore } from '@/store/slices/shop/cart';
import {
  selectCartItems,
  selectCustomLoafItems,
  selectTotalItems,
  selectTotalPrice,
  selectIsCartOpen,
  selectIsLoading,
  selectError,
  selectLastUpdated,
  selectCartSummary,
  selectCartItemCount,
  selectIsCartEmpty,
  selectCartSubtotal,
  selectDeliveryFee,
  selectCartTotal,
  selectCartDisplayData,
  selectCartValidation,
  // selectCartActions
} from '@/store/selectors/shop/cart';
import { Cake, CustomizationOptions, CakeSelection } from '@/types/shop/catalog';
import { cartApiService } from '@/services/shop/cart';

export interface UseCartReturn {
  // State
  items: ReturnType<typeof selectCartItems>;
  customLoafItems: ReturnType<typeof selectCustomLoafItems>;
  totalItems: ReturnType<typeof selectTotalItems>;
  totalPrice: ReturnType<typeof selectTotalPrice>;
  isOpen: ReturnType<typeof selectIsCartOpen>;
  isLoading: ReturnType<typeof selectIsLoading>;
  error: ReturnType<typeof selectError>;
  lastUpdated: ReturnType<typeof selectLastUpdated>;
  
  // Computed state
  cartSummary: ReturnType<typeof selectCartSummary>;
  itemCount: ReturnType<typeof selectCartItemCount>;
  isEmpty: ReturnType<typeof selectIsCartEmpty>;
  subtotal: ReturnType<typeof selectCartSubtotal>;
  deliveryFee: ReturnType<typeof selectDeliveryFee>;
  total: ReturnType<typeof selectCartTotal>;
  displayData: ReturnType<typeof selectCartDisplayData>;
  validation: ReturnType<typeof selectCartValidation>;
  
  // Actions
  addItem: (cake: Cake, customization: CustomizationOptions, quantity?: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  addCustomLoaf: (selection: CakeSelection, notes: string, quantity?: number) => Promise<void>;
  removeCustomLoaf: (itemId: string) => Promise<void>;
  
  // Utility functions
  addNotification: (notification: { type: string; title: string; message: string; duration?: number }) => void;
  syncWithServer: () => Promise<void>;
}

export function useCart(): UseCartReturn {
  // Select state from store
  const items = useCartStore(selectCartItems);
  const customLoafItems = useCartStore(selectCustomLoafItems);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const isOpen = useCartStore(selectIsCartOpen);
  const isLoading = useCartStore(selectIsLoading);
  const error = useCartStore(selectError);
  const lastUpdated = useCartStore(selectLastUpdated);
  
  // Select computed state reactively
  // Use shallow equality for object-returning selectors to prevent infinite re-renders
  const cartSummary = useCartStore(useShallow(state => selectCartSummary(state)));
  const itemCount = useCartStore(selectCartItemCount);
  const isEmpty = useCartStore(selectIsCartEmpty);
  const subtotal = useCartStore(selectCartSubtotal);
  const deliveryFee = useCartStore(selectDeliveryFee);
  const total = useCartStore(selectCartTotal);
  const displayData = useCartStore(useShallow(state => selectCartDisplayData(state)));
  const validation = useCartStore(useShallow(state => selectCartValidation(state)));
  
  // Get actions directly from store to avoid selector issues
  const addItemAction = useCartStore(state => state.addItem);
  const removeItemAction = useCartStore(state => state.removeItem);
  const updateQuantityAction = useCartStore(state => state.updateQuantity);
  const clearCartAction = useCartStore(state => state.clearCart);
  const toggleCartAction = useCartStore(state => state.toggleCart);
  const addCustomLoafAction = useCartStore(state => state.addCustomLoaf);
  const removeCustomLoafAction = useCartStore(state => state.removeCustomLoaf);
  const addNotification = useCartStore(state => state.addNotification);

  // Memoized action handlers with API integration
  const addItem = useCallback(async (cake: Cake, customization: CustomizationOptions, quantity: number = 1) => {
    try {
      // Don't set loading for simple add operations - just add directly
      addItemAction(cake, customization, quantity);
      
      // Optional: Add API validation in background without blocking UI
      try {
        const response = await cartApiService.addItemToCart(cake, customization, quantity);
        if (!response.success) {
          // console.warn('Cart validation failed:', response.error);
        }
      } catch (apiError) {
        // console.warn('Cart API validation failed:', apiError);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      useCartStore.setState({ error: errorMessage });
      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        duration: 5000
      });
    }
  }, [addItemAction, addNotification]);

  const removeItem = useCallback(async (itemId: string) => {
    try {
      // Remove item immediately without loading state
      removeItemAction(itemId);
      
      // Optional: Add API validation in background
      try {
        const response = await cartApiService.removeItemFromCart(itemId);
        if (!response.success) {
          // console.warn('Cart validation failed:', response.error);
        }
      } catch (apiError) {
        // console.warn('Cart API validation failed:', apiError);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove item from cart';
      useCartStore.setState({ error: errorMessage });
      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        duration: 5000
      });
    }
  }, [removeItemAction, addNotification]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      // Update quantity immediately without loading state
      updateQuantityAction(itemId, quantity);
      
      // Optional: Add API validation in background
      try {
        const response = await cartApiService.updateItemQuantity(itemId, quantity);
        if (!response.success) {
          // console.warn('Cart validation failed:', response.error);
        }
      } catch (apiError) {
        // console.warn('Cart API validation failed:', apiError);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update item quantity';
      useCartStore.setState({ error: errorMessage });
      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        duration: 5000
      });
    }
  }, [updateQuantityAction, addNotification]);

  const clearCart = useCallback(async () => {
    try {
      // Clear cart immediately without loading state
      clearCartAction();
      
      // Optional: Add API validation in background
      try {
        const response = await cartApiService.clearCart();
        if (!response.success) {
          // console.warn('Cart validation failed:', response.error);
        }
      } catch (apiError) {
        // console.warn('Cart API validation failed:', apiError);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      useCartStore.setState({ error: errorMessage });
      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        duration: 5000
      });
    }
  }, [clearCartAction, addNotification]);

  const addCustomLoaf = useCallback(async (selection: CakeSelection, notes: string, quantity: number = 1) => {
    try {
      // Add custom loaf immediately without loading state
      addCustomLoafAction(selection, notes, quantity);
      
      // Optional: Add API validation in background
      try {
        const response = await cartApiService.addCustomLoafToCart(selection, notes, quantity);
        if (!response.success) {
          // console.warn('Cart validation failed:', response.error);
        }
      } catch (apiError) {
        // console.warn('Cart API validation failed:', apiError);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add custom loaf to cart';
      useCartStore.setState({ error: errorMessage });
      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        duration: 5000
      });
    }
  }, [addCustomLoafAction, addNotification]);

  const removeCustomLoaf = useCallback(async (itemId: string) => {
    try {
      // Remove custom loaf immediately without loading state
      removeCustomLoafAction(itemId);
      
      // Optional: Add API validation in background
      try {
        const response = await cartApiService.removeItemFromCart(itemId);
        if (!response.success) {
          // console.warn('Cart validation failed:', response.error);
        }
      } catch (apiError) {
        // console.warn('Cart API validation failed:', apiError);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove custom loaf from cart';
      useCartStore.setState({ error: errorMessage });
      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        duration: 5000
      });
    }
  }, [removeCustomLoafAction, addNotification]);

  const syncWithServer = useCallback(async () => {
    try {
      useCartStore.setState({ isLoading: true, error: null });
      
      const response = await cartApiService.syncCartWithServer({
        items,
        customLoafItems
      });
      
      if (response.success) {
        addNotification({
          type: 'success',
          title: 'Cart Synced',
          message: 'Your cart has been synced with the server',
          duration: 3000
        });
      } else {
        useCartStore.setState({ error: response.error || 'Failed to sync cart with server' });
        addNotification({
          type: 'error',
          title: 'Sync Error',
          message: response.error || 'Failed to sync cart with server',
          duration: 5000
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sync cart with server';
      useCartStore.setState({ error: errorMessage });
      addNotification({
        type: 'error',
        title: 'Sync Error',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      useCartStore.setState({ isLoading: false });
    }
  }, [items, customLoafItems, addNotification]);

  // Auto-sync with server on cart changes (disabled to prevent infinite loops)
  // useEffect(() => {
  //   if (lastUpdated && !isLoading) {
  //     // Debounce sync to avoid too many API calls
  //     const timeoutId = setTimeout(() => {
  //       syncWithServer();
  //     }, 2000);
  //     
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [lastUpdated, isLoading, syncWithServer]);

  return {
    // State
    items,
    customLoafItems,
    totalItems,
    totalPrice,
    isOpen,
    isLoading,
    error,
    lastUpdated,
    
    // Computed state
    cartSummary,
    itemCount,
    isEmpty,
    subtotal,
    deliveryFee,
    total,
    displayData,
    validation,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart: toggleCartAction,
    addCustomLoaf,
    removeCustomLoaf,
    
    // Utility functions
    addNotification,
    syncWithServer
  };
}
