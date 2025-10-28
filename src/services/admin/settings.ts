import { BusinessInfo, BusinessHours } from '@/types/admin/settings';
import { 
  fetchBusinessSettings, 
  updateBusinessSettings, 
  resetBusinessSettings 
} from '@/mockDatabase/admin/settings';
import { businessFormSchema } from '@/lib/validation';

export interface SettingsApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface SettingsApiError {
  error: string;
  code: string;
  details?: any;
  timestamp: string;
}

// Business Settings API
export class SettingsApiService {
  private static instance: SettingsApiService;
  private retryAttempts = 3;
  private retryDelay = 1000;

  static getInstance(): SettingsApiService {
    if (!SettingsApiService.instance) {
      SettingsApiService.instance = new SettingsApiService();
    }
    return SettingsApiService.instance;
  }

  private async withRetry<T>(
    operation: () => Promise<T>,
    attempts: number = this.retryAttempts
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (attempts > 1) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.withRetry(operation, attempts - 1);
      }
      throw error;
    }
  }

  async getBusinessSettings(): Promise<SettingsApiResponse<BusinessInfo & { businessHours: BusinessHours }>> {
    try {
      const data = await this.withRetry(() => fetchBusinessSettings());
      
      return {
        data,
        success: true,
        message: 'Business settings retrieved successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw {
        error: 'Failed to fetch business settings',
        code: 'FETCH_ERROR',
        details: error,
        timestamp: new Date().toISOString()
      } as SettingsApiError;
    }
  }

  async updateBusinessSettings(
    data: Partial<BusinessInfo & { businessHours: BusinessHours }>
  ): Promise<SettingsApiResponse<BusinessInfo & { businessHours: BusinessHours }>> {
    try {
      const updatedData = await this.withRetry(() => updateBusinessSettings(data));
      
      return {
        data: updatedData,
        success: true,
        message: 'Business settings updated successfully',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw {
        error: 'Failed to update business settings',
        code: 'UPDATE_ERROR',
        details: error,
        timestamp: new Date().toISOString()
      } as SettingsApiError;
    }
  }

  async resetBusinessSettings(): Promise<SettingsApiResponse<BusinessInfo & { businessHours: BusinessHours }>> {
    try {
      const data = await this.withRetry(() => resetBusinessSettings());
      
      return {
        data,
        success: true,
        message: 'Business settings reset to defaults',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw {
        error: 'Failed to reset business settings',
        code: 'RESET_ERROR',
        details: error,
        timestamp: new Date().toISOString()
      } as SettingsApiError;
    }
  }


  validatePhoneNumber(phone: string): boolean {
    const result = businessFormSchema.shape.phoneNumber.safeParse(phone);
    return result.success;
  }

  validateSocialMedia(handle: string): boolean {
    const result = businessFormSchema.shape.socialMedia.safeParse(handle);
    return result.success;
  }

  validateBusinessHours(hours: BusinessHours): boolean {
    const result = businessFormSchema.shape.businessHours.safeParse(hours);
    return result.success;
  }

  validateFormData(data: any): { isValid: boolean; errors?: string[] } {
    const result = businessFormSchema.safeParse(data);
    
    if (result.success) {
      return { isValid: true };
    }
    
    const errors = result.error.issues.map(err => err.message);
    return { isValid: false, errors };
  }
}

// Export singleton instance
export const settingsApiService = SettingsApiService.getInstance();
