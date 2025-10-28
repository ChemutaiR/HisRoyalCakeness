/**
 * Centralized Reference Service for Single Source of Truth
 * 
 * This service provides a single point of access to all reference data
 * across the application, ensuring consistency and eliminating duplication.
 * 
 * @author His Royal Cakeness
 * @version 1.0.0
 */

import { adminProductsData } from '../products';
import { mockDecorations, mockDecorationCategories } from '../../shop/decorations';
import { mockDeliveryZones } from '../../shop/deliveryZones';
import { AdminProduct } from '@/store/slices/admin/products';
import { Decoration, DecorationCategory } from '@/types/shop/catalog/decorations';
import { DeliveryZone } from '@/types/shop/delivery';

/**
 * Interface for resolved order item data
 */
export interface ResolvedOrderItem {
  cake: AdminProduct;
  size: {
    weight: string;
    amount: number;
    servings: number;
  };
  cream: {
    name: string;
    price: number;
  };
  decorations: Decoration[];
  containerType: {
    name: string;
    value: string;
  };
}

/**
 * Interface for resolved delivery information
 */
export interface ResolvedDeliveryInfo {
  zone: DeliveryZone;
  address: string;
  date: string;
  time: string;
  specialInstructions?: string;
}

/**
 * Centralized Reference Service
 * 
 * Provides methods to resolve ID references to full data objects
 * from the single source of truth mock databases.
 */
export class ReferenceService {
  private static instance: ReferenceService;
  private cache = new Map<string, any>();

  /**
   * Singleton pattern to ensure single instance
   */
  static getInstance(): ReferenceService {
    if (!ReferenceService.instance) {
      ReferenceService.instance = new ReferenceService();
    }
    return ReferenceService.instance;
  }

  /**
   * Clear cache (useful for testing or when data changes)
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cake product by ID
   */
  getCakeById(cakeId: string): AdminProduct | undefined {
    const cacheKey = `cake_${cakeId}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const cake = adminProductsData.find(cake => cake.id === cakeId);
    if (cake) {
      this.cache.set(cacheKey, cake);
    }
    
    return cake;
  }

  /**
   * Get cake size details by cake ID and size weight
   */
  getCakeSize(cakeId: string, sizeWeight: string): { weight: string; amount: number; servings: number } | undefined {
    const cacheKey = `cake_size_${cakeId}_${sizeWeight}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const cake = this.getCakeById(cakeId);
    if (!cake) return undefined;

    const size = cake.prices.find(price => price.weight === sizeWeight);
    if (size) {
      this.cache.set(cacheKey, size);
    }
    
    return size;
  }

  /**
   * Get cream option by cake ID and cream index
   */
  getCreamOption(cakeId: string, creamIndex: number): { name: string; price: number } | undefined {
    const cacheKey = `cream_${cakeId}_${creamIndex}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const cake = this.getCakeById(cakeId);
    if (!cake || !cake.whippingCreamOptions[creamIndex]) return undefined;

    const creamOption = cake.whippingCreamOptions[creamIndex];
    const price = this.extractCreamPrice(creamOption);
    const result = { name: creamOption, price };
    
    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get decoration by ID
   */
  getDecorationById(decorationId: number): Decoration | undefined {
    const cacheKey = `decoration_${decorationId}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const decoration = mockDecorations.find(dec => dec.id === decorationId);
    if (decoration) {
      this.cache.set(cacheKey, decoration);
    }
    
    return decoration;
  }

  /**
   * Get multiple decorations by IDs
   */
  getDecorationsByIds(decorationIds: number[]): Decoration[] {
    return decorationIds
      .map(id => this.getDecorationById(id))
      .filter((dec): dec is Decoration => dec !== undefined);
  }

  /**
   * Get decoration category by ID
   */
  getDecorationCategoryById(categoryId: string): DecorationCategory | undefined {
    const cacheKey = `decoration_category_${categoryId}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const category = mockDecorationCategories.find(cat => cat.id === categoryId);
    if (category) {
      this.cache.set(cacheKey, category);
    }
    
    return category;
  }

  /**
   * Get delivery zone by ID
   */
  getDeliveryZoneById(zoneId: string): DeliveryZone | undefined {
    const cacheKey = `delivery_zone_${zoneId}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const zone = mockDeliveryZones.find(zone => zone.id === zoneId);
    if (zone) {
      this.cache.set(cacheKey, zone);
    }
    
    return zone;
  }

  /**
   * Get container type by name
   */
  getContainerType(containerTypeName: string): { name: string; value: string } | undefined {
    const cacheKey = `container_${containerTypeName}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Map container type names to values
    const containerTypes: Record<string, { name: string; value: string }> = {
      'Round Tin': { name: 'Round Tin', value: 'round' },
      'Square Tin': { name: 'Square Tin', value: 'square' },
      'Heart Tin': { name: 'Heart Tin', value: 'heart' },
      'Standard Box': { name: 'Standard Box', value: 'standard' },
      'Premium Box': { name: 'Premium Box', value: 'premium' },
    };

    const result = containerTypes[containerTypeName];
    if (result) {
      this.cache.set(cacheKey, result);
    }
    
    return result;
  }

  /**
   * Resolve complete order item data from IDs
   */
  resolveOrderItem(data: {
    cakeId: string;
    sizeWeight: string;
    creamIndex: number;
    decorationIds: number[];
    containerTypeName: string;
  }): ResolvedOrderItem | undefined {
    const cake = this.getCakeById(data.cakeId);
    if (!cake) return undefined;

    const size = this.getCakeSize(data.cakeId, data.sizeWeight);
    if (!size) return undefined;

    const cream = this.getCreamOption(data.cakeId, data.creamIndex);
    if (!cream) return undefined;

    const decorations = this.getDecorationsByIds(data.decorationIds);
    const containerType = this.getContainerType(data.containerTypeName);
    if (!containerType) return undefined;

    return {
      cake,
      size,
      cream,
      decorations,
      containerType,
    };
  }

  /**
   * Resolve delivery information from zone ID
   */
  resolveDeliveryInfo(data: {
    zoneId: string;
    address: string;
    date: string;
    time: string;
    specialInstructions?: string;
  }): ResolvedDeliveryInfo | undefined {
    const zone = this.getDeliveryZoneById(data.zoneId);
    if (!zone) return undefined;

    return {
      zone,
      address: data.address,
      date: data.date,
      time: data.time,
      specialInstructions: data.specialInstructions,
    };
  }

  /**
   * Extract price from cream option string (e.g., "Chocolate Cream (+200)" -> 200)
   */
  private extractCreamPrice(creamOption: string): number {
    const match = creamOption.match(/\([+](\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * Get all available cakes
   */
  getAllCakes(): AdminProduct[] {
    return [...adminProductsData];
  }

  /**
   * Get all available decorations
   */
  getAllDecorations(): Decoration[] {
    return [...mockDecorations];
  }

  /**
   * Get all available delivery zones
   */
  getAllDeliveryZones(): DeliveryZone[] {
    return [...mockDeliveryZones];
  }

  /**
   * Get all decoration categories
   */
  getAllDecorationCategories(): DecorationCategory[] {
    return [...mockDecorationCategories];
  }
}

// Export singleton instance
export const referenceService = ReferenceService.getInstance();
