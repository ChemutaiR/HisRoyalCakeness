import { useState } from 'react';
import { paymentService } from '@/services/checkout/payment';
import { orderService } from '@/services/admin/orders';
import { buildCreateOrderRequest } from '@/utils/shop/checkout/orderFormatters';
import { DeliveryZone } from '@/types/shop/delivery';

interface UseOrderSubmissionParams {
  items: any[];
  customLoafItems: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  formData: any;
  selectedZone: DeliveryZone | null;
  addOrder: (o: any) => void;
  setCurrentOrder: (o: any) => void;
  updateFormData: (data: any) => void;
  clearCart: () => Promise<void> | void;
  onSuccessNext: () => void;
}

export function useOrderSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  async function handlePlaceOrder(params: UseOrderSubmissionParams) {
    const { items, customLoafItems, subtotal, deliveryFee, total, formData, selectedZone, addOrder, setCurrentOrder, updateFormData, clearCart, onSuccessNext } = params;

    setIsSubmitting(true);
    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      const upfrontAmount = Math.round((subtotal + (deliveryFee || 0)) * 0.5);
      const paymentResult = await paymentService.processMpesaPayment({
        phoneNumber: formData.mpesaPhoneNumber || '',
        amount: upfrontAmount,
        orderId: '',
      });

      if (!paymentResult.success) {
        setPaymentError(paymentResult.error || 'Payment failed. Please try again.');
        return;
      }

      const orderRequest = buildCreateOrderRequest({
        subtotal,
        deliveryFee,
        total,
        items,
        customLoafItems,
        formData,
        selectedZone,
        transactionId: paymentResult.transactionId!,
      });

      const createdOrder = await orderService.createOrder(orderRequest);
      await orderService.updatePaymentInfo(createdOrder.id, paymentResult.transactionId!, 'partial');

      addOrder(createdOrder);
      setCurrentOrder(createdOrder);
      updateFormData({ orderNumber: createdOrder.orderNumber, transactionId: paymentResult.transactionId! });

      await clearCart();
      onSuccessNext();
    } catch (error) {
      setPaymentError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsProcessingPayment(false);
    }
  }

  return { handlePlaceOrder, isSubmitting, isProcessingPayment, paymentError, setPaymentError };
}

export default useOrderSubmission;


