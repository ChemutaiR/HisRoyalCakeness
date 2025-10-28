import { BusinessInfo, BusinessHours } from '@/types/admin/settings';

// Time formatting utilities
export const formatTime12Hour = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const formatTime24Hour = (time: string): string => {
  return time;
};

export const formatBusinessHours = (hours: BusinessHours, format: '12h' | '24h' = '12h'): string => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  
  const formatDay = (day: string, dayHours: BusinessHours[keyof BusinessHours]) => {
    if (dayHours.closed) {
      return `${day}: Closed`;
    }
    
    const openTime = format === '12h' ? formatTime12Hour(dayHours.open) : formatTime24Hour(dayHours.open);
    const closeTime = format === '12h' ? formatTime12Hour(dayHours.close) : formatTime24Hour(dayHours.close);
    
    return `${day}: ${openTime} - ${closeTime}`;
  };
  
  return dayKeys.map((dayKey, index) => 
    formatDay(days[index], hours[dayKey])
  ).join(', ');
};

// Phone number formatting
export const formatPhoneNumber = (phone: string, countryCode: string = '+254'): string => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Add country code if not present
  if (!phone.startsWith('+')) {
    return `${countryCode} ${digitsOnly}`;
  }
  
  return phone;
};

export const formatPhoneNumberDisplay = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }
  
  if (digitsOnly.length === 11) {
    return `+${digitsOnly.slice(0, 1)} (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`;
  }
  
  return phone;
};

// Email formatting
export const formatEmailDisplay = (email: string): string => {
  return email.toLowerCase().trim();
};


// Social media formatting
export const formatSocialMediaHandle = (handle: string): string => {
  // Ensure handle starts with @
  if (!handle.startsWith('@')) {
    return `@${handle}`;
  }
  return handle;
};

export const formatSocialMediaUrl = (handle: string, platform: 'instagram' | 'facebook' | 'twitter' = 'instagram'): string => {
  const cleanHandle = handle.replace('@', '');
  
  switch (platform) {
    case 'instagram':
      return `https://instagram.com/${cleanHandle}`;
    case 'facebook':
      return `https://facebook.com/${cleanHandle}`;
    case 'twitter':
      return `https://twitter.com/${cleanHandle}`;
    default:
      return `https://instagram.com/${cleanHandle}`;
  }
};

// Business info formatting
export const formatBusinessInfo = (info: BusinessInfo): BusinessInfo => {
  return {
    phoneNumber: formatPhoneNumber(info.phoneNumber),
    socialMedia: formatSocialMediaHandle(info.socialMedia)
  };
};

// Business hours formatting for data transformation
export const formatBusinessHoursData = (hours: BusinessHours): BusinessHours => {
  const formattedHours = { ...hours };
  
  Object.keys(formattedHours).forEach(day => {
    const dayKey = day as keyof BusinessHours;
    const dayHours = formattedHours[dayKey];
    
    if (!dayHours.closed) {
      formattedHours[dayKey] = {
        ...dayHours,
        open: formatTime24Hour(dayHours.open),
        close: formatTime24Hour(dayHours.close)
      };
    }
  });
  
  return formattedHours;
};

// Footer-specific formatting - Professional grouped format
export const formatFooterBusinessHours = (hours: BusinessHours): string => {
  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  
  // Group days with same hours
  const hourGroups: { [key: string]: string[] } = {};
  
  dayKeys.forEach((dayKey, index) => {
    const dayHours = hours[dayKey];
    const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
    
    if (dayHours.closed) {
      const key = 'closed';
      if (!hourGroups[key]) hourGroups[key] = [];
      hourGroups[key].push(dayName);
    } else {
      const openTime = formatTime12Hour(dayHours.open);
      const closeTime = formatTime12Hour(dayHours.close);
      const timeKey = `${openTime}-${closeTime}`;
      
      if (!hourGroups[timeKey]) hourGroups[timeKey] = [];
      hourGroups[timeKey].push(dayName);
    }
  });
  
  // Format grouped hours
  const formattedGroups: string[] = [];
  
  Object.entries(hourGroups).forEach(([timeKey, days]) => {
    if (timeKey === 'closed') {
      formattedGroups.push(`${days.join(', ')}: Closed`);
    } else {
      const dayRange = days.length > 1 ? `${days[0]}-${days[days.length - 1]}` : days[0];
      formattedGroups.push(`${dayRange}: ${timeKey}`);
    }
  });
  
  return formattedGroups.join(', ');
};

// Admin dashboard formatting
export const formatSettingsStatus = (status: 'complete' | 'pending' | 'error' | 'incomplete'): string => {
  switch (status) {
    case 'complete':
      return '✅ Settings up to date';
    case 'pending':
      return '⏳ Unsaved changes';
    case 'error':
      return '❌ Error loading settings';
    case 'incomplete':
      return '⚠️ Settings not loaded';
    default:
      return '❓ Unknown status';
  }
};

// Form field formatting
export const formatFormField = (field: keyof BusinessInfo, value: string): string => {
  switch (field) {
    case 'phoneNumber':
      return formatPhoneNumber(value);
    case 'socialMedia':
      return formatSocialMediaHandle(value);
    default:
      return value;
  }
};

// Time utilities
export const getTimeOptions = (startHour: number = 0, endHour: number = 23, interval: number = 30): string[] => {
  const options: string[] = [];
  
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options.push(timeString);
    }
  }
  
  return options;
};

export const getBusinessDayOptions = (): Array<{ value: keyof BusinessHours; label: string }> => {
  return [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];
};
