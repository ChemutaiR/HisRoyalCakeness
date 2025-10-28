import { BusinessInfo, BusinessHours } from '@/types/admin/settings';

export const mockBusinessSettings: BusinessInfo & { businessHours: BusinessHours } = {
  phoneNumber: '+254 700 123 456',
  socialMedia: '@hisroyalcakeness',
  businessHours: {
    monday: { open: '08:00', close: '18:00', closed: false },
    tuesday: { open: '08:00', close: '18:00', closed: false },
    wednesday: { open: '08:00', close: '18:00', closed: false },
    thursday: { open: '08:00', close: '18:00', closed: false },
    friday: { open: '08:00', close: '20:00', closed: false },
    saturday: { open: '09:00', close: '20:00', closed: false },
    sunday: { open: '10:00', close: '16:00', closed: false }
  }
};

export const mockBusinessSettingsHistory = [
  {
    id: '1',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    changes: {
      phoneNumber: { from: '+254 700 000 000', to: '+254 700 123 456' }
    },
    user: 'admin@hisroyalcakeness.com'
  },
  {
    id: '2',
    timestamp: new Date('2024-01-10T14:20:00Z'),
    changes: {
      businessHours: {
        friday: { from: { open: '08:00', close: '18:00', closed: false }, to: { open: '08:00', close: '20:00', closed: false } }
      }
    },
    user: 'admin@hisroyalcakeness.com'
  }
];

// Simulate API delay
export const simulateApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const fetchBusinessSettings = async (): Promise<BusinessInfo & { businessHours: BusinessHours }> => {
  await simulateApiDelay();
  return { ...mockBusinessSettings };
};

export const updateBusinessSettings = async (data: Partial<BusinessInfo & { businessHours: BusinessHours }>): Promise<BusinessInfo & { businessHours: BusinessHours }> => {
  await simulateApiDelay();
  
  // Simulate occasional API errors
  if (Math.random() < 0.1) {
    throw new Error('Network error: Failed to update settings');
  }
  
  // Update mock data
  Object.assign(mockBusinessSettings, data);
  
  // Add to history - create proper change tracking
  const changes: any = {};
  if (data.phoneNumber) changes.phoneNumber = { from: mockBusinessSettings.phoneNumber, to: data.phoneNumber };
  if (data.socialMedia) changes.socialMedia = { from: mockBusinessSettings.socialMedia, to: data.socialMedia };
  if (data.businessHours) changes.businessHours = { from: mockBusinessSettings.businessHours, to: data.businessHours };
  
  mockBusinessSettingsHistory.unshift({
    id: Date.now().toString(),
    timestamp: new Date(),
    changes,
    user: 'admin@hisroyalcakeness.com'
  });
  
  return { ...mockBusinessSettings };
};

export const resetBusinessSettings = async (): Promise<BusinessInfo & { businessHours: BusinessHours }> => {
  await simulateApiDelay();
  
  // Reset to default values
  Object.assign(mockBusinessSettings, {
    phoneNumber: '+254 700 123 456',
    socialMedia: '@hisroyalcakeness',
    businessHours: {
      monday: { open: '08:00', close: '18:00', closed: false },
      tuesday: { open: '08:00', close: '18:00', closed: false },
      wednesday: { open: '08:00', close: '18:00', closed: false },
      thursday: { open: '08:00', close: '18:00', closed: false },
      friday: { open: '08:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '20:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: false }
    }
  });
  
  return { ...mockBusinessSettings };
};
