import { z } from 'zod';

export const paymentValidationSchema = z.object({
  paymentMethod: z
    .enum(['mpesa'])
    .refine((val) => val !== undefined, 'Payment method is required'),
  
  mpesaPhoneNumber: z
    .string()
    .min(1, 'M-Pesa phone number is required')
    .regex(/^(\+254|0)?[17]\d{8}$/, 'Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)'),
  
  agreeToTerms: z
    .boolean()
    .optional()
    .default(true),
  
  subscribeToNewsletter: z
    .boolean()
    .optional()
    .default(false),
});

export type PaymentFormData = z.infer<typeof paymentValidationSchema>;
