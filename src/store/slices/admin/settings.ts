import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { BusinessInfo, BusinessHours } from '@/types/admin/settings';
import { settingsApiService, SettingsApiError } from '@/services/admin/settings';
import { 
  businessFormSchema
} from '@/lib/validation';

export interface SettingsState {
  // Data
  businessInfo: BusinessInfo | null;
  businessHours: BusinessHours | null;
  
  // Loading states
  isLoading: boolean;
  isUpdating: boolean;
  isResetting: boolean;
  
  // Error states
  error: string | null;
  lastError: SettingsApiError | null;
  
  // Form state
  hasChanges: boolean;
  isDirty: boolean;
  lastSaved: string | null;
  
  // Actions
  fetchBusinessSettings: () => Promise<void>;
  updateBusinessSettings: (data: Partial<BusinessInfo & { businessHours: BusinessHours }>) => Promise<void>;
  resetBusinessSettings: () => Promise<void>;
  
  // Form actions
  setField: (field: keyof BusinessInfo, value: string) => void;
  setBusinessHours: (day: keyof BusinessHours, hours: BusinessHours[keyof BusinessHours]) => void;
  setHasChanges: (hasChanges: boolean) => void;
  clearError: () => void;
  resetForm: () => void;
  
  // Computed getters
  getFormattedBusinessHours: () => string;
  getBusinessContactInfo: () => { email: string; phone: string; address: string };
  isFormValid: () => boolean;
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      businessInfo: null,
      businessHours: null,
      isLoading: false,
      isUpdating: false,
      isResetting: false,
      error: null,
      lastError: null,
      hasChanges: false,
      isDirty: false,
      lastSaved: null,

      // Fetch business settings
      fetchBusinessSettings: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await settingsApiService.getBusinessSettings();
          
          set({
            businessInfo: {
              phoneNumber: response.data.phoneNumber,
              socialMedia: response.data.socialMedia
            },
            businessHours: response.data.businessHours,
            isLoading: false,
            hasChanges: false,
            isDirty: false,
            lastSaved: response.timestamp
          });
        } catch (error) {
          const apiError = error as SettingsApiError;
          set({
            isLoading: false,
            error: apiError.error,
            lastError: apiError
          });
        }
      },

      // Update business settings
      updateBusinessSettings: async (data) => {
        set({ isUpdating: true, error: null });
        
        try {
          const response = await settingsApiService.updateBusinessSettings(data);
          
          set({
            businessInfo: {
              phoneNumber: response.data.phoneNumber,
              socialMedia: response.data.socialMedia
            },
            businessHours: response.data.businessHours,
            isUpdating: false,
            hasChanges: false,
            isDirty: false,
            lastSaved: response.timestamp
          });
        } catch (error) {
          const apiError = error as SettingsApiError;
          set({
            isUpdating: false,
            error: apiError.error,
            lastError: apiError
          });
        }
      },

      // Reset business settings
      resetBusinessSettings: async () => {
        set({ isResetting: true, error: null });
        
        try {
          const response = await settingsApiService.resetBusinessSettings();
          
          set({
            businessInfo: {
              phoneNumber: response.data.phoneNumber,
              socialMedia: response.data.socialMedia
            },
            businessHours: response.data.businessHours,
            isResetting: false,
            hasChanges: false,
            isDirty: false,
            lastSaved: response.timestamp
          });
        } catch (error) {
          const apiError = error as SettingsApiError;
          set({
            isResetting: false,
            error: apiError.error,
            lastError: apiError
          });
        }
      },

      // Form actions
      setField: (field, value) => {
        set(state => ({
          businessInfo: state.businessInfo ? { ...state.businessInfo, [field]: value } : null,
          hasChanges: true,
          isDirty: true
        }));
      },

      setBusinessHours: (day, hours) => {
        set(state => ({
          businessHours: state.businessHours ? { ...state.businessHours, [day]: hours } : null,
          hasChanges: true,
          isDirty: true
        }));
      },

      setHasChanges: (hasChanges) => {
        set({ hasChanges });
      },

      clearError: () => {
        set({ error: null, lastError: null });
      },

      resetForm: () => {
        set({ hasChanges: false, isDirty: false, error: null });
      },

      // Computed getters
      getFormattedBusinessHours: () => {
        const { businessHours } = get();
        if (!businessHours) return 'Business hours not set';
        
        const formatDay = (day: string, hours: BusinessHours[keyof BusinessHours]) => {
          if (hours.closed) return `${day}: Closed`;
          return `${day}: ${hours.open} - ${hours.close}`;
        };
        
        const days = Object.entries(businessHours).map(([day, hours]) => 
          formatDay(day.charAt(0).toUpperCase() + day.slice(1), hours)
        );
        
        return days.join(', ');
      },

      getBusinessContactInfo: () => {
        const { businessInfo } = get();
        return {
          email: (businessInfo as any)?.email || '',
          phone: businessInfo?.phoneNumber || '',
          address: (businessInfo as any)?.address || ''
        };
      },

      isFormValid: () => {
        const { businessInfo, businessHours } = get();
        if (!businessInfo || !businessHours) return false;
        
        // Use Zod validation instead of built-in validation
        const formData = {
          phoneNumber: businessInfo.phoneNumber,
          socialMedia: businessInfo.socialMedia,
          businessHours: businessHours
        };
        
        const result = businessFormSchema.safeParse(formData);
        return result.success;
      }
    })),
    {
      name: 'settings-store',
      partialize: (state: SettingsState) => ({
        businessInfo: state.businessInfo,
        businessHours: state.businessHours,
        hasChanges: state.hasChanges,
        isDirty: state.isDirty,
        lastSaved: state.lastSaved
      })
    }
  )
);
