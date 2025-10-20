"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import Recipes from '@/components/admin/recipes/Recipes';

export default function RecipesPage() {
  return (
    <AdminLayout 
      title="Recipes" 
      description="Manage cake recipes and ingredients"
    >
      <Recipes />
    </AdminLayout>
  );
}
