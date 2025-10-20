import { type Cake } from '@/types/shop/catalog';
import { type Size, type CreamOption, type ContainerType } from '@/types/shop/catalog';

export interface CustomizationState {
  selectedSize: Size | null;
  selectedCream: CreamOption | null;
  selectedContainerType: ContainerType | null;
  customNotes: string;
  uploadedImages: string[];
}

// Business logic functions
export class CakeDetailsService {
  /**
   * Get available sizes for a cake (from centralized catalog state)
   */
  static getAvailableSizes(cake: Cake): Size[] {
    // Pulls size, pricing, and servings from catalog mock database
    return cake.prices.map(price => ({
      size: price.weight,
      price: price.amount,
      servings: price.servings
    }));
  }

  /**
   * Get available cream options from cake data (centralized state)
   */
  static getAvailableCreamOptions(cake: Cake): CreamOption[] {
    if (!cake.creams) return [];
    
    return cake.creams.map(cream => ({
      name: cream.name,
      price: cream.extraCost,
      available: true
    }));
  }

  /**
   * Get available container types (hardcoded - not from catalog)
   */
  static getAvailableContainerTypes(): ContainerType[] {
    return [
      { name: 'Standard Box', value: 'standard' },
      { name: 'Premium Box', value: 'premium' },
      { name: 'Gift Box', value: 'gift' },
      { name: 'Luxury Box', value: 'luxury' }
    ];
  }

  /**
   * Calculate total price for customization
   */
  static calculateTotalPrice(
    cake: Cake,
    customization: CustomizationState
  ): number {
    let totalPrice = 0;

    // Base cake price
    if (customization.selectedSize) {
      totalPrice += customization.selectedSize.price;
    }

    // Cream option price
    if (customization.selectedCream) {
      totalPrice += customization.selectedCream.price;
    }

    // Container type price (no price in existing type)
    // if (customization.selectedContainerType) {
    //   totalPrice += customization.selectedContainerType.price;
    // }

    return totalPrice;
  }

  /**
   * Validate customization completeness
   */
  static validateCustomization(customization: CustomizationState): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!customization.selectedSize) {
      errors.push('Please select a cake size');
    }

    if (!customization.selectedCream) {
      errors.push('Please select a cream option');
    }

    if (!customization.selectedContainerType) {
      errors.push('Please select a container type');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get price breakdown for display
   */
  static getPriceBreakdown(
    cake: Cake,
    customization: CustomizationState
  ): {
    basePrice: number;
    creamPrice: number;
    containerPrice: number;
    total: number;
  } {
    const basePrice = customization.selectedSize?.price || 0;
    const creamPrice = customization.selectedCream?.price || 0;
    const containerPrice = 0; // No price in existing ContainerType
    const total = basePrice + creamPrice + containerPrice;

    return {
      basePrice,
      creamPrice,
      containerPrice,
      total
    };
  }

  /**
   * Process uploaded images
   */
  static processUploadedImages(images: string[]): {
    processedImages: string[];
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const processedImages: string[] = [];

    // Validate image count
    if (images.length > 5) {
      errors.push('Maximum 5 images allowed');
    }

    // Validate image URLs (basic validation)
    images.forEach((image, index) => {
      if (!image || typeof image !== 'string') {
        errors.push(`Invalid image at position ${index + 1}`);
      } else {
        processedImages.push(image);
      }
    });

    return {
      processedImages,
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Prepare customization for cart
   */
  static prepareForCart(
    cake: Cake,
    customization: CustomizationState
  ): {
    cakeId: number;
    cakeName: string;
    size: string;
    cream: string;
    container: string;
    notes: string;
    images: string[];
    totalPrice: number;
  } {
    return {
      cakeId: cake.id,
      cakeName: cake.name,
      size: customization.selectedSize?.size || '',
      cream: customization.selectedCream?.name || '',
      container: customization.selectedContainerType?.name || '',
      notes: customization.customNotes,
      images: customization.uploadedImages,
      totalPrice: this.calculateTotalPrice(cake, customization)
    };
  }
}
