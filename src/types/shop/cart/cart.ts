// Cart-related type definitions

import { Cake, CustomizationOptions, CakeSelection } from '../catalog/product';

export interface CartItem {
  id: string;
  cake: Cake;
  customization: CustomizationOptions;
  quantity: number;
  totalPrice: number;
  addedAt: Date;
}

export interface CustomLoafItem {
  id: string;
  cakeSelection: CakeSelection;
  customNotes: string;
  quantity: number;
  totalPrice: number;
  addedAt: Date;
}

// CakeSelection, CakeFlavor, WhippingCream, and Topping are now imported from catalog/product

export interface CartState {
  items: CartItem[];
  customLoafItems: CustomLoafItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface CartActions {
  addItem: (cake: Cake, customization: CustomizationOptions, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  addCustomLoaf: (selection: CakeSelection, notes: string, quantity?: number) => void;
  removeCustomLoaf: (itemId: string) => void;
}
