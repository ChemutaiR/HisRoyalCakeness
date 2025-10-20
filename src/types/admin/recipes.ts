// Admin recipes management types

export interface AdminRecipe {
  id: string;
  name: string;
  description: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  nutritionInfo?: NutritionInfo;
  tags: string[];
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type RecipeCategory = 
  | 'cakes'
  | 'cupcakes'
  | 'cookies'
  | 'pastries'
  | 'breads'
  | 'desserts'
  | 'seasonal'
  | 'custom';

export type RecipeDifficulty = 
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: IngredientUnit;
  notes?: string;
  isOptional: boolean;
}

export type IngredientUnit = 
  | 'cups'
  | 'tbsp'
  | 'tsp'
  | 'grams'
  | 'kg'
  | 'ml'
  | 'liters'
  | 'pieces'
  | 'pinch'
  | 'dash';

export interface RecipeInstruction {
  id: string;
  stepNumber: number;
  instruction: string;
  duration?: number; // in minutes
  temperature?: number; // in celsius
  notes?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  sugar: number; // in grams
  fiber: number; // in grams
  sodium: number; // in mg
}

export interface RecipeFormData {
  name: string;
  description: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Omit<RecipeIngredient, 'id'>[];
  instructions: Omit<RecipeInstruction, 'id'>[];
  nutritionInfo?: NutritionInfo;
  tags: string[];
  imageUrl?: string;
}

export interface RecipeFilters {
  category?: RecipeCategory;
  difficulty?: RecipeDifficulty;
  prepTime?: {
    min: number;
    max: number;
  };
  tags?: string[];
  search?: string;
  isActive?: boolean;
}

export interface RecipeActions {
  createRecipe: (data: RecipeFormData) => Promise<void>;
  updateRecipe: (id: string, data: Partial<RecipeFormData>) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  duplicateRecipe: (id: string) => Promise<void>;
  toggleActive: (id: string) => Promise<void>;
  exportRecipe: (id: string) => Promise<void>;
}

export interface RecipeStats {
  totalRecipes: number;
  activeRecipes: number;
  recipesByCategory: Record<RecipeCategory, number>;
  recipesByDifficulty: Record<RecipeDifficulty, number>;
  averagePrepTime: number;
  averageCookTime: number;
}
