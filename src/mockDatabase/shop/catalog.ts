// Shop catalog mock data - Cake products with pricing and images

import { type Cake } from '@/types/shop/catalog';

// Shop catalog data is now synced from admin products
// This file only contains type definitions and helper functions
export const cakeCatalog: Cake[] = [];

// Helper functions for catalog data
export const getCakeById = (id: number): Cake | undefined => {
  return cakeCatalog.find(cake => cake.id === id);
};


export const getFeaturedCakes = (): Cake[] => {
  return cakeCatalog.filter(cake => cake.featured);
};

export const getCakePrice = (cakeId: number, weight: string): number | undefined => {
  const cake = getCakeById(cakeId);
  const price = cake?.prices.find(p => p.weight === weight);
  return price?.amount;
};

export const getCakeServings = (cakeId: number, weight: string): number | undefined => {
  const cake = getCakeById(cakeId);
  const price = cake?.prices.find(p => p.weight === weight);
  return price?.servings;
};
