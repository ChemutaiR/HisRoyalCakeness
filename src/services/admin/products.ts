// Admin products service - Business logic for product management

import { type AdminProduct } from '@/store/slices/admin/products';
import { 
  adminProductsData, 
  getAdminProductById, 
  getActiveAdminProducts,
  searchAdminProducts,
  // getAdminProductsByCreamOption,
  // getAdminProductsByTinOption
} from '@/mockDatabase/admin/products';

export interface ProductFilters {
  searchTerm?: string;
  creamOption?: string;
  tinOption?: string;
  isActive?: boolean;
}

export interface ProductStats {
  totalProducts: number;
  activeCount: number;
  inactiveCount: number;
  uniqueCreamOptions: string[];
  uniqueTinOptions: string[];
  creamOptionsCount: number;
  tinOptionsCount: number;
}

export class AdminProductsService {
  /**
   * Get all admin products
   */
  static async getAllProducts(): Promise<AdminProduct[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...adminProductsData];
  }

  /**
   * Get product by ID
   */
  static async getProductById(id: string): Promise<AdminProduct | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return getAdminProductById(id) || null;
  }

  /**
   * Get active products only
   */
  static async getActiveProducts(): Promise<AdminProduct[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return getActiveAdminProducts();
  }

  /**
   * Search products with filters
   */
  static async searchProducts(filters: ProductFilters): Promise<AdminProduct[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let results = [...adminProductsData];

    // Apply search term filter
    if (filters.searchTerm) {
      results = searchAdminProducts(filters.searchTerm);
    }

    // Apply cream option filter
    if (filters.creamOption) {
      results = results.filter(product => 
        product.whippingCreamOptions.includes(filters.creamOption!)
      );
    }

    // Apply tin option filter
    if (filters.tinOption) {
      results = results.filter(product => 
        product.bakingTinOptions.includes(filters.tinOption!)
      );
    }

    // Apply active status filter
    if (filters.isActive !== undefined) {
      results = results.filter(product => product.isActive === filters.isActive);
    }

    return results;
  }

  /**
   * Create new product
   */
  static async createProduct(productData: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdminProduct> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newProduct: AdminProduct = {
      ...productData,
      id: `prod${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Persist to mock database (mutate in-memory array)
    adminProductsData.push(newProduct);
    return newProduct;
  }

  /**
   * Update existing product
   */
  static async updateProduct(id: string, updates: Partial<AdminProduct>): Promise<AdminProduct | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const existingProduct = getAdminProductById(id);
    if (!existingProduct) {
      return null;
    }

    const updatedProduct: AdminProduct = {
      ...existingProduct,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    // Persist changes in the mock database array
    const index = adminProductsData.findIndex(p => p.id === id);
    if (index >= 0) {
      adminProductsData[index] = updatedProduct;
    }
    return updatedProduct;
  }

  /**
   * Delete product
   */
  static async deleteProduct(id: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const existingProduct = getAdminProductById(id);
    if (!existingProduct) {
      return false;
    }
    // Remove from mock database array
    const index = adminProductsData.findIndex(p => p.id === id);
    if (index >= 0) {
      adminProductsData.splice(index, 1);
      return true;
    }
    return false;
  }

  // Stats are computed from centralized store selectors to avoid duplication

  /**
   * Validate product data
   */
  static validateProduct(productData: Partial<AdminProduct>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!productData.name?.trim()) {
      errors.push('Product name is required');
    }

    if (!productData.description?.trim()) {
      errors.push('Product description is required');
    }

    if (!productData.images || productData.images.length === 0) {
      errors.push('At least one product image is required');
    }

    if (!productData.prices || productData.prices.length === 0) {
      errors.push('At least one price option is required');
    }

    if (productData.prices) {
      productData.prices.forEach((price, index) => {
        if (!price.weight?.trim()) {
          errors.push(`Price option ${index + 1}: Weight is required`);
        }
        if (!price.amount || price.amount <= 0) {
          errors.push(`Price option ${index + 1}: Amount must be greater than 0`);
        }
        if (!price.servings || price.servings <= 0) {
          errors.push(`Price option ${index + 1}: Servings must be greater than 0`);
        }
      });
    }

    if (!productData.whippingCreamOptions || productData.whippingCreamOptions.length === 0) {
      errors.push('At least one whipping cream option is required');
    } else {
      // Enforce: first option is the default and must be zero-cost (no "+X" in label)
      const defaultOption = productData.whippingCreamOptions[0];
      if (/\(\+\d+\)/.test(defaultOption)) {
        errors.push('Default cream (first option) must have no extra cost');
      }
    }

    if (!productData.bakingTinOptions || productData.bakingTinOptions.length === 0) {
      errors.push('At least one baking tin option is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get available cream options across all products
   */
  static async getAvailableCreamOptions(): Promise<string[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const allCreamOptions = adminProductsData.flatMap(p => p.whippingCreamOptions);
    return Array.from(new Set(allCreamOptions)).sort();
  }

  /**
   * Get available tin options across all products
   */
  static async getAvailableTinOptions(): Promise<string[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const allTinOptions = adminProductsData.flatMap(p => p.bakingTinOptions);
    return Array.from(new Set(allTinOptions)).sort();
  }
}
