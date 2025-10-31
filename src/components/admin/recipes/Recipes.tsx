"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Recipe } from '@/types/admin/recipes';
import RecipeList from './RecipeList';
import AddRecipeModal from './AddRecipeModal';
import { useRecipeForm } from '@/hooks/admin/recipes/useRecipeForm';

export default function Recipes() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 'rec1',
      name: 'Classic Vanilla Cake',
      category: 'Classic Cakes',
      prepTime: '20 min',
      cookTime: '30 min',
      servings: 8,
      ingredients: [
        { id: '1', measurement: '2 1/4 cups', ingredient: 'all-purpose flour' },
        { id: '2', measurement: '1 1/2 cups', ingredient: 'granulated sugar' },
        { id: '3', measurement: '3 1/2 tsp', ingredient: 'baking powder' },
        { id: '4', measurement: '1 tsp', ingredient: 'salt' },
        { id: '5', measurement: '1/2 cup', ingredient: 'unsalted butter, softened' },
        { id: '6', measurement: '3 large', ingredient: 'eggs, room temperature' },
        { id: '7', measurement: '1 1/4 cups', ingredient: 'whole milk' },
        { id: '8', measurement: '2 tsp', ingredient: 'vanilla extract' },
        { id: '9', measurement: '1/4 cup', ingredient: 'vegetable oil' },
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C) and grease a 9-inch round cake pan' },
        { id: '2', step: 'In a large bowl, cream together butter and sugar until light and fluffy' },
        { id: '3', step: 'Add eggs one at a time, beating well after each addition' },
        { id: '4', step: 'Mix in vanilla extract and vegetable oil' },
        { id: '5', step: 'In a separate bowl, whisk together flour, baking powder, and salt' },
        { id: '6', step: 'Gradually add dry ingredients to wet ingredients, alternating with milk' },
        { id: '7', step: 'Pour batter into prepared pan and bake for 25-30 minutes until a toothpick comes out clean' },
        { id: '8', step: 'Let cool in pan for 10 minutes, then transfer to wire rack' },
      ],
      isActive: true,
    },
    {
      id: 'rec2',
      name: 'Chocolate Fudge Cake',
      category: 'Chocolate Cakes',
      prepTime: '25 min',
      cookTime: '35 min',
      servings: 10,
      ingredients: [
        { id: '1', measurement: '2 cups', ingredient: 'all-purpose flour' },
        { id: '2', measurement: '2 cups', ingredient: 'granulated sugar' },
        { id: '3', measurement: '3/4 cup', ingredient: 'unsweetened cocoa powder' },
        { id: '4', measurement: '2 tsp', ingredient: 'baking soda' },
        { id: '5', measurement: '1 tsp', ingredient: 'baking powder' },
        { id: '6', measurement: '1 tsp', ingredient: 'salt' },
        { id: '7', measurement: '2 large', ingredient: 'eggs' },
        { id: '8', measurement: '1 cup', ingredient: 'milk' },
        { id: '9', measurement: '1 cup', ingredient: 'hot water' },
        { id: '10', measurement: '1/2 cup', ingredient: 'vegetable oil' },
        { id: '11', measurement: '2 tsp', ingredient: 'vanilla extract' },
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C)' },
        { id: '2', step: 'Sift together flour, sugar, cocoa, baking soda, baking powder, and salt' },
        { id: '3', step: 'Beat eggs, milk, oil, and vanilla in a separate bowl' },
        { id: '4', step: 'Gradually add dry ingredients to wet ingredients' },
        { id: '5', step: 'Stir in hot water (batter will be thin)' },
        { id: '6', step: 'Pour into greased pan and bake for 30-35 minutes' },
      ],
      isActive: true,
    },
    {
      id: 'rec3',
      name: 'Red Velvet Cake',
      category: 'Specialty Cakes',
      prepTime: '30 min',
      cookTime: '40 min',
      servings: 12,
      ingredients: [
        { id: '1', measurement: '2 1/2 cups', ingredient: 'all-purpose flour' },
        { id: '2', measurement: '1 1/2 cups', ingredient: 'granulated sugar' },
        { id: '3', measurement: '2 tbsp', ingredient: 'cocoa powder' },
        { id: '4', measurement: '1 1/2 cups', ingredient: 'vegetable oil' },
        { id: '5', measurement: '2 large', ingredient: 'eggs' },
        { id: '6', measurement: '1 cup', ingredient: 'buttermilk' },
        { id: '7', measurement: '2 tbsp', ingredient: 'red food coloring' },
        { id: '8', measurement: '1 tsp', ingredient: 'vanilla extract' },
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C)' },
        { id: '2', step: 'Mix dry ingredients in a bowl' },
        { id: '3', step: 'Beat oil, sugar, and eggs until fluffy' },
        { id: '4', step: 'Add food coloring and vanilla' },
        { id: '5', step: 'Alternate adding flour and buttermilk' },
        { id: '6', step: 'Bake for 25-30 minutes' },
      ],
      isActive: true,
    },
    {
      id: 'rec4',
      name: 'Strawberry Cake',
      category: 'Fruit Cakes',
      prepTime: '20 min',
      cookTime: '30 min',
      servings: 8,
      ingredients: [
        { id: '1', measurement: '2 cups', ingredient: 'all-purpose flour' },
        { id: '2', measurement: '1 1/2 cups', ingredient: 'granulated sugar' },
        { id: '3', measurement: '3 large', ingredient: 'eggs' },
        { id: '4', measurement: '1 cup', ingredient: 'strawberry puree' },
        { id: '5', measurement: '1/2 cup', ingredient: 'unsalted butter, softened' },
        { id: '6', measurement: '1 tsp', ingredient: 'vanilla extract' },
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C)' },
        { id: '2', step: 'Cream butter and sugar until light and fluffy' },
        { id: '3', step: 'Add strawberry puree and mix well' },
        { id: '4', step: 'Mix in flour gradually' },
        { id: '5', step: 'Bake for 25-30 minutes' },
      ],
      isActive: true,
    },
    {
      id: 'rec5',
      name: 'Carrot Cake',
      category: 'Classic Cakes',
      prepTime: '25 min',
      cookTime: '35 min',
      servings: 10,
      ingredients: [
        { id: '1', measurement: '2 cups', ingredient: 'all-purpose flour' },
        { id: '2', measurement: '1 1/2 cups', ingredient: 'granulated sugar' },
        { id: '3', measurement: '3 large', ingredient: 'eggs' },
        { id: '4', measurement: '1 cup', ingredient: 'vegetable oil' },
        { id: '5', measurement: '2 cups', ingredient: 'grated carrots' },
        { id: '6', measurement: '1 cup', ingredient: 'chopped walnuts' },
        { id: '7', measurement: '1 tsp', ingredient: 'vanilla extract' },
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C)' },
        { id: '2', step: 'Mix dry ingredients in a bowl' },
        { id: '3', step: 'Add grated carrots and mix well' },
        { id: '4', step: 'Mix in walnuts' },
        { id: '5', step: 'Bake for 30-35 minutes' },
      ],
      isActive: true,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const {
    formData,
    handleFieldChange,
    addIngredient,
    removeIngredient,
    updateIngredient,
    addInstruction,
    removeInstruction,
    updateInstruction,
    resetForm,
    validateForm,
  } = useRecipeForm();

  const handleAddRecipe = () => {
    if (!validateForm()) {
      return;
    }

    const recipe: Recipe = {
      id: `rec${Date.now()}`,
      name: formData.name,
      category: '', // Category removed from form, defaulting to empty string
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      servings: formData.servings,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      isActive: true,
    };
    setRecipes((prev) => [...prev, recipe]);
    resetForm();
    setShowAddModal(false);
  };

  const handleViewRecipe = (recipe: Recipe) => {
    router.push(`/admin/recipes/${recipe.id}`);
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const handleEditRecipe = () => {
    // TODO: Implement edit functionality
  };

  const handleCloseModal = () => {
    resetForm();
    setShowAddModal(false);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Recipe Management</h2>
          <p className="text-gray-600 text-base">View and manage your cake recipes here.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2 text-sm"
        >
          <Plus size={16} />
          Add Recipe
        </button>
      </div>

      <RecipeList
        recipes={recipes}
        onViewRecipe={handleViewRecipe}
        onEditRecipe={handleEditRecipe}
        onDeleteRecipe={handleDeleteRecipe}
      />

      <AddRecipeModal
        isOpen={showAddModal}
        formData={formData}
        onClose={handleCloseModal}
        onFieldChange={handleFieldChange}
        onAddIngredient={addIngredient}
        onRemoveIngredient={removeIngredient}
        onUpdateIngredient={updateIngredient}
        onAddInstruction={addInstruction}
        onRemoveInstruction={removeInstruction}
        onUpdateInstruction={updateInstruction}
        onSubmit={handleAddRecipe}
      />
    </div>
  );
}
