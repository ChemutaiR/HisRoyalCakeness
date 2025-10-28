import { useSettingsStore } from '@/store/slices/admin/settings';
// import { BusinessHours } from '@/types/admin/settings';
import { validatePhone, validateSocialMedia } from '@/lib/validation';

// Basic selectors
export const selectBusinessInfo = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessInfo;

export const selectBusinessHours = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessHours;

export const selectIsLoading = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.isLoading;

export const selectIsUpdating = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.isUpdating;

export const selectIsResetting = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.isResetting;

export const selectError = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.error;

export const selectLastError = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.lastError;

export const selectHasChanges = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.hasChanges;

export const selectIsDirty = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.isDirty;

export const selectLastSaved = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.lastSaved;

// Computed selectors
export const selectFormattedBusinessHours = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.getFormattedBusinessHours();

export const selectBusinessContactInfo = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.getBusinessContactInfo();

export const selectIsFormValid = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.isFormValid();

// Footer-specific selectors
export const selectFooterBusinessHours = (state: ReturnType<typeof useSettingsStore.getState>) => {
  const businessHours = state.businessHours;
  if (!businessHours) return null;
  
  // Return the raw business hours object for the formatter to process
  return JSON.stringify(businessHours);
};

// Admin dashboard selectors
export const selectSettingsStatus = (state: ReturnType<typeof useSettingsStore.getState>) => {
  const { businessInfo, businessHours, hasChanges, isDirty } = state;
  
  if (!businessInfo || !businessHours) {
    return { status: 'incomplete', message: 'Settings not loaded' };
  }
  
  if (hasChanges || isDirty) {
    return { status: 'pending', message: 'Unsaved changes' };
  }
  
  if (state.error) {
    return { status: 'error', message: state.error };
  }
  
  return { status: 'complete', message: 'Settings up to date' };
};

// Form field selectors

export const selectPhoneNumber = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessInfo?.phoneNumber || '';

export const selectSocialMedia = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessInfo?.socialMedia || '';

// Day-specific hour selectors
export const selectMondayHours = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessHours?.monday || { open: '08:00', close: '18:00', closed: false };

export const selectTuesdayHours = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessHours?.tuesday || { open: '08:00', close: '18:00', closed: false };

export const selectWednesdayHours = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessHours?.wednesday || { open: '08:00', close: '18:00', closed: false };

export const selectThursdayHours = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessHours?.thursday || { open: '08:00', close: '18:00', closed: false };

export const selectFridayHours = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessHours?.friday || { open: '08:00', close: '20:00', closed: false };

export const selectSaturdayHours = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessHours?.saturday || { open: '09:00', close: '20:00', closed: false };

export const selectSundayHours = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.businessHours?.sunday || { open: '10:00', close: '16:00', closed: false };


export const selectPhoneValidation = (state: ReturnType<typeof useSettingsStore.getState>) => {
  const phone = state.businessInfo?.phoneNumber || '';
  const result = validatePhone(phone);
  return {
    isValid: result.success,
    message: result.success ? '' : (result.error?.issues?.[0]?.message || 'Invalid phone number')
  };
};

export const selectSocialMediaValidation = (state: ReturnType<typeof useSettingsStore.getState>) => {
  const socialMedia = state.businessInfo?.socialMedia || '';
  const result = validateSocialMedia(socialMedia);
  return {
    isValid: result.success,
    message: result.success ? '' : (result.error?.issues?.[0]?.message || 'Invalid social media handle')
  };
};

// Loading state selectors
export const selectIsAnyLoading = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.isLoading || state.isUpdating || state.isResetting;

export const selectCanSave = (state: ReturnType<typeof useSettingsStore.getState>) => 
  !state.isUpdating && !state.isLoading && state.hasChanges && state.isFormValid();

export const selectCanReset = (state: ReturnType<typeof useSettingsStore.getState>) => 
  !state.isResetting && !state.isLoading;

// Error handling selectors
export const selectHasError = (state: ReturnType<typeof useSettingsStore.getState>) => 
  !!state.error;

export const selectErrorMessage = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.error || '';

export const selectErrorDetails = (state: ReturnType<typeof useSettingsStore.getState>) => 
  state.lastError;
