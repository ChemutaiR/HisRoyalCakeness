// Data transformation utilities between admin and shop formats

import { type AdminProduct } from '@/store/slices/admin/products';
import { type Cake, type CakeCream } from '@/types/shop/catalog';

/**
 * Transform admin product to shop catalog format
 */
export function adminToShop(adminProduct: AdminProduct): Cake {
  // Transform cream options from admin format to shop format
  // Ensures only one cream is marked as "included" (default) to prevent multiple "included" options
  const creams: CakeCream[] = adminProduct.whippingCreamOptions?.map(option => {
    const costMatch = option.match(/\(\+(\d+)\)/);
    const extraCost = costMatch ? parseInt(costMatch[1]) : 0;
    const name = option.replace(/\s*\(\+\d+\)/, '').trim();
    
    return {
      name,
      extraCost
    };
  }) || [];

  // Find default cream index (first cream with no extra cost, or first if all have cost)
  // Ensure only one cream is marked as default (included)
  const defaultCreamIndex = creams.findIndex(cream => cream.extraCost === 0);
  const finalDefaultIndex = defaultCreamIndex >= 0 ? defaultCreamIndex : 0;
  
  // If multiple creams have no cost, only the first one should be default
  // All others should have a minimal cost to differentiate them
  const updatedCreams = creams.map((cream, index) => {
    if (index === finalDefaultIndex) {
      // This is the default cream - keep it as included (extraCost: 0)
      return cream;
    } else if (cream.extraCost === 0) {
      // This is a non-default cream that was free - give it a small cost
      return {
        ...cream,
        extraCost: 50 // Small additional cost for non-default creams
      };
    }
    return cream;
  });

  return {
    id: parseInt(adminProduct.id.replace('prod', '')), // Convert 'prod1' to 1
    name: adminProduct.name,
    description: adminProduct.description,
    image: adminProduct.images[0] || '/placeholder.jpg', // Use first image
    prices: adminProduct.prices.map(price => ({
      weight: price.weight,
      amount: price.amount,
      servings: price.servings
    })),
    featured: adminProduct.isActive, // Map isActive to featured
    creams: updatedCreams,
    defaultCreamIndex: finalDefaultIndex
  };
}

/**
 * Transform shop catalog cake to admin product format
 */
export function shopToAdmin(cake: Cake): Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    name: cake.name,
    description: cake.description,
    images: [cake.image], // Convert single image to array
    prices: cake.prices.map(price => ({
      weight: price.weight,
      amount: price.amount,
      servings: price.servings
    })),
    whippingCreamOptions: ['Vanilla Cream'], // Default cream option
    bakingTinOptions: ['Round Tin'], // Default tin option
    isActive: cake.featured // Map featured to isActive
  };
}

/**
 * Transform multiple admin products to shop catalog format
 */
export function adminProductsToShop(adminProducts: AdminProduct[]): Cake[] {
  return adminProducts
    .filter(product => product.isActive) // Only include active products
    .map(adminToShop);
}

/**
 * Transform multiple shop cakes to admin products format
 */
export function shopCakesToAdmin(cakes: Cake[]): Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>[] {
  return cakes.map(shopToAdmin);
}

/**
 * Sync admin products to shop catalog
 * This function would be called when admin products are updated
 */
export function syncAdminToShop(adminProducts: AdminProduct[]): Cake[] {
  // Filter only active products and transform to shop format
  const activeProducts = adminProducts.filter(product => product.isActive);
  return activeProducts.map(adminToShop);
}

/**
 * Get shop catalog updates from admin product changes
 */
export function getShopCatalogUpdates(
  previousAdminProducts: AdminProduct[],
  currentAdminProducts: AdminProduct[]
): {
  added: Cake[];
  updated: Cake[];
  removed: number[]; // Shop cake IDs that should be removed
} {
  const previousShop = adminProductsToShop(previousAdminProducts);
  const currentShop = adminProductsToShop(currentAdminProducts);
  
  // Find added products
  const added = currentShop.filter(currentCake => 
    !previousShop.some(prevCake => prevCake.id === currentCake.id)
  );
  
  // Find updated products
  const updated = currentShop.filter(currentCake => {
    const prevCake = previousShop.find(prev => prev.id === currentCake.id);
    return prevCake && JSON.stringify(prevCake) !== JSON.stringify(currentCake);
  });
  
  // Find removed products
  const removed = previousShop
    .filter(prevCake => !currentShop.some(current => current.id === prevCake.id))
    .map(cake => cake.id);
  
  return { added, updated, removed };
}

/**
 * Validate admin product for shop compatibility
 */
export function validateForShop(adminProduct: AdminProduct): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check required fields
  if (!adminProduct.name || adminProduct.name.trim().length === 0) {
    errors.push('Product name is required');
  } else if (adminProduct.name.length > 100) {
    errors.push('Product name must be less than 100 characters');
  }
  
  if (!adminProduct.description || adminProduct.description.trim().length === 0) {
    errors.push('Product description is required');
  } else if (adminProduct.description.length > 500) {
    errors.push('Product description must be less than 500 characters');
  }
  
  // Check images
  if (!adminProduct.images || adminProduct.images.length === 0) {
    errors.push('At least one product image is required');
  } else {
    // Validate image URLs
    adminProduct.images.forEach((image, index) => {
      if (!image || image.trim().length === 0) {
        errors.push(`Image ${index + 1}: URL is required`);
      } else if (!image.startsWith('/') && !image.startsWith('http')) {
        errors.push(`Image ${index + 1}: Must be a valid URL or path`);
      }
    });
  }
  
  // Check prices
  if (!adminProduct.prices || adminProduct.prices.length === 0) {
    errors.push('At least one price option is required');
  } else {
    adminProduct.prices.forEach((price, index) => {
      if (!price.weight || price.weight.trim().length === 0) {
        errors.push(`Price ${index + 1}: Weight is required`);
      }
      if (price.amount === undefined || price.amount === null || price.amount <= 0) {
        errors.push(`Price ${index + 1}: Amount must be greater than 0`);
      }
      if (price.servings === undefined || price.servings === null || price.servings <= 0) {
        errors.push(`Price ${index + 1}: Servings must be greater than 0`);
      }
    });
  }
  
  // Check whipping cream options
  if (!adminProduct.whippingCreamOptions || adminProduct.whippingCreamOptions.length === 0) {
    errors.push('At least one whipping cream option is required');
  }
  
  // Check baking tin options
  if (!adminProduct.bakingTinOptions || adminProduct.bakingTinOptions.length === 0) {
    errors.push('At least one baking tin option is required');
  }
  
  // Check if product is active for shop
  if (!adminProduct.isActive) {
    errors.push('Product must be active to appear in shop');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Get shop catalog summary from admin products
 */
export function getShopCatalogSummary(adminProducts: AdminProduct[]): {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  totalImages: number;
  priceRanges: {
    min: number;
    max: number;
  };
} {
  const activeProducts = adminProducts.filter(p => p.isActive);
  const allPrices = adminProducts.flatMap(p => p.prices.map(price => price.amount));
  const allImages = adminProducts.flatMap(p => p.images);
  
  return {
    totalProducts: adminProducts.length,
    activeProducts: activeProducts.length,
    inactiveProducts: adminProducts.length - activeProducts.length,
    totalImages: allImages.length,
    priceRanges: {
      min: Math.min(...allPrices),
      max: Math.max(...allPrices)
    }
  };
}
