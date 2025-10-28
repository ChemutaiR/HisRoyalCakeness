import { Decoration, DecorationCategory } from '@/types/shop/catalog/decorations';
import { mockDecorationOperations } from '@/mockDatabase/shop/decorations';

export interface AdminApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface AdminApiError {
  message: string;
  code: string;
  details?: any;
}

export class AdminDecorationsService {
  private static instance: AdminDecorationsService;

  private constructor() {}

  public static getInstance(): AdminDecorationsService {
    if (!AdminDecorationsService.instance) {
      AdminDecorationsService.instance = new AdminDecorationsService();
    }
    return AdminDecorationsService.instance;
  }

  // CATEGORY OPERATIONS
  async createCategory(categoryData: Omit<DecorationCategory, 'decorations'>): Promise<AdminApiResponse<DecorationCategory>> {
    try {
      const category = await mockDecorationOperations.createCategory(categoryData);
      await mockDecorationOperations.syncToShop();
      
      return {
        success: true,
        data: category,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.createCategory:', error);
      return {
        success: false,
        error: error.message || 'Failed to create category',
        timestamp: new Date().toISOString()
      };
    }
  }

  async updateCategory(id: string, updates: Partial<Omit<DecorationCategory, 'decorations'>>): Promise<AdminApiResponse<DecorationCategory>> {
    try {
      const category = await mockDecorationOperations.updateCategory(id, updates);
      if (!category) {
        return {
          success: false,
          error: 'Category not found',
          timestamp: new Date().toISOString()
        };
      }
      
      await mockDecorationOperations.syncToShop();
      
      return {
        success: true,
        data: category,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.updateCategory:', error);
      return {
        success: false,
        error: error.message || 'Failed to update category',
        timestamp: new Date().toISOString()
      };
    }
  }

  async deleteCategory(id: string): Promise<AdminApiResponse<boolean>> {
    try {
      const success = await mockDecorationOperations.deleteCategory(id);
      if (!success) {
        return {
          success: false,
          error: 'Category not found or could not be deleted',
          timestamp: new Date().toISOString()
        };
      }
      
      await mockDecorationOperations.syncToShop();
      
      return {
        success: true,
        data: true,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.deleteCategory:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete category',
        timestamp: new Date().toISOString()
      };
    }
  }

  async getCategoryById(id: string): Promise<AdminApiResponse<DecorationCategory>> {
    try {
      const category = await mockDecorationOperations.getCategoryById(id);
      if (!category) {
        return {
          success: false,
          error: 'Category not found',
          timestamp: new Date().toISOString()
        };
      }
      
      return {
        success: true,
        data: category,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.getCategoryById:', error);
      return {
        success: false,
        error: error.message || 'Failed to get category',
        timestamp: new Date().toISOString()
      };
    }
  }

  // DECORATION OPERATIONS
  async createDecoration(decorationData: Omit<Decoration, 'id'>, categoryId: string): Promise<AdminApiResponse<Decoration>> {
    try {
      const decoration = await mockDecorationOperations.createDecoration(decorationData, categoryId);
      await mockDecorationOperations.syncToShop();
      
      return {
        success: true,
        data: decoration,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.createDecoration:', error);
      return {
        success: false,
        error: error.message || 'Failed to create decoration',
        timestamp: new Date().toISOString()
      };
    }
  }

  async updateDecoration(id: number, updates: Partial<Omit<Decoration, 'id'>>): Promise<AdminApiResponse<Decoration>> {
    try {
      const decoration = await mockDecorationOperations.updateDecoration(id, updates);
      if (!decoration) {
        return {
          success: false,
          error: 'Decoration not found',
          timestamp: new Date().toISOString()
        };
      }
      
      await mockDecorationOperations.syncToShop();
      
      return {
        success: true,
        data: decoration,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.updateDecoration:', error);
      return {
        success: false,
        error: error.message || 'Failed to update decoration',
        timestamp: new Date().toISOString()
      };
    }
  }

  async deleteDecoration(id: number): Promise<AdminApiResponse<boolean>> {
    try {
      const success = await mockDecorationOperations.deleteDecoration(id);
      if (!success) {
        return {
          success: false,
          error: 'Decoration not found or could not be deleted',
          timestamp: new Date().toISOString()
        };
      }
      
      await mockDecorationOperations.syncToShop();
      
      return {
        success: true,
        data: true,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.deleteDecoration:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete decoration',
        timestamp: new Date().toISOString()
      };
    }
  }

  async getDecorationById(id: number): Promise<AdminApiResponse<Decoration>> {
    try {
      const decoration = await mockDecorationOperations.getDecorationById(id);
      if (!decoration) {
        return {
          success: false,
          error: 'Decoration not found',
          timestamp: new Date().toISOString()
        };
      }
      
      return {
        success: true,
        data: decoration,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.getDecorationById:', error);
      return {
        success: false,
        error: error.message || 'Failed to get decoration',
        timestamp: new Date().toISOString()
      };
    }
  }

  // UTILITY OPERATIONS
  async getAllCategories(): Promise<AdminApiResponse<DecorationCategory[]>> {
    try {
      const categories = await mockDecorationOperations.getAllCategories();
      return {
        success: true,
        data: categories,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.getAllCategories:', error);
      return {
        success: false,
        error: error.message || 'Failed to get categories',
        timestamp: new Date().toISOString()
      };
    }
  }

  async getAllDecorations(): Promise<AdminApiResponse<Decoration[]>> {
    try {
      const decorations = await mockDecorationOperations.getAllDecorations();
      return {
        success: true,
        data: decorations,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.getAllDecorations:', error);
      return {
        success: false,
        error: error.message || 'Failed to get decorations',
        timestamp: new Date().toISOString()
      };
    }
  }

  async syncToShop(): Promise<AdminApiResponse<boolean>> {
    try {
      const success = await mockDecorationOperations.syncToShop();
      return {
        success,
        data: success,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      // console.error('Error in AdminDecorationsService.syncToShop:', error);
      return {
        success: false,
        error: error.message || 'Failed to sync to shop',
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Export singleton instance
export const adminDecorationsService = AdminDecorationsService.getInstance();
