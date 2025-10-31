/**
 * Recipe Management Types
 */

export interface Ingredient {
  id: string;
  measurement: string;
  ingredient: string;
}

export interface Instruction {
  id: string;
  step: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  isActive: boolean;
}

export interface RecipeFormData {
  name: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
}
