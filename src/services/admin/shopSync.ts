// Shop synchronization service - Connects admin products to shop catalog

import { useCatalogStore } from '@/store/slices/shop/catalog';
import { useAdminProductsStore } from '@/store/slices/admin/products';
import { 
  adminToShop, 
  // adminProductsToShop, 
  syncAdminToShop,
  // getShopCatalogUpdates,
  validateForShop 
} from '@/utils/admin/dataTransform';
import { type AdminProduct } from '@/store/slices/admin/products';
// import { type Cake } from '@/mockDatabase/shop/catalog';

export interface SyncResult {
  success: boolean;
  added: number;
  updated: number;
  removed: number;
  errors: string[];
}

export class ShopSyncService {
  /**
   * Sync all admin products to shop catalog
   */
  static async syncAllProducts(): Promise<SyncResult> {
    try {
      const adminStore = useAdminProductsStore.getState();
      const catalogStore = useCatalogStore.getState();
      
      const adminProducts = adminStore.products;
      
      // Add validation before sync
      if (!adminProducts || adminProducts.length === 0) {
        return {
          success: false,
          added: 0,
          updated: 0,
          removed: 0,
          errors: ['No products to sync']
        };
      }
      
      // Add retry logic with exponential backoff
      let retries = 3;
      let lastError: Error | null = null;
      
      while (retries > 0) {
        try {
          const shopCakes = syncAdminToShop(adminProducts);
          
          // Update shop catalog store and clear cache to ensure fresh data
          catalogStore.setCakes(shopCakes);
          catalogStore.clearCache();
          
          return {
            success: true,
            added: shopCakes.length,
            updated: 0,
            removed: 0,
            errors: []
          };
        } catch (error) {
          lastError = error instanceof Error ? error : new Error('Unknown sync error');
          retries--;
          
          if (retries > 0) {
            // Exponential backoff: wait 1s, 2s, 4s
            const waitTime = Math.pow(2, 3 - retries) * 1000;
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
      }
      
      // All retries failed
      throw lastError || new Error('Sync failed after 3 attempts');
      
    } catch (error) {
      return {
        success: false,
        added: 0,
        updated: 0,
        removed: 0,
        errors: [error instanceof Error ? error.message : 'Sync failed']
      };
    }
  }

  /**
   * Sync specific admin product to shop catalog
   */
  static async syncProduct(adminProduct: AdminProduct): Promise<SyncResult> {
    try {
      // Validate product for shop compatibility
      const validation = validateForShop(adminProduct);
      if (!validation.isValid) {
        return {
          success: false,
          added: 0,
          updated: 0,
          removed: 0,
          errors: validation.errors
        };
      }

      const catalogStore = useCatalogStore.getState();
      const currentCakes = catalogStore.cakes;
      
      if (adminProduct.isActive) {
        // Add or update product in shop
        const shopCake = adminToShop(adminProduct);
        const existingIndex = currentCakes.findIndex(cake => cake.id === shopCake.id);
        
        if (existingIndex >= 0) {
          // Update existing
          const updatedCakes = [...currentCakes];
          updatedCakes[existingIndex] = shopCake;
          catalogStore.setCakes(updatedCakes);
          
          return {
            success: true,
            added: 0,
            updated: 1,
            removed: 0,
            errors: []
          };
        } else {
          // Add new
          catalogStore.setCakes([...currentCakes, shopCake]);
          
          return {
            success: true,
            added: 1,
            updated: 0,
            removed: 0,
            errors: []
          };
        }
      } else {
        // Remove inactive product from shop
        const shopCakeId = parseInt(adminProduct.id.replace('prod', ''));
        const filteredCakes = currentCakes.filter(cake => cake.id !== shopCakeId);
        catalogStore.setCakes(filteredCakes);
        
        return {
          success: true,
          added: 0,
          updated: 0,
          removed: 1,
          errors: []
        };
      }
    } catch (error) {
      return {
        success: false,
        added: 0,
        updated: 0,
        removed: 0,
        errors: [error instanceof Error ? error.message : 'Product sync failed']
      };
    }
  }

  /**
   * Remove product from shop catalog
   */
  static async removeFromShop(adminProductId: string): Promise<SyncResult> {
    try {
      const catalogStore = useCatalogStore.getState();
      const currentCakes = catalogStore.cakes;
      const shopCakeId = parseInt(adminProductId.replace('prod', ''));
      
      const filteredCakes = currentCakes.filter(cake => cake.id !== shopCakeId);
      catalogStore.setCakes(filteredCakes);
      
      return {
        success: true,
        added: 0,
        updated: 0,
        removed: 1,
        errors: []
      };
    } catch (error) {
      return {
        success: false,
        added: 0,
        updated: 0,
        removed: 0,
        errors: [error instanceof Error ? error.message : 'Remove from shop failed']
      };
    }
  }

  /**
   * Get sync status between admin and shop
   */
  static getSyncStatus(): {
    adminProducts: number;
    shopProducts: number;
    syncedProducts: number;
    unsyncedProducts: number;
    inactiveProducts: number;
  } {
    const adminStore = useAdminProductsStore.getState();
    const catalogStore = useCatalogStore.getState();
    
    const adminProducts = adminStore.products;
    const shopCakes = catalogStore.cakes;
    const activeAdminProducts = adminProducts.filter((p: AdminProduct) => p.isActive);
    
    // Find synced products (admin products that exist in shop)
    const syncedProducts = activeAdminProducts.filter((adminProduct: AdminProduct) => {
      const shopCakeId = parseInt(adminProduct.id.replace('prod', ''));
      return shopCakes.some((cake: any) => cake.id === shopCakeId);
    }).length;
    
    const unsyncedProducts = activeAdminProducts.length - syncedProducts;
    const inactiveProducts = adminProducts.length - activeAdminProducts.length;
    
    return {
      adminProducts: adminProducts.length,
      shopProducts: shopCakes.length,
      syncedProducts,
      unsyncedProducts,
      inactiveProducts
    };
  }

  /**
   * Validate all admin products for shop compatibility
   */
  static validateAllForShop(): {
    valid: AdminProduct[];
    invalid: Array<{ product: AdminProduct; errors: string[] }>;
  } {
    const adminStore = useAdminProductsStore.getState();
    const adminProducts = adminStore.products;
    
    const valid: AdminProduct[] = [];
    const invalid: Array<{ product: AdminProduct; errors: string[] }> = [];
    
    adminProducts.forEach((product: AdminProduct) => {
      const validation = validateForShop(product);
      if (validation.isValid) {
        valid.push(product);
      } else {
        invalid.push({ product, errors: validation.errors });
      }
    });
    
    return { valid, invalid };
  }

  /**
   * Force full resync of shop catalog from admin products
   */
  static async forceResync(): Promise<SyncResult> {
    try {
      const adminStore = useAdminProductsStore.getState();
      const adminProducts = adminStore.products;
      
      // Get all active admin products and convert to shop format
      const shopCakes = syncAdminToShop(adminProducts);
      
      // Update shop catalog
      const catalogStore = useCatalogStore.getState();
      catalogStore.setCakes(shopCakes);
      
      return {
        success: true,
        added: shopCakes.length,
        updated: 0,
        removed: 0,
        errors: []
      };
    } catch (error) {
      return {
        success: false,
        added: 0,
        updated: 0,
        removed: 0,
        errors: [error instanceof Error ? error.message : 'Force resync failed']
      };
    }
  }
}
