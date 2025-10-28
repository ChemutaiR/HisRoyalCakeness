import { z } from 'zod';

export const deliveryValidationSchema = z.object({
  deliveryZone: z
    .string()
    .min(1, 'Please select a delivery zone'),
  
  deliveryAddress: z.object({
    street: z
      .string()
      .min(1, 'Street address is required')
      .min(5, 'Street address must be at least 5 characters')
      .max(100, 'Street address must be less than 100 characters'),
    
    directions: z
      .string()
      .max(500, 'Directions must be less than 500 characters')
      .optional(),
    
    country: z.string().optional().default('Kenya'),
  }),
  
  deliveryDate: z
    .string()
    .min(1, 'Delivery date is required'),
  
  deliveryTime: z
    .string()
    .min(1, 'Delivery time is required')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format'),
  
  specialInstructions: z
    .string()
    .max(500, 'Special instructions must be less than 500 characters')
    .optional(),
}).refine((data) => {
  // Delivery date must be tomorrow or later (at least 24 hours notice)
  if (!data.deliveryDate || data.deliveryDate.trim() === '') {
    return false;
  }
  const selectedDate = new Date(data.deliveryDate);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  return selectedDate >= tomorrow;
}, {
  message: 'Delivery date must be tomorrow or later (24 hours notice required)',
  path: ['deliveryDate']
});

export type DeliveryFormData = z.infer<typeof deliveryValidationSchema>;
