// Payment processing service for M-Pesa payments

import { PaymentProcessingRequest, PaymentProcessingResponse } from '@/types/admin/orders';

class PaymentService {
  private static instance: PaymentService;

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  /**
   * Process M-Pesa payment
   * Simulates M-Pesa payment processing with realistic delays and validation
   */
  async processMpesaPayment(request: PaymentProcessingRequest): Promise<PaymentProcessingResponse> {
    try {
      // Validate phone number format
      if (!this.isValidKenyanPhoneNumber(request.phoneNumber)) {
        return {
          success: false,
          error: 'Invalid phone number format. Please use a valid Kenyan phone number.',
        };
      }

      // Validate amount
      if (request.amount <= 0) {
        return {
          success: false,
          error: 'Invalid payment amount.',
        };
      }

      // Simulate payment processing delay (2-5 seconds)
      const processingTime = Math.random() * 3000 + 2000;
      await new Promise(resolve => setTimeout(resolve, processingTime));

      // Simulate payment success/failure (90% success rate for demo)
      const isSuccessful = Math.random() > 0.1;

      if (!isSuccessful) {
        return {
          success: false,
          error: 'Payment failed. Please check your M-Pesa balance and try again.',
        };
      }

      // Generate transaction ID
      const transactionId = this.generateTransactionId();

      return {
        success: true,
        transactionId,
        message: `Payment of KES ${request.amount.toLocaleString()} processed successfully.`,
      };

    } catch (error) {
      // console.error('Payment processing error:', error);
      return {
        success: false,
        error: 'Payment processing failed. Please try again.',
      };
    }
  }

  /**
   * Validate Kenyan phone number format
   */
  private isValidKenyanPhoneNumber(phoneNumber: string): boolean {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if it's a valid Kenyan mobile number
    // Format: 07XXXXXXXX or 2547XXXXXXXX
    const kenyanMobileRegex = /^(07|2547)\d{8}$/;
    return kenyanMobileRegex.test(cleaned);
  }

  /**
   * Generate a realistic M-Pesa transaction ID
   */
  private generateTransactionId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `MP${timestamp.slice(-8)}${random}`;
  }

  /**
   * Verify payment status (for future use)
   */
  async verifyPayment(transactionId: string): Promise<boolean> {
    // Simulate payment verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true; // For demo purposes, always return true
  }
}

export const paymentService = PaymentService.getInstance();
