import { CreateOrderRequest } from '@/types/orders/order';

export function buildCreateOrderRequest(params: {
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: any[];
  customLoafItems: any[];
  formData: any;
  selectedZone: { id: string; name: string; deliveryFee: number } | null;
  transactionId: string;
}): CreateOrderRequest {
  const { subtotal, deliveryFee, total, items, customLoafItems, formData, selectedZone, transactionId } = params;

  return {
    customerInfo: {
      firstName: 'Customer',
      lastName: 'User',
      email: 'customer@example.com',
      phone: formData.mpesaPhoneNumber || '',
    },
    deliveryInfo: {
      zone: {
        id: formData.deliveryZone || '',
        name: selectedZone?.name || '',
        deliveryFee: deliveryFee || 0,
      },
      address: {
        street: formData.deliveryAddress?.street || '',
        directions: formData.deliveryAddress?.directions || '',
        country: formData.deliveryAddress?.country || 'Kenya',
      },
      date: formData.deliveryDate || '',
      time: formData.deliveryTime || '',
      specialInstructions: formData.specialInstructions || '',
    },
    paymentInfo: {
      method: 'mpesa',
      phoneNumber: formData.mpesaPhoneNumber || '',
      amountPaid: Math.round(subtotal * 0.5),
      amountRemaining: Math.round(subtotal * 0.5) + (deliveryFee || 0),
      status: 'partial',
      transactionId,
    },
    items: items.map(item => ({
      id: item.id,
      cakeId: item.cake.id,
      cakeName: item.cake.name,
      cakeImage: item.cake.image,
      quantity: item.quantity,
      unitPrice: item.cake.prices?.[0]?.amount || 0,
      totalPrice: item.totalPrice,
      customization: {
        selectedSize: item.customization.selectedSize ? {
          size: item.customization.selectedSize.size,
          price: item.customization.selectedSize.price,
          servings: item.customization.selectedSize.servings,
        } : undefined,
        selectedCream: item.customization.selectedCream ? {
          name: item.customization.selectedCream.name,
          price: item.customization.selectedCream.price,
          available: item.customization.selectedCream.available,
        } : undefined,
        selectedContainerType: item.customization.selectedContainerType ? {
          name: item.customization.selectedContainerType.name,
          value: item.customization.selectedContainerType.value,
        } : undefined,
        selectedDecorations: item.customization.selectedDecorations?.map((d: any) => ({
          id: d.id,
          name: d.name,
          price: d.price,
        })) || [],
        customNotes: item.customization.customNotes,
        uploadedImages: item.customization.uploadedImages,
      },
    })),
    customLoafItems: customLoafItems.map(item => ({
      id: item.id,
      cakeSelection: item.cakeSelection,
      customNotes: item.customNotes,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      addedAt: item.addedAt,
    })),
    subtotal,
    deliveryFee: deliveryFee || 0,
    total,
    notes: `Order placed via checkout. Payment transaction: ${transactionId}`,
  };
}


