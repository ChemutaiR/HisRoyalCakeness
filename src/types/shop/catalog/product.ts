// Product and catalog-related type definitions

export interface Size {
  size: string;
  price: number;
  servings: number;
}

export interface CreamOption {
  name: string;
  price: number;
  available: boolean;
}

export interface ContainerType {
  name: string;
  value: string;
}

export interface CakePrice {
  weight: string;
  amount: number;
  servings: number;
}

export interface CakeCream {
  name: string;
  extraCost: number;
}

export interface Cake {
  id: number;
  name: string;
  description: string;
  image: string;
  prices: CakePrice[];
  featured: boolean;
  creams?: CakeCream[];
  defaultCreamIndex?: number;
}

export interface CakeFlavor {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface WhippingCream {
  id: number;
  name: string;
  price: number;
}

export interface Topping {
  id: number;
  name: string;
  type: 'fruit' | 'jam';
  price: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  size: string;
  category: string;
  subcategory: string;
  availableSizes?: Size[];
  basePrice?: number;
  rating?: number;
  reviews?: number;
}

export interface CakeSelection {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  flavor: CakeFlavor;
  whippingCream: WhippingCream | null;
  topping: Topping | null;
}

export interface CustomizationOptions {
  selectedSize: Size | null;
  selectedCream: CreamOption | null;
  selectedContainerType: ContainerType | null;
  customNotes: string;
  uploadedImages: string[];
}
