import { CartItem, CustomLoafItem } from '@/types/shop/cart';
import { Cake, CustomizationOptions, CakeSelection } from '@/types/shop/catalog';

// Mock cart data for development and testing
export const mockCartItems: CartItem[] = [
  {
    id: 'item_1',
    cake: {
      id: 1,
      name: 'Vanilla Cake',
      description: 'Classic vanilla sponge cake with vanilla buttercream',
      image: '/product-images/vanilla cake.jpg',
      prices: [
        { weight: 'Small (6 inches)', amount: 1500, servings: 6 },
        { weight: 'Medium (8 inches)', amount: 2500, servings: 12 },
        { weight: 'Large (10 inches)', amount: 3500, servings: 20 }
      ],
      featured: true,
      creams: [
        { name: 'Vanilla Cream', extraCost: 0 },
        { name: 'Chocolate Cream', extraCost: 200 },
        { name: 'Strawberry Cream', extraCost: 200 }
      ],
      defaultCreamIndex: 0
    },
    customization: {
      selectedSize: { size: 'Medium (8 inches)', price: 2500, servings: 12 },
      selectedCream: { name: 'Vanilla Cream', price: 0, available: true },
      selectedContainerType: { name: 'Round Tin', value: 'round' },
      selectedDecorations: [],
      customNotes: 'Please add extra vanilla extract',
      uploadedImages: []
    },
    quantity: 1,
    totalPrice: 2500,
    addedAt: new Date('2024-01-20T10:30:00Z')
  },
  {
    id: 'item_2',
    cake: {
      id: 2,
      name: 'Chocolate Fudge',
      description: 'Rich chocolate cake with fudge frosting',
      image: '/product-images/chcocolate fudge.jpg',
      prices: [
        { weight: 'Small (6 inches)', amount: 1800, servings: 6 },
        { weight: 'Medium (8 inches)', amount: 2800, servings: 12 },
        { weight: 'Large (10 inches)', amount: 3800, servings: 20 }
      ],
      featured: true,
      creams: [
        { name: 'Chocolate Cream', extraCost: 0 },
        { name: 'Vanilla Cream', extraCost: 200 },
        { name: 'Mint Cream', extraCost: 300 }
      ],
      defaultCreamIndex: 0
    },
    customization: {
      selectedSize: { size: 'Large (10 inches)', price: 3800, servings: 20 },
      selectedCream: { name: 'Chocolate Cream', price: 0, available: true },
      selectedContainerType: { name: 'Round Tin', value: 'round' },
      selectedDecorations: [],
      customNotes: 'For birthday party - please make it extra special',
      uploadedImages: []
    },
    quantity: 2,
    totalPrice: 3800,
    addedAt: new Date('2024-01-20T11:15:00Z')
  }
];

export const mockCustomLoafItems: CustomLoafItem[] = [
  {
    id: 'custom_1',
    cakeSelection: {
      id: 1,
      name: 'Custom Red Velvet Loaf',
      description: 'Custom red velvet loaf with cream cheese and strawberries',
      imageUrl: '/product-images/red velvet.jpg',
      price: 1550,
      flavor: { 
        id: 1, 
        name: 'Red Velvet', 
        description: 'Classic red velvet flavor',
        imageUrl: '/product-images/red velvet.jpg',
        price: 1200 
      },
      whippingCream: { 
        id: 1, 
        name: 'Cream Cheese', 
        price: 150 
      },
      topping: { 
        id: 1, 
        name: 'Strawberries', 
        type: 'fruit' as const,
        price: 200 
      }
    },
    customNotes: 'Please make it heart-shaped if possible',
    quantity: 1,
    totalPrice: 1550,
    addedAt: new Date('2024-01-20T12:00:00Z')
  }
];

// Mock cart state
export const mockCartState = {
  items: mockCartItems,
  customLoafItems: mockCustomLoafItems,
  totalItems: 3, // 1 + 2 + 1
  totalPrice: 7850, // 2500 + (3800 * 2) + 1550
  isOpen: false,
  isLoading: false,
  error: null,
  lastUpdated: new Date('2024-01-20T12:00:00Z')
};

// Mock cart history for testing
export const mockCartHistory = [
  {
    id: 'history_1',
    timestamp: new Date('2024-01-20T10:30:00Z'),
    action: 'add_item',
    itemId: 'item_1',
    details: 'Added Vanilla Cake (Medium) to cart',
    user: 'user_123'
  },
  {
    id: 'history_2',
    timestamp: new Date('2024-01-20T11:15:00Z'),
    action: 'add_item',
    itemId: 'item_2',
    details: 'Added Chocolate Fudge (Large) to cart',
    user: 'user_123'
  },
  {
    id: 'history_3',
    timestamp: new Date('2024-01-20T11:30:00Z'),
    action: 'update_quantity',
    itemId: 'item_2',
    details: 'Updated Chocolate Fudge quantity to 2',
    user: 'user_123'
  },
  {
    id: 'history_4',
    timestamp: new Date('2024-01-20T12:00:00Z'),
    action: 'add_custom_loaf',
    itemId: 'custom_1',
    details: 'Added custom Red Velvet loaf to cart',
    user: 'user_123'
  }
];

// Mock functions for cart operations
export const mockCartOperations = {
  // Simulate adding item to cart
  addItem: async (cake: Cake, customization: CustomizationOptions, quantity: number = 1): Promise<CartItem> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    const newItem: CartItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      cake,
      customization,
      quantity,
      totalPrice: calculateItemTotalPrice(cake, customization),
      addedAt: new Date()
    };
    
    return newItem;
  },

  // Simulate adding custom loaf to cart
  addCustomLoaf: async (selection: CakeSelection, notes: string, quantity: number = 1): Promise<CustomLoafItem> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    const newCustomLoaf: CustomLoafItem = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      cakeSelection: selection,
      customNotes: notes,
      quantity,
      totalPrice: calculateCustomLoafTotalPrice(selection),
      addedAt: new Date()
    };
    
    return newCustomLoaf;
  },

  // Simulate updating item quantity
  updateQuantity: async (itemId: string, quantity: number): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return true;
  },

  // Simulate removing item from cart
  removeItem: async (itemId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return true;
  },

  // Simulate clearing cart
  clearCart: async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return true;
  },

  // Simulate getting cart data
  getCartData: async (): Promise<{ items: CartItem[]; customLoafItems: CustomLoafItem[] }> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return {
      items: mockCartItems,
      customLoafItems: mockCustomLoafItems
    };
  },

  // Simulate syncing cart with server
  syncWithServer: async (cartData: { items: CartItem[]; customLoafItems: CustomLoafItem[] }): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    return true;
  }
};

// Helper functions for price calculations
function calculateItemTotalPrice(cake: Cake, customization: CustomizationOptions): number {
  const basePrice = customization.selectedSize?.price || 0;
  const creamPrice = customization.selectedCream?.price || 0;
  return basePrice + creamPrice;
}

function calculateCustomLoafTotalPrice(selection: CakeSelection): number {
  const basePrice = selection.price;
  const creamPrice = selection.whippingCream?.price || 0;
  const toppingPrice = selection.topping?.price || 0;
  return basePrice + creamPrice + toppingPrice;
}

// Mock cart validation
export const mockCartValidation = {
  validateItem: (cake: Cake, customization: CustomizationOptions, quantity: number) => {
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
  },

  validateCustomLoaf: (selection: CakeSelection, notes: string, quantity: number) => {
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
};

// Mock cart analytics
export const mockCartAnalytics = {
  getCartMetrics: () => ({
    totalItems: mockCartState.totalItems,
    totalValue: mockCartState.totalPrice,
    averageItemValue: mockCartState.totalPrice / mockCartState.totalItems,
    mostPopularSize: 'Medium (8 inches)',
    mostPopularCream: 'Vanilla Cream',
    cartAbandonmentRate: 0.15,
    averageCartValue: 7850,
    conversionRate: 0.08
  }),

  getItemMetrics: (itemId: string) => ({
    views: Math.floor(Math.random() * 100) + 10,
    addToCartRate: Math.random() * 0.3 + 0.1,
    removeRate: Math.random() * 0.1 + 0.02,
    averageQuantity: Math.random() * 2 + 1
  })
};
