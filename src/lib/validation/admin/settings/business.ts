import { z } from 'zod';

// Business hours schema for individual days
export const dayHoursSchema = z.object({
  open: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format'),
  close: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format'),
  closed: z.boolean()
}).refine((data) => {
  if (data.closed) return true;
  
  const openMinutes = timeToMinutes(data.open);
  const closeMinutes = timeToMinutes(data.close);
  
  return openMinutes < closeMinutes;
}, {
  message: 'Close time must be after open time',
  path: ['close']
});

// Business hours schema for all days
export const businessHoursSchema = z.object({
  monday: dayHoursSchema,
  tuesday: dayHoursSchema,
  wednesday: dayHoursSchema,
  thursday: dayHoursSchema,
  friday: dayHoursSchema,
  saturday: dayHoursSchema,
  sunday: dayHoursSchema
}).refine((data) => {
  // At least one day must be open
  const hasOpenDay = Object.values(data).some(day => !day.closed);
  return hasOpenDay;
}, {
  message: 'At least one day must be open for business',
  path: ['monday'] // This will show the error on the first day
});

// Business info schema
export const businessInfoSchema = z.object({
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
    .refine((phone) => {
      const digitsOnly = phone.replace(/\D/g, '');
      return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    }, {
      message: 'Phone number must be between 10 and 15 digits'
    }),
  
  socialMedia: z.string()
    .min(1, 'Social media handle is required')
    .regex(/^@?[a-zA-Z0-9._]+$/, 'Please enter a valid social media handle')
    .max(30, 'Social media handle cannot exceed 30 characters')
});

// Complete business settings schema
export const businessSettingsSchema = z.object({
  businessInfo: businessInfoSchema,
  businessHours: businessHoursSchema
});

// Form data schema (for the combined form)
export const businessFormSchema = z.object({
  phoneNumber: businessInfoSchema.shape.phoneNumber,
  socialMedia: businessInfoSchema.shape.socialMedia,
  businessHours: businessHoursSchema
});

// Individual field schemas for real-time validation
export const phoneFieldSchema = businessInfoSchema.shape.phoneNumber;
export const socialMediaFieldSchema = businessInfoSchema.shape.socialMedia;

// Helper function to convert time to minutes
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Export types
export type BusinessInfo = z.infer<typeof businessInfoSchema>;
export type BusinessHours = z.infer<typeof businessHoursSchema>;
export type DayHours = z.infer<typeof dayHoursSchema>;
export type BusinessSettings = z.infer<typeof businessSettingsSchema>;
export type BusinessFormData = z.infer<typeof businessFormSchema>;

// Validation helper functions
export const validateBusinessInfo = (data: unknown) => {
  return businessInfoSchema.safeParse(data);
};

export const validateBusinessHours = (data: unknown) => {
  return businessHoursSchema.safeParse(data);
};

export const validateBusinessForm = (data: unknown) => {
  return businessFormSchema.safeParse(data);
};


export const validatePhone = (phone: string) => {
  return phoneFieldSchema.safeParse(phone);
};


export const validateSocialMedia = (socialMedia: string) => {
  return socialMediaFieldSchema.safeParse(socialMedia);
};

// Email validation
export const validateEmail = (email: string) => {
  const emailSchema = z.string().email('Please enter a valid email address');
  return emailSchema.safeParse(email);
};
