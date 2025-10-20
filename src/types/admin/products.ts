// Admin products management types

export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: ProductCategory;
  subcategory: string;
  basePrice: number;
  imageUrl: string;
  images: string[];
  availableSizes: ProductSize[];
  creamOptions: ProductCreamOption[];
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  stockQuantity?: number;
  lowStockThreshold?: number;
  tags: string[];
  allergens: string[];
  nutritionInfo?: ProductNutritionInfo;
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 
  | 'cakes'
  | 'cupcakes'
  | 'cookies'
  | 'pastries'
  | 'breads'
  | 'desserts'
  | 'seasonal'
  | 'custom';

export interface ProductSize {
  id: string;
  size: string;
  price: number;
  servings: number;
  weight: number; // in grams
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  isAvailable: boolean;
}

export interface ProductCreamOption {
  id: string;
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
  allergens?: string[];
}

export interface ProductNutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  fiber: number;
  sodium: number;
  servingSize: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  longDescription: string;
  category: ProductCategory;
  subcategory: string;
  basePrice: number;
  imageUrl: string;
  images: string[];
  availableSizes: Omit<ProductSize, 'id'>[];
  creamOptions: Omit<ProductCreamOption, 'id'>[];
  isActive: boolean;
  isFeatured: boolean;
  stockQuantity?: number;
  lowStockThreshold?: number;
  tags: string[];
  allergens: string[];
  nutritionInfo?: ProductNutritionInfo;
}

export interface ProductFilters {
  category?: ProductCategory;
  subcategory?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  isActive?: boolean;
  isFeatured?: boolean;
  stockStatus?: 'in-stock' | 'low-stock' | 'out-of-stock';
  tags?: string[];
  search?: string;
}

export interface ProductActions {
  createProduct: (data: ProductFormData) => Promise<void>;
  updateProduct: (id: string, data: Partial<ProductFormData>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  duplicateProduct: (id: string) => Promise<void>;
  toggleActive: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  updateStock: (id: string, quantity: number) => Promise<void>;
  updateImages: (id: string, images: string[]) => Promise<void>;
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  featuredProducts: number;
  productsByCategory: Record<ProductCategory, number>;
  lowStockProducts: number;
  outOfStockProducts: number;
  averagePrice: number;
  totalValue: number;
}
