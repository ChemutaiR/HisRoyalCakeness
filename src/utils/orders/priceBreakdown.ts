/**
 * Order Price Breakdown Utilities
 * 
 * Functions to calculate and format detailed price breakdowns for order items
 */

export interface ItemPriceBreakdown {
  basePrice: number;
  creamPrice: number;
  decorationsPrice: number;
  unitSubtotal: number;
  quantity: number;
  itemTotal: number;
  breakdown: {
    basePrice: number;
    cream?: { name: string; price: number };
    decorations: Array<{ name: string; price: number }>;
  };
}

/**
 * Calculate detailed price breakdown for an order item
 */
export function calculateItemPriceBreakdown(item: any): ItemPriceBreakdown {
  // Extract prices from different possible structures
  const basePrice = 
    item.customization?.selectedSize?.price || 
    item.size?.amount || 
    0;
  
  const creamPrice = 
    item.customization?.selectedCream?.price || 
    item.cream?.price || 
    0;
  
  const creamName = 
    item.customization?.selectedCream?.name || 
    item.cream?.name || 
    null;
  
  const decorations = 
    item.customization?.selectedDecorations || 
    item.decorations || 
    [];
  
  const decorationsPrice = decorations.reduce(
    (sum: number, dec: any) => sum + (dec.price || 0), 
    0
  );
  
  const unitSubtotal = basePrice + creamPrice + decorationsPrice;
  const quantity = item.quantity || 1;
  // Always calculate itemTotal from unitSubtotal * quantity to ensure correct multiplication
  const itemTotal = unitSubtotal * quantity;
  
  return {
    basePrice,
    creamPrice,
    decorationsPrice,
    unitSubtotal,
    quantity,
    itemTotal,
    breakdown: {
      basePrice,
      cream: creamName && creamPrice > 0 ? { name: creamName, price: creamPrice } : undefined,
      decorations: decorations
        .filter((dec: any) => dec.price > 0)
        .map((dec: any) => ({
          name: dec.name || dec.id || 'Decoration',
          price: dec.price || 0,
        })),
    },
  };
}

/**
 * Calculate totals for all items
 */
export function calculateOrderTotals(items: any[], customLoafItems: any[] = []) {
  const itemsSubtotal = items.reduce((sum, item) => {
    const breakdown = calculateItemPriceBreakdown(item);
    return sum + breakdown.itemTotal;
  }, 0);
  
  const customLoafSubtotal = customLoafItems.reduce(
    (sum, item) => sum + (item.totalPrice || 0), 
    0
  );
  
  const subtotal = itemsSubtotal + customLoafSubtotal;
  
  const itemsCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const customLoafCount = customLoafItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
  return {
    itemsSubtotal,
    customLoafSubtotal,
    subtotal,
    itemsCount,
    customLoafCount,
  };
}

