import { Decoration, DecorationCategory } from '@/types/shop/catalog/decorations';

// Sample decorations data using images from public/product-images
export const mockDecorations: Decoration[] = [
  {
    id: 1,
    name: 'Fresh Rose Petals',
    description: 'Elegant fresh rose petals scattered on top',
    imageUrl: '/product-images/3b4f44b1bdb27eba3c9eac0fb60c3676.jpg',
    price: 500,
    available: true
  },
  {
    id: 2,
    name: 'Chocolate Shavings',
    description: 'Rich dark chocolate shavings for extra indulgence',
    imageUrl: '/product-images/chcocolate fudge.jpg',
    price: 300,
    available: true
  },
  {
    id: 3,
    name: 'Edible Gold Leaf',
    description: 'Luxurious edible gold leaf for special occasions',
    imageUrl: '/product-images/5585c36beb0e8bf641b56182ce185c3d.jpg',
    price: 1200,
    available: true
  },
  {
    id: 4,
    name: 'Fresh Strawberries',
    description: 'Fresh seasonal strawberries as decoration',
    imageUrl: '/product-images/strawberry cake.jpg',
    price: 400,
    available: true
  },
  {
    id: 5,
    name: 'Birthday Candles',
    description: 'Colorful birthday candles (set of 12)',
    imageUrl: '/product-images/sprinkle confetti cake.jpg',
    price: 200,
    available: true
  },
  {
    id: 6,
    name: 'Custom Message',
    description: 'Personalized message written in chocolate',
    imageUrl: '/product-images/a1e90535329886c7bbee89eb27f99b94.jpg',
    price: 350,
    available: true
  },
  {
    id: 7,
    name: 'Sugar Flowers',
    description: 'Handcrafted sugar flowers for elegant touch',
    imageUrl: '/product-images/ea5384dfa2455bbb129cdcf2857cf0ba.jpg',
    price: 800,
    available: true
  },
  {
    id: 8,
    name: 'Sprinkles Mix',
    description: 'Colorful sprinkles mix for fun celebrations',
    imageUrl: '/product-images/rainbow cake.jpg',
    price: 150,
    available: true
  },
  {
    id: 9,
    name: 'Nuts & Dried Fruits',
    description: 'Premium nuts and dried fruits decoration',
    imageUrl: '/product-images/coconut cake.jpg',
    price: 450,
    available: true
  },
  {
    id: 10,
    name: 'Whipped Cream Swirls',
    description: 'Artistic whipped cream swirls and patterns',
    imageUrl: '/product-images/vanilla cake.jpg',
    price: 250,
    available: true
  },
  {
    id: 11,
    name: 'Customizable Edible Print',
    description: 'Personalized edible print with your own design or message',
    imageUrl: '/product-images/e8e472fd20f7b8fae1666f913618275e.jpg',
    price: 600,
    available: true
  },
  {
    id: 12,
    name: 'Fruit Toppings',
    description: 'Fresh seasonal fruit arrangements',
    imageUrl: '/product-images/lemon blueberry cake.jpg',
    price: 350,
    available: true
  },
  {
    id: 13,
    name: 'Chocolate Drizzle',
    description: 'Rich chocolate drizzle patterns',
    imageUrl: '/product-images/chocolate chip cake.jpg',
    price: 200,
    available: true
  },
  {
    id: 14,
    name: 'Marble Design',
    description: 'Elegant marble pattern decoration',
    imageUrl: '/product-images/marble vanilla chocolate.jpg',
    price: 400,
    available: true
  },
  {
    id: 15,
    name: 'Forest Theme',
    description: 'Natural forest-inspired decorations',
    imageUrl: '/product-images/black forest.jpg',
    price: 700,
    available: true
  }
];

// Sample categories - owner can manage these through admin
export const mockDecorationCategories: DecorationCategory[] = [
  {
    id: 'flowers',
    name: 'Flowers & Nature',
    icon: '🌸',
    decorations: mockDecorations.filter(d => 
      d.name.includes('Rose') || 
      d.name.includes('Strawberries') || 
      d.name.includes('Sugar Flowers') ||
      d.name.includes('Fruit')
    )
  },
  {
    id: 'chocolate',
    name: 'Chocolate & Sweets',
    icon: '🍫',
    decorations: mockDecorations.filter(d => 
      d.name.includes('Chocolate') || 
      d.name.includes('Sprinkles') || 
      d.name.includes('Nuts') ||
      d.name.includes('Marble')
    )
  },
  {
    id: 'special',
    name: 'Special Occasions',
    icon: '✨',
    decorations: mockDecorations.filter(d => 
      d.name.includes('Birthday') || 
      d.name.includes('Gold') || 
      d.name.includes('Message') ||
      d.name.includes('Customizable') ||
      d.name.includes('Forest')
    )
  },
  {
    id: 'cream',
    name: 'Cream & Frosting',
    icon: '🎂',
    decorations: mockDecorations.filter(d => 
      d.name.includes('Cream') ||
      d.name.includes('Whipped')
    )
  },
  {
    id: 'prints',
    name: 'Custom Prints',
    icon: '🖨️',
    decorations: mockDecorations.filter(d => 
      d.name.includes('Print') ||
      d.name.includes('Customizable')
    )
  }
];

// Mock API operations for decorations
export const mockDecorationOperations = {
  // Get all decorations
  getAllDecorations: async (): Promise<Decoration[]> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return mockDecorations.filter(d => d.available);
  },

  // Get decorations by category
  getDecorationsByCategory: async (categoryId: string): Promise<Decoration[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const category = mockDecorationCategories.find(c => c.id === categoryId);
    return category ? category.decorations.filter(d => d.available) : [];
  },

  // Search decorations
  searchDecorations: async (query: string): Promise<Decoration[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const lowercaseQuery = query.toLowerCase();
    return mockDecorations.filter(d => 
      d.available && (
        d.name.toLowerCase().includes(lowercaseQuery) ||
        d.description.toLowerCase().includes(lowercaseQuery)
      )
    );
  },

  // Get all categories
  getAllCategories: async (): Promise<DecorationCategory[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockDecorationCategories;
  },

  // Get decoration by ID
  getDecorationById: async (id: number): Promise<Decoration | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockDecorations.find(d => d.id === id) || null;
  },

  // ADMIN OPERATIONS - Category Management
  createCategory: async (categoryData: Omit<DecorationCategory, 'decorations'>): Promise<DecorationCategory> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newCategory: DecorationCategory = {
      ...categoryData,
      decorations: []
    };
    mockDecorationCategories.push(newCategory);
    return newCategory;
  },

  updateCategory: async (id: string, updates: Partial<Omit<DecorationCategory, 'decorations'>>): Promise<DecorationCategory | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const categoryIndex = mockDecorationCategories.findIndex(c => c.id === id);
    if (categoryIndex === -1) return null;
    
    mockDecorationCategories[categoryIndex] = {
      ...mockDecorationCategories[categoryIndex],
      ...updates
    };
    return mockDecorationCategories[categoryIndex];
  },

  deleteCategory: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const categoryIndex = mockDecorationCategories.findIndex(c => c.id === id);
    if (categoryIndex === -1) return false;
    
    // Remove decorations from this category first
    const categoryDecorations = mockDecorationCategories[categoryIndex].decorations;
    categoryDecorations.forEach(decoration => {
      const decorationIndex = mockDecorations.findIndex(d => d.id === decoration.id);
      if (decorationIndex !== -1) {
        mockDecorations.splice(decorationIndex, 1);
      }
    });
    
    mockDecorationCategories.splice(categoryIndex, 1);
    return true;
  },

  // ADMIN OPERATIONS - Decoration Management
  createDecoration: async (decorationData: Omit<Decoration, 'id'>, categoryId: string): Promise<Decoration> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newId = Math.max(...mockDecorations.map(d => d.id), 0) + 1;
    const newDecoration: Decoration = {
      ...decorationData,
      id: newId
    };
    
    mockDecorations.push(newDecoration);
    
    // Add to category
    const category = mockDecorationCategories.find(c => c.id === categoryId);
    if (category) {
      category.decorations.push(newDecoration);
    }
    
    return newDecoration;
  },

  updateDecoration: async (id: number, updates: Partial<Omit<Decoration, 'id'>>): Promise<Decoration | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const decorationIndex = mockDecorations.findIndex(d => d.id === id);
    if (decorationIndex === -1) return null;
    
    mockDecorations[decorationIndex] = {
      ...mockDecorations[decorationIndex],
      ...updates
    };
    
    // Update in all categories
    mockDecorationCategories.forEach(category => {
      const decorationInCategory = category.decorations.find(d => d.id === id);
      if (decorationInCategory) {
        Object.assign(decorationInCategory, updates);
      }
    });
    
    return mockDecorations[decorationIndex];
  },

  deleteDecoration: async (id: number): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const decorationIndex = mockDecorations.findIndex(d => d.id === id);
    if (decorationIndex === -1) return false;
    
    mockDecorations.splice(decorationIndex, 1);
    
    // Remove from all categories
    mockDecorationCategories.forEach(category => {
      const decorationInCategoryIndex = category.decorations.findIndex(d => d.id === id);
      if (decorationInCategoryIndex !== -1) {
        category.decorations.splice(decorationInCategoryIndex, 1);
      }
    });
    
    return true;
  },

  // ADMIN OPERATIONS - Utility
  getCategoryById: async (id: string): Promise<DecorationCategory | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockDecorationCategories.find(c => c.id === id) || null;
  },

  // Sync decorations to shop (for real-time updates)
  syncToShop: async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    // In a real app, this would sync to shop database
    // For now, we just return success since we're using the same database
    return true;
  }
};
