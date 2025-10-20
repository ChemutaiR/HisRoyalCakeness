"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

interface Ingredient {
  id: string;
  measurement: string;
  ingredient: string;
}

interface Instruction {
  id: string;
  step: string;
}

interface Recipe {
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
        { id: '9', measurement: '1/4 cup', ingredient: 'vegetable oil' }
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C) and grease a 9-inch round cake pan' },
        { id: '2', step: 'In a large bowl, cream together butter and sugar until light and fluffy' },
        { id: '3', step: 'Add eggs one at a time, beating well after each addition' },
        { id: '4', step: 'Mix in vanilla extract and vegetable oil' },
        { id: '5', step: 'In a separate bowl, whisk together flour, baking powder, and salt' },
        { id: '6', step: 'Gradually add dry ingredients to wet ingredients, alternating with milk' },
        { id: '7', step: 'Pour batter into prepared pan and bake for 25-30 minutes until a toothpick comes out clean' },
        { id: '8', step: 'Let cool in pan for 10 minutes, then transfer to wire rack' }
      ],
      isActive: true
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
        { id: '11', measurement: '2 tsp', ingredient: 'vanilla extract' }
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C)' },
        { id: '2', step: 'Sift together flour, sugar, cocoa, baking soda, baking powder, and salt' },
        { id: '3', step: 'Beat eggs, milk, oil, and vanilla in a separate bowl' },
        { id: '4', step: 'Gradually add dry ingredients to wet ingredients' },
        { id: '5', step: 'Stir in hot water (batter will be thin)' },
        { id: '6', step: 'Pour into greased pan and bake for 30-35 minutes' }
      ],
      isActive: true
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
        { id: '8', measurement: '1 tsp', ingredient: 'vanilla extract' }
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C)' },
        { id: '2', step: 'Mix dry ingredients in a bowl' },
        { id: '3', step: 'Beat oil, sugar, and eggs until fluffy' },
        { id: '4', step: 'Add food coloring and vanilla' },
        { id: '5', step: 'Alternate adding flour and buttermilk' },
        { id: '6', step: 'Bake for 25-30 minutes' }
      ],
      isActive: true
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
        { id: '6', measurement: '1 tsp', ingredient: 'vanilla extract' }
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C)' },
        { id: '2', step: 'Cream butter and sugar until light and fluffy' },
        { id: '3', step: 'Add strawberry puree and mix well' },
        { id: '4', step: 'Mix in flour gradually' },
        { id: '5', step: 'Bake for 25-30 minutes' }
      ],
      isActive: true
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
        { id: '7', measurement: '1 tsp', ingredient: 'vanilla extract' }
      ],
      instructions: [
        { id: '1', step: 'Preheat oven to 350°F (175°C)' },
        { id: '2', step: 'Mix dry ingredients in a bowl' },
        { id: '3', step: 'Add grated carrots and mix well' },
        { id: '4', step: 'Mix in walnuts' },
        { id: '5', step: 'Bake for 30-35 minutes' }
      ],
      isActive: true
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  // const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: 8,
    ingredients: [] as Ingredient[],
    instructions: [] as Instruction[]
  });

  const categories = [
    'Classic Cakes',
    'Chocolate Cakes',
    'Fruit Cakes',
    'Specialty Cakes',
    'Meal Prep',
    'Salad Dressings',
    'Baking Classes',
    'Beverages',
    'Snacks'
  ];



  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: `ing${Date.now()}`,
      measurement: '',
      ingredient: ''
    };
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
  };

  const removeIngredient = (id: string) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== id)
    }));
  };

  const updateIngredient = (id: string, field: 'measurement' | 'ingredient', value: string) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(ing => 
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const addInstruction = () => {
    const newInstruction: Instruction = {
      id: `step${Date.now()}`,
      step: ''
    };
    setNewRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, newInstruction]
    }));
  };

  const removeInstruction = (id: string) => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter(step => step.id !== id)
    }));
  };

  const updateInstruction = (id: string, value: string) => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.map(step => 
        step.id === id ? { ...step, step: value } : step
      )
    }));
  };

  const handleAddRecipe = () => {
    const recipe: Recipe = {
      id: `rec${Date.now()}`,
      name: newRecipe.name,
      category: newRecipe.category,
      prepTime: newRecipe.prepTime,
      cookTime: newRecipe.cookTime,
      servings: newRecipe.servings,
      ingredients: newRecipe.ingredients,
      instructions: newRecipe.instructions,
      isActive: true
    };
    setRecipes(prev => [...prev, recipe]);
    setNewRecipe({
      name: '',
      category: '',
      prepTime: '',
      cookTime: '',
      servings: 8,
      ingredients: [],
      instructions: []
    });
    setShowAddModal(false);
  };

  const handleViewRecipe = (recipe: Recipe) => {
    // Navigate to individual recipe page
    router.push(`/admin/recipes/${recipe.id}`);
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const handleEditRecipe = () => {
    // setEditingRecipe(recipe);
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

      {/* Recipes Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Recipes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prep Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cook Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recipes.map(recipe => (
                <tr key={recipe.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleViewRecipe(recipe)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{recipe.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.prepTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.cookTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.servings} people</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={handleEditRecipe}
                      className="text-indigo-600 hover:text-indigo-900" 
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteRecipe(recipe.id)}
                      className="text-red-600 hover:text-red-900" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Recipe Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add New Recipe</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Name *</label>
                <input
                  type="text"
                  value={newRecipe.name}
                  onChange={(e) => setNewRecipe(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                  placeholder="e.g., Classic Vanilla Cake, Chocolate Fudge Cake"
                />
                <p className="text-xs text-gray-500 mt-1">Enter a descriptive recipe name</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={newRecipe.category}
                  onChange={(e) => setNewRecipe(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Choose the appropriate category for this recipe</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">Ingredients & Measurements *</label>
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="text-[#c7b8ea] text-sm font-medium hover:text-[#c7b8ea]/80 flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Ingredient
                  </button>
                </div>
                
                {newRecipe.ingredients.length === 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="text-xs text-gray-600 mb-2 font-medium">📝 Quick Format Tips:</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Use standard measurements: cups, tbsp, tsp, grams, ounces</p>
                      <p>• Include ingredient state: softened butter, room temperature eggs</p>
                      <p>• List in order of use: dry ingredients first, then wet</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  {newRecipe.ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex gap-2 items-center">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={ingredient.measurement}
                          onChange={(e) => updateIngredient(ingredient.id, 'measurement', e.target.value)}
                          className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea] text-sm"
                          placeholder="e.g., 2 cups, 1/2 tsp, 3 large"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={ingredient.ingredient}
                          onChange={(e) => updateIngredient(ingredient.id, 'ingredient', e.target.value)}
                          className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea] text-sm"
                          placeholder="e.g., all-purpose flour, unsalted butter, softened"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeIngredient(ingredient.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove ingredient"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">Cooking/Baking Instructions *</label>
                  <button
                    type="button"
                    onClick={addInstruction}
                    className="text-[#c7b8ea] text-sm font-medium hover:text-[#c7b8ea]/80 flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Step
                  </button>
                </div>

                {newRecipe.instructions.length === 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="text-xs text-gray-600 mb-2 font-medium">👨‍🍳 Instruction Tips:</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Number each step clearly: 1, 2, 3...</p>
                      <p>• Include temperatures, times, and techniques</p>
                                             <p>• Mention when to add ingredients: &quot;Add eggs one at a time&quot;</p>
                       <p>• Include visual cues: &quot;until light and fluffy&quot;, &quot;until golden brown&quot;</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  {newRecipe.instructions.map((instruction, index) => (
                    <div key={instruction.id} className="flex gap-2 items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#c7b8ea] text-black rounded-full flex items-center justify-center text-sm font-semibold mt-1">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={instruction.step}
                          onChange={(e) => updateInstruction(instruction.id, e.target.value)}
                          className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea] text-sm min-h-[60px] resize-none"
                          placeholder="Describe this step in detail..."
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeInstruction(instruction.id)}
                        className="text-red-500 hover:text-red-700 p-1 mt-1"
                        title="Remove step"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time *</label>
                  <input
                    type="text"
                    value={newRecipe.prepTime}
                    onChange={(e) => setNewRecipe(prev => ({ ...prev, prepTime: e.target.value }))}
                    className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                    placeholder="e.g., 20 min"
                  />
                  <p className="text-xs text-gray-500 mt-1">Preparation time</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cook Time *</label>
                  <input
                    type="text"
                    value={newRecipe.cookTime}
                    onChange={(e) => setNewRecipe(prev => ({ ...prev, cookTime: e.target.value }))}
                    className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                    placeholder="e.g., 30 min"
                  />
                  <p className="text-xs text-gray-500 mt-1">Cooking/baking time</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servings *</label>
                <input
                  type="number"
                  value={newRecipe.servings}
                  onChange={(e) => setNewRecipe(prev => ({ ...prev, servings: parseInt(e.target.value) || 8 }))}
                  className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea]"
                  placeholder="8"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">Number of people this recipe serves</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Recipe Tips</h4>
                <div className="text-xs text-blue-700 space-y-1">
                                     <p>• <strong>Clear Names:</strong> Use descriptive names like &quot;Classic Vanilla Cake&quot;</p>
                  <p>• <strong>Accurate Times:</strong> Include prep and cook times for planning</p>
                  <p>• <strong>Organized Ingredients:</strong> Group dry and wet ingredients separately</p>
                  <p>• <strong>Precise Measurements:</strong> Use standard units (cups, tbsp, tsp, grams)</p>
                  <p>• <strong>Detailed Instructions:</strong> Include temperatures, times, and visual cues</p>
                  <p>• <strong>Category Organization:</strong> Choose the most appropriate category</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRecipe}
                  disabled={!newRecipe.name || !newRecipe.category || newRecipe.ingredients.length === 0 || newRecipe.instructions.length === 0}
                  className="px-3 py-1.5 bg-[#c7b8ea] text-black rounded text-sm font-semibold hover:bg-[#c7b8ea]/80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
} 