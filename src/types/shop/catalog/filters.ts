// Catalog filtering and search types

import { SortOrder } from '../../shared/common';
import { SearchParams as BaseSearchParams } from '../../shared/api';

export interface CatalogFilters {
  search?: string;
  category?: string;
  subcategory?: string;
  size?: string;
  priceRange?: [number, number];
  rating?: number;
  availability?: 'in-stock' | 'out-of-stock' | 'all';
  sortBy?: 'name' | 'price' | 'rating' | 'popularity' | 'newest';
  sortOrder?: SortOrder;
}

export interface CatalogSearchParams extends BaseSearchParams {
  filters?: Record<string, any>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
  isActive: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  productCount: number;
  isActive: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface SortOption {
  value: string;
  label: string;
  field: string;
  order: SortOrder;
}
