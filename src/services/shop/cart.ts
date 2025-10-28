import { CartItem, CustomLoafItem } from '@/types/shop/cart';
import { Cake, CustomizationOptions, CakeSelection } from '@/types/shop/catalog';

export interface CartApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface CartValidationResult {
  isValid: boolean;
  errors: string[];
}

export class CartApiService {
  private static instance: CartApiService;
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    this.timeout = 10000; // 10 seconds
  }

  static getInstance(): CartApiService {
    if (!CartApiService.instance) {
      CartApiService.instance = new CartApiService();
    }
    return CartApiService.instance;
  }

  // Validate cart item before adding
  validateCartItem(cake: Cake, customization: CustomizationOptions, quantity: number): CartValidationResult {
    const errors: string[] = [];

    if (!cake || !cake.id) {
      errors.push('Invalid cake product');
    }

    if (!customization.selectedSize) {
      errors.push('Please select a cake size');
    }

    if (!customization.selectedCream) {
      errors.push('Please select a cream option');
    }

    if (quantity <= 0) {
      errors.push('Quantity must be greater than 0');
    }

    if (quantity > 10) {
      errors.push('Maximum quantity per item is 10');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validate custom loaf before adding
  validateCustomLoaf(selection: CakeSelection, notes: string, quantity: number): CartValidationResult {
    const errors: string[] = [];

    if (!selection || !selection.flavor) {
      errors.push('Invalid cake selection');
    }

    if (quantity <= 0) {
      errors.push('Quantity must be greater than 0');
    }

    if (quantity > 5) {
      errors.push('Maximum quantity for custom loaves is 5');
    }

    if (notes && notes.length > 500) {
      errors.push('Notes cannot exceed 500 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Simulate API call for adding item to cart
  async addItemToCart(
    cake: Cake, 
    customization: CustomizationOptions, 
    quantity: number
  ): Promise<CartApiResponse> {
    try {
      // Validate the item
      const validation = this.validateCartItem(cake, customization, quantity);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simulate success response
      return {
        success: true,
        data: {
          message: 'Item added to cart successfully',
          itemId: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add item to cart'
      };
    }
  }

  // Simulate API call for adding custom loaf to cart
  async addCustomLoafToCart(
    selection: CakeSelection, 
    notes: string, 
    quantity: number
  ): Promise<CartApiResponse> {
    try {
      // Validate the custom loaf
      const validation = this.validateCustomLoaf(selection, notes, quantity);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simulate success response
      return {
        success: true,
        data: {
          message: 'Custom loaf added to cart successfully',
          itemId: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add custom loaf to cart'
      };
    }
  }

  // Simulate API call for updating item quantity
  async updateItemQuantity(itemId: string, quantity: number): Promise<CartApiResponse> {
    try {
      if (quantity < 0) {
        return {
          success: false,
          error: 'Quantity cannot be negative'
        };
      }

      if (quantity > 10) {
        return {
          success: false,
          error: 'Maximum quantity per item is 10'
        };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      return {
        success: true,
        data: {
          message: 'Item quantity updated successfully',
          itemId,
          quantity
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update item quantity'
      };
    }
  }

  // Simulate API call for removing item from cart
  async removeItemFromCart(itemId: string): Promise<CartApiResponse> {
    try {
      if (!itemId) {
        return {
          success: false,
          error: 'Item ID is required'
        };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      return {
        success: true,
        data: {
          message: 'Item removed from cart successfully',
          itemId
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to remove item from cart'
      };
    }
  }

  // Simulate API call for clearing cart
  async clearCart(): Promise<CartApiResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        data: {
          message: 'Cart cleared successfully'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear cart'
      };
    }
  }

  // Simulate API call for getting cart data
  async getCartData(): Promise<CartApiResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Return mock cart data
      return {
        success: true,
        data: {
          items: [],
          customLoafItems: [],
          totalItems: 0,
          totalPrice: 0
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load cart data'
      };
    }
  }

  // Simulate API call for syncing cart with server
  async syncCartWithServer(cartData: {
    items: CartItem[];
    customLoafItems: CustomLoafItem[];
  }): Promise<CartApiResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        data: {
          message: 'Cart synced with server successfully',
          syncedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sync cart with server'
      };
    }
  }

  // Calculate item total price
  calculateItemTotalPrice(cake: Cake, customization: CustomizationOptions): number {
    const basePrice = customization.selectedSize?.price || 0;
    const creamPrice = customization.selectedCream?.price || 0;
    const decorationsPrice = customization.selectedDecorations?.reduce((sum, decoration) => sum + decoration.price, 0) || 0;
    return basePrice + creamPrice + decorationsPrice;
  }

  // Calculate custom loaf total price
  calculateCustomLoafTotalPrice(selection: CakeSelection): number {
    const basePrice = selection.price;
    const creamPrice = selection.whippingCream?.price || 0;
    const toppingPrice = selection.topping?.price || 0;
    return basePrice + creamPrice + toppingPrice;
  }
}

// Export singleton instance
export const cartApiService = CartApiService.getInstance();
