import { BusinessInfo, BusinessHours } from '@/types/admin/settings';

// Transform API response to UI format
export const apiToUiTransform = (apiData: any): BusinessInfo & { businessHours: BusinessHours } => {
  return {
    phoneNumber: apiData.phoneNumber || '',
    socialMedia: apiData.socialMedia || '',
    businessHours: {
      monday: apiData.businessHours?.monday || { open: '08:00', close: '18:00', closed: false },
      tuesday: apiData.businessHours?.tuesday || { open: '08:00', close: '18:00', closed: false },
      wednesday: apiData.businessHours?.wednesday || { open: '08:00', close: '18:00', closed: false },
      thursday: apiData.businessHours?.thursday || { open: '08:00', close: '18:00', closed: false },
      friday: apiData.businessHours?.friday || { open: '08:00', close: '20:00', closed: false },
      saturday: apiData.businessHours?.saturday || { open: '09:00', close: '20:00', closed: false },
      sunday: apiData.businessHours?.sunday || { open: '10:00', close: '16:00', closed: false }
    }
  };
};

// Transform UI format to API format
export const uiToApiTransform = (uiData: BusinessInfo & { businessHours: BusinessHours }): any => {
  return {
    phoneNumber: uiData.phoneNumber,
    socialMedia: uiData.socialMedia,
    businessHours: uiData.businessHours
  };
};

// Transform form data to store format
export const formToStoreTransform = (formData: any): BusinessInfo & { businessHours: BusinessHours } => {
  return {
    phoneNumber: formData.phoneNumber || '',
    socialMedia: formData.socialMedia || '',
    businessHours: formData.businessHours || {
      monday: { open: '08:00', close: '18:00', closed: false },
      tuesday: { open: '08:00', close: '18:00', closed: false },
      wednesday: { open: '08:00', close: '18:00', closed: false },
      thursday: { open: '08:00', close: '18:00', closed: false },
      friday: { open: '08:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '20:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: false }
    }
  };
};

// Transform store data to form format
export const storeToFormTransform = (storeData: BusinessInfo & { businessHours: BusinessHours }): any => {
  return {
    phoneNumber: storeData.phoneNumber,
    socialMedia: storeData.socialMedia,
    businessHours: storeData.businessHours
  };
};

// Transform business info for display
export const businessInfoToDisplay = (info: BusinessInfo): {
  phone: string;
  socialMedia: string;
} => {
  return {
    phone: info.phoneNumber,
    socialMedia: info.socialMedia
  };
};

// Transform business hours for display
export const businessHoursToDisplay = (hours: BusinessHours): Array<{
  day: string;
  open: string;
  close: string;
  closed: boolean;
}> => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  
  return dayKeys.map((dayKey, index) => ({
    day: days[index],
    open: hours[dayKey].open,
    close: hours[dayKey].close,
    closed: hours[dayKey].closed
  }));
};

// Transform for footer display
export const businessHoursToFooter = (hours: BusinessHours): string => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  
  const formatDay = (day: string, dayHours: BusinessHours[keyof BusinessHours]) => {
    if (dayHours.closed) {
      return `${day}: Closed`;
    }
    
    const openTime = formatTime12Hour(dayHours.open);
    const closeTime = formatTime12Hour(dayHours.close);
    
    return `${day}: ${openTime}-${closeTime}`;
  };
  
  return dayKeys.map((dayKey, index) => 
    formatDay(days[index], hours[dayKey])
  ).join(', ');
};

// Transform for admin dashboard
export const settingsToDashboard = (settings: BusinessInfo & { businessHours: BusinessHours }): {
  contactInfo: string;
  businessHours: string;
  socialMedia: string;
} => {
  return {
    contactInfo: settings.phoneNumber,
    businessHours: businessHoursToFooter(settings.businessHours),
    socialMedia: settings.socialMedia
  };
};

// Transform for export
export const settingsToExport = (settings: BusinessInfo & { businessHours: BusinessHours }): any => {
  return {
    businessInfo: {
      phone: settings.phoneNumber,
      socialMedia: settings.socialMedia
    },
    businessHours: businessHoursToDisplay(settings.businessHours),
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
};

// Transform for import
export const importToSettings = (importData: any): BusinessInfo & { businessHours: BusinessHours } => {
  return {
    phoneNumber: importData.businessInfo?.phone || '',
    socialMedia: importData.businessInfo?.socialMedia || '',
    businessHours: importData.businessHours || {
      monday: { open: '08:00', close: '18:00', closed: false },
      tuesday: { open: '08:00', close: '18:00', closed: false },
      wednesday: { open: '08:00', close: '18:00', closed: false },
      thursday: { open: '08:00', close: '18:00', closed: false },
      friday: { open: '08:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '20:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: false }
    }
  };
};

// Helper function for time formatting
const formatTime12Hour = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Transform for comparison
export const settingsToComparison = (current: BusinessInfo & { businessHours: BusinessHours }, previous: BusinessInfo & { businessHours: BusinessHours }): {
  changes: Array<{ field: string; from: any; to: any }>;
  hasChanges: boolean;
} => {
  const changes: Array<{ field: string; from: any; to: any }> = [];
  
  // Compare business info
  
  if (current.phoneNumber !== previous.phoneNumber) {
    changes.push({ field: 'phoneNumber', from: previous.phoneNumber, to: current.phoneNumber });
  }
  
  
  if (current.socialMedia !== previous.socialMedia) {
    changes.push({ field: 'socialMedia', from: previous.socialMedia, to: current.socialMedia });
  }
  
  // Compare business hours
  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  dayKeys.forEach(day => {
    const currentDay = current.businessHours[day];
    const previousDay = previous.businessHours[day];
    
    if (JSON.stringify(currentDay) !== JSON.stringify(previousDay)) {
      changes.push({ 
        field: `businessHours.${day}`, 
        from: previousDay, 
        to: currentDay 
      });
    }
  });
  
  return {
    changes,
    hasChanges: changes.length > 0
  };
};
