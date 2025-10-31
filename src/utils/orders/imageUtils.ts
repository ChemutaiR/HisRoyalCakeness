/**
 * Order Image Utilities
 * 
 * Utility functions for handling order-related images
 */

/**
 * Get mock uploaded images from public folder to simulate customer uploads
 */
export function getMockUploadedImages(cakeName: string): string[] {
  const mockUploads: Record<string, string[]> = {
    'Vanilla': [
      '/product-images/vanilla cake.jpg',
      '/product-images/vanilla blueberry.jpg',
      '/product-images/vanilla orange.jpg'
    ],
    'Chocolate': [
      '/product-images/chcocolate fudge.jpg',
      '/product-images/chocolate chip cake.jpg',
      '/product-images/chocolate mint.jpg',
      '/product-images/chocolate orange.jpg'
    ],
    'Red Velvet': [
      '/product-images/red velvet.jpg',
      '/product-images/white forest.jpg'
    ],
    'Strawberry': [
      '/product-images/strawberry cake.jpg',
      '/product-images/strawberry forest.jpg',
      '/product-images/vanilla blueberry.jpg'
    ],
    'Black Forest': [
      '/product-images/black forest.jpg',
      '/product-images/chcocolate fudge.jpg'
    ],
    'Coconut': [
      '/product-images/coconut cake.jpg',
      '/product-images/lemon coconut cake.jpg',
      '/product-images/orange coconut cake.jpg'
    ],
    'Banana': [
      '/product-images/banana cake.jpg',
      '/product-images/vanilla cake.jpg'
    ],
    'Mocha': [
      '/product-images/mocha cake.jpg',
      '/product-images/chcocolate fudge.jpg'
    ],
    'Carrot': [
      '/product-images/carrot cake.jpg',
      '/product-images/vanilla cake.jpg'
    ],
    'Lemon': [
      '/product-images/lemon cake.jpg',
      '/product-images/lemon blueberry cake.jpg',
      '/product-images/lemon coconut cake.jpg',
      '/product-images/lemon poppy cake.jpg'
    ],
    'Orange': [
      '/product-images/orange coconut cake.jpg',
      '/product-images/orange poppy cake.jpg',
      '/product-images/vanilla orange.jpg'
    ],
    'Marble': [
      '/product-images/marble vanilla chocolate.jpg',
      '/product-images/vanilla cake.jpg',
      '/product-images/chcocolate fudge.jpg'
    ],
    'Rainbow': [
      '/product-images/rainbow cake.jpg',
      '/product-images/sprinkle confetti cake.jpg'
    ],
    'Confetti': [
      '/product-images/sprinkle confetti cake.jpg',
      '/product-images/rainbow cake.jpg'
    ],
    'White Forest': [
      '/product-images/white forest.jpg',
      '/product-images/red velvet.jpg'
    ],
    'Strawberry Forest': [
      '/product-images/strawberry forest.jpg',
      '/product-images/strawberry cake.jpg',
      '/product-images/white forest.jpg'
    ],
    'Vanilla Blueberry': [
      '/product-images/vanilla blueberry.jpg',
      '/product-images/vanilla cake.jpg',
      '/product-images/lemon blueberry cake.jpg'
    ],
    'Vanilla Orange': [
      '/product-images/vanilla orange.jpg',
      '/product-images/vanilla cake.jpg',
      '/product-images/orange coconut cake.jpg'
    ],
    'Lemon Blueberry': [
      '/product-images/lemon blueberry cake.jpg',
      '/product-images/lemon cake.jpg',
      '/product-images/vanilla blueberry.jpg'
    ],
    'Lemon Coconut': [
      '/product-images/lemon coconut cake.jpg',
      '/product-images/lemon cake.jpg',
      '/product-images/coconut cake.jpg'
    ],
    'Lemon Poppy': [
      '/product-images/lemon poppy cake.jpg',
      '/product-images/lemon cake.jpg'
    ],
    'Orange Poppy': [
      '/product-images/orange poppy cake.jpg',
      '/product-images/orange coconut cake.jpg'
    ],
    'Chocolate Chip': [
      '/product-images/chocolate chip cake.jpg',
      '/product-images/chcocolate fudge.jpg'
    ],
    'Chocolate Mint': [
      '/product-images/chocolate mint.jpg',
      '/product-images/chcocolate fudge.jpg'
    ],
    'Chocolate Orange': [
      '/product-images/chocolate orange.jpg',
      '/product-images/chcocolate fudge.jpg',
      '/product-images/orange coconut cake.jpg'
    ],
    'Butterscotch': [
      '/product-images/butterscotch cake.jpg',
      '/product-images/vanilla cake.jpg'
    ],
    'Caramel': [
      '/product-images/caramel cake.jpg',
      '/product-images/vanilla cake.jpg'
    ],
    'Passion': [
      '/product-images/passion cake.jpg',
      '/product-images/vanilla cake.jpg'
    ],
    'Pina Colada': [
      '/product-images/pinacolada cake.jpg',
      '/product-images/coconut cake.jpg'
    ],
    'Light Fruit': [
      '/product-images/light fruit cake.jpg',
      '/product-images/vanilla cake.jpg'
    ],
    'Mild Fruit': [
      '/product-images/mild fruit cake.jpg',
      '/product-images/light fruit cake.jpg'
    ],
    'Rich Fruit': [
      '/product-images/rich fruit cake.jpg',
      '/product-images/mild fruit cake.jpg'
    ],
    'Eggless': [
      '/product-images/eggless cake.jpg',
      '/product-images/vanilla cake.jpg'
    ],
    'Eggless Vanilla': [
      '/product-images/eggless vanilla cake.jpg',
      '/product-images/eggless cake.jpg'
    ],
    'Vegan': [
      '/product-images/vegan cake.webp',
      '/product-images/eggless cake.jpg'
    ],
    'Zucchini': [
      '/product-images/zucchini cake.jpg',
      '/product-images/carrot cake.jpg'
    ],
    'Custom Loaves': [
      '/product-images/custom loaves.jpg',
      '/product-images/vanilla cake.jpg'
    ]
  };
  
  return mockUploads[cakeName] || [
    '/product-images/vanilla cake.jpg',
    '/product-images/chcocolate fudge.jpg',
    '/product-images/red velvet.jpg'
  ]; // Default fallback with multiple images
}

