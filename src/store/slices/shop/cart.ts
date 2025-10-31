import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import { CartItem, CustomLoafItem, CartState, CartActions } from '@/types/shop/cart';
import { Cake, CustomizationOptions, CakeSelection } from '@/types/shop/catalog';
import { calculateCartSubtotal, calculateTotalItems } from '@/utils/cart/calculations';
import { areCustomizationsEqual } from '@/utils/cart/comparison';

export interface CartStore extends CartState, CartActions {
  // Additional state
  lastUpdated: Date | null;
  activePromotionId: string | null;
  
  // Additional actions
  persistCart: () => void;
  loadCart: () => void;
  addNotification: (notification: { type: string; title: string; message: string; duration?: number }) => void;
  setActivePromotion: (promoId: string | null) => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          // Initial state
          items: [],
          customLoafItems: [],
          totalItems: 0,
          totalPrice: 0,
          isOpen: false,
          isLoading: false,
          error: null,
          lastUpdated: null,
          activePromotionId: null,

          // Actions
          addItem: (cake: Cake, customization: CustomizationOptions, quantity: number = 1) => {
            const state = get();
            const existingItemIndex = state.items.findIndex(
              item => 
                item.cake.id === cake.id &&
                areCustomizationsEqual(item.customization, customization)
            );

            if (existingItemIndex >= 0) {
              // Update existing item quantity
              const updatedItems = [...state.items];
              updatedItems[existingItemIndex].quantity += quantity;
              updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].totalPrice;
              
              const newTotalPrice = calculateCartSubtotal(updatedItems, state.customLoafItems);
              const newTotalItems = calculateTotalItems(updatedItems, state.customLoafItems);
              
              set({
                items: updatedItems,
                totalPrice: newTotalPrice,
                totalItems: newTotalItems,
                lastUpdated: new Date()
              });
            } else {
              // Add new item
              const newItem: CartItem = {
                id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                cake,
                customization,
                quantity,
                totalPrice: calculateItemTotalPrice(cake, customization),
                addedAt: new Date()
              };

              const updatedItems = [...state.items, newItem];
              const newTotalPrice = calculateCartSubtotal(updatedItems, state.customLoafItems);
              const newTotalItems = calculateTotalItems(updatedItems, state.customLoafItems);
              
              set({
                items: updatedItems,
                totalPrice: newTotalPrice,
                totalItems: newTotalItems,
                lastUpdated: new Date()
              });
            }

            // Show success notification
            get().addNotification({
              type: 'success',
              title: 'Added to Cart!',
              message: `${cake.name} has been added to your cart`,
              duration: 3000
            });
          },

          removeItem: (itemId: string) => {
            const state = get();
            const updatedItems = state.items.filter(item => item.id !== itemId);
            const newTotalPrice = calculateCartSubtotal(updatedItems, state.customLoafItems);
            const newTotalItems = calculateTotalItems(updatedItems, state.customLoafItems);
            
            set({
              items: updatedItems,
              totalPrice: newTotalPrice,
              totalItems: newTotalItems,
              lastUpdated: new Date()
            });

            get().addNotification({
              type: 'info',
              title: 'Removed from Cart',
              message: 'Item has been removed from your cart',
              duration: 2000
            });
          },

          updateQuantity: (itemId: string, quantity: number) => {
            if (quantity <= 0) {
              get().removeItem(itemId);
              return;
            }

            const state = get();
            const updatedItems = state.items.map(item =>
              item.id === itemId ? { ...item, quantity } : item
            );
            const newTotalPrice = calculateCartSubtotal(updatedItems, state.customLoafItems);
            const newTotalItems = calculateTotalItems(updatedItems, state.customLoafItems);
            
            set({
              items: updatedItems,
              totalPrice: newTotalPrice,
              totalItems: newTotalItems,
              lastUpdated: new Date()
            });
          },

          clearCart: () => {
            set({
              items: [],
              customLoafItems: [],
              totalItems: 0,
              totalPrice: 0,
              lastUpdated: new Date(),
              activePromotionId: null
            });

            get().addNotification({
              type: 'info',
              title: 'Cart Cleared',
              message: 'All items have been removed from your cart',
              duration: 2000
            });
          },

          toggleCart: () => {
            set(state => ({ isOpen: !state.isOpen }));
          },

          addCustomLoaf: (selection: CakeSelection, notes: string, quantity: number = 1) => {
            const state = get();
            const newCustomLoafItem: CustomLoafItem = {
              id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              cakeSelection: selection,
              customNotes: notes,
              quantity,
              totalPrice: calculateCustomLoafTotalPrice(selection),
              addedAt: new Date()
            };

            const updatedCustomLoafItems = [...state.customLoafItems, newCustomLoafItem];
            const newTotalPrice = calculateCartSubtotal(state.items, updatedCustomLoafItems);
            const newTotalItems = calculateTotalItems(state.items, updatedCustomLoafItems);
            
            set({
              customLoafItems: updatedCustomLoafItems,
              totalPrice: newTotalPrice,
              totalItems: newTotalItems,
              lastUpdated: new Date()
            });

            get().addNotification({
              type: 'success',
              title: 'Custom Loaf Added!',
              message: 'Your custom loaf has been added to your cart',
              duration: 3000
            });
          },

          removeCustomLoaf: (itemId: string) => {
            const state = get();
            const updatedCustomLoafItems = state.customLoafItems.filter(item => item.id !== itemId);
            const newTotalPrice = calculateCartSubtotal(state.items, updatedCustomLoafItems);
            const newTotalItems = calculateTotalItems(state.items, updatedCustomLoafItems);
            
            set({
              customLoafItems: updatedCustomLoafItems,
              totalPrice: newTotalPrice,
              totalItems: newTotalItems,
              lastUpdated: new Date()
            });

            get().addNotification({
              type: 'info',
              title: 'Custom Loaf Removed',
              message: 'Custom loaf has been removed from your cart',
              duration: 2000
            });
          },

          persistCart: () => {
            // This is handled by the persist middleware
          },

          loadCart: () => {
            // This is handled by the persist middleware
          },

          addNotification: (notification) => {
            // Placeholder for notification system
            // console.log('Notification:', notification);
          },
          
          setActivePromotion: (promoId: string | null) => {
            set({ activePromotionId: promoId });
          }
        }),
        {
          name: 'cart-storage',
          partialize: (state) => ({
            items: state.items,
            customLoafItems: state.customLoafItems,
            totalItems: state.totalItems,
            totalPrice: state.totalPrice,
            lastUpdated: state.lastUpdated
          })
        }
      )
    ),
    { name: 'cart-store' }
  )
);

// Helper function to calculate item total price
function calculateItemTotalPrice(cake: Cake, customization: CustomizationOptions): number {
  // Base cake price from the selected size
  const basePrice = customization.selectedSize?.price || 0;
  // Additional cream cost (if any)
  const creamPrice = customization.selectedCream?.price || 0;
  // Decorations cost
  const decorationsPrice = customization.selectedDecorations?.reduce((sum, decoration) => sum + decoration.price, 0) || 0;
  
  return basePrice + creamPrice + decorationsPrice;
}

// Helper function to calculate custom loaf total price
function calculateCustomLoafTotalPrice(selection: CakeSelection): number {
  const basePrice = selection.price;
  const creamPrice = selection.whippingCream?.price || 0;
  const toppingPrice = selection.topping?.price || 0;
  return basePrice + creamPrice + toppingPrice;
}
