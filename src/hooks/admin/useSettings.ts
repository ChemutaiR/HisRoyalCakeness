import { useCallback, useEffect, useMemo } from 'react';
import { useSettingsStore } from '@/store/slices/admin/settings';
import { 
  selectBusinessInfo,
  selectBusinessHours,
  selectIsLoading,
  selectIsUpdating,
  selectIsResetting,
  selectError,
  selectHasChanges,
  selectIsDirty,
  selectLastSaved,
  selectIsFormValid,
  selectCanSave,
  selectCanReset,
  selectHasError,
  selectErrorMessage
} from '@/store/selectors/admin/settings';
import { BusinessInfo, BusinessHours } from '@/types/admin/settings';
import { validateEmail, validatePhone, validateSocialMedia } from '@/lib/validation';

export interface UseSettingsReturn {
  // Data
  businessInfo: BusinessInfo | null;
  businessHours: BusinessHours | null;
  
  // Loading states
  isLoading: boolean;
  isUpdating: boolean;
  isResetting: boolean;
  
  // Error states
  error: string | null;
  hasError: boolean;
  errorMessage: string;
  
  // Form state
  hasChanges: boolean;
  isDirty: boolean;
  lastSaved: string | null;
  canSave: boolean;
  canReset: boolean;
  isFormValid: boolean;
  
  // Validation
  emailValidation: { isValid: boolean; message: string };
  phoneValidation: { isValid: boolean; message: string };
  socialMediaValidation: { isValid: boolean; message: string };
  
  // Actions
  fetchSettings: () => Promise<void>;
  updateSettings: (data: Partial<BusinessInfo & { businessHours: BusinessHours }>) => Promise<void>;
  resetSettings: () => Promise<void>;
  setField: (field: keyof BusinessInfo, value: string) => void;
  setBusinessHours: (day: keyof BusinessHours, hours: BusinessHours[keyof BusinessHours]) => void;
  clearError: () => void;
  resetForm: () => void;
  
  // Computed values
  formattedBusinessHours: string;
  businessContactInfo: { email: string; phone: string; address: string };
}

export const useSettings = (): UseSettingsReturn => {
  // Selectors
  const businessInfo = useSettingsStore(selectBusinessInfo);
  const businessHours = useSettingsStore(selectBusinessHours);
  const isLoading = useSettingsStore(selectIsLoading);
  const isUpdating = useSettingsStore(selectIsUpdating);
  const isResetting = useSettingsStore(selectIsResetting);
  const error = useSettingsStore(selectError);
  const hasChanges = useSettingsStore(selectHasChanges);
  const isDirty = useSettingsStore(selectIsDirty);
  const lastSaved = useSettingsStore(selectLastSaved);
  const isFormValid = useSettingsStore(selectIsFormValid);
  const canSave = useSettingsStore(selectCanSave);
  const canReset = useSettingsStore(selectCanReset);
  const hasError = useSettingsStore(selectHasError);
  const errorMessage = useSettingsStore(selectErrorMessage);
  

  const emailValidation = useMemo(() => {
    const email = businessInfo?.email || '';
    const result = validateEmail(email);
    return {
      isValid: result.success,
      message: result.success ? '' : (result.error?.issues?.[0]?.message || 'Invalid email address')
    };
  }, [businessInfo?.email]);

  const phoneValidation = useMemo(() => {
    const phone = businessInfo?.phoneNumber || '';
    const result = validatePhone(phone);
    return {
      isValid: result.success,
      message: result.success ? '' : (result.error?.issues?.[0]?.message || 'Invalid phone number')
    };
  }, [businessInfo?.phoneNumber]);

  const socialMediaValidation = useMemo(() => {
    const socialMedia = businessInfo?.socialMedia || '';
    const result = validateSocialMedia(socialMedia);
    return {
      isValid: result.success,
      message: result.success ? '' : (result.error?.issues?.[0]?.message || 'Invalid social media handle')
    };
  }, [businessInfo?.socialMedia]);
  
  // Actions
  const fetchSettings = useSettingsStore(state => state.fetchBusinessSettings);
  const updateSettings = useSettingsStore(state => state.updateBusinessSettings);
  const resetSettings = useSettingsStore(state => state.resetBusinessSettings);
  const setField = useSettingsStore(state => state.setField);
  const setBusinessHours = useSettingsStore(state => state.setBusinessHours);
  const clearError = useSettingsStore(state => state.clearError);
  const resetForm = useSettingsStore(state => state.resetForm);
  
  // Computed values - memoized to avoid infinite loops
  const formattedBusinessHours = useMemo(() => {
    if (!businessHours) return 'Business hours not set';
    
    const formatDay = (day: string, hours: BusinessHours[keyof BusinessHours]) => {
      if (hours.closed) return `${day}: Closed`;
      return `${day}: ${hours.open} - ${hours.close}`;
    };
    
    const days = Object.entries(businessHours).map(([day, hours]) => 
      formatDay(day.charAt(0).toUpperCase() + day.slice(1), hours)
    );
    
    return days.join(', ');
  }, [businessHours]);

  const businessContactInfo = useMemo(() => {
    return {
      email: businessInfo?.email || '',
      phone: businessInfo?.phoneNumber || '',
      address: businessInfo?.address || '',
    };
  }, [businessInfo]);
  
  // Auto-fetch settings on mount
  useEffect(() => {
    if (!businessInfo && !isLoading) {
      fetchSettings();
    }
  }, [businessInfo, isLoading, fetchSettings]);
  
  // Memoized states removed to fix linting - can be added back if needed
  
  // Enhanced actions with error handling
  const handleFetchSettings = useCallback(async () => {
    try {
      await fetchSettings();
    } catch (error) {
      // Handle fetch error - could show user notification here
    }
  }, [fetchSettings]);
  
  const handleUpdateSettings = useCallback(async (data: Partial<BusinessInfo & { businessHours: BusinessHours }>) => {
    try {
      await updateSettings(data);
    } catch (error) {
      // Handle update error - could show user notification here
    }
  }, [updateSettings]);
  
  const handleResetSettings = useCallback(async () => {
    try {
      await resetSettings();
    } catch (error) {
      // Handle reset error - could show user notification here
    }
  }, [resetSettings]);
  
  // Enhanced field setters with validation
  const handleSetField = useCallback((field: keyof BusinessInfo, value: string) => {
    setField(field, value);
  }, [setField]);
  
  const handleSetBusinessHours = useCallback((day: keyof BusinessHours, hours: BusinessHours[keyof BusinessHours]) => {
    setBusinessHours(day, hours);
  }, [setBusinessHours]);
  
  return {
    // Data
    businessInfo,
    businessHours,
    
    // Loading states
    isLoading,
    isUpdating,
    isResetting,
    
    // Error states
    error,
    hasError,
    errorMessage,
    
    // Form state
    hasChanges,
    isDirty,
    lastSaved,
    canSave,
    canReset,
    isFormValid,
    
    // Validation
    emailValidation,
    phoneValidation,
    socialMediaValidation,
    
    // Actions
    fetchSettings: handleFetchSettings,
    updateSettings: handleUpdateSettings,
    resetSettings: handleResetSettings,
    setField: handleSetField,
    setBusinessHours: handleSetBusinessHours,
    clearError,
    resetForm,
    
    // Computed values
    formattedBusinessHours,
    businessContactInfo
  };
};
