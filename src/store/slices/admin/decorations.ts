import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { Decoration, DecorationCategory } from '@/types/shop/catalog/decorations';
import { adminDecorationsService, AdminApiResponse } from '@/services/admin/decorations';

export interface AdminDecorationsState {
  // Data
  decorations: Decoration[];
  categories: DecorationCategory[];
  
  // Loading states
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  
  // Error states
  error: string | null;
  lastError: string | null;
  
  // UI state
  selectedCategory: string | null;
  selectedDecoration: Decoration | null;
  showCategoryForm: boolean;
  showDecorationForm: boolean;
  
  // Actions - Categories
  createCategory: (categoryData: Omit<DecorationCategory, 'decorations'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Omit<DecorationCategory, 'decorations'>>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getCategoryById: (id: string) => Promise<DecorationCategory | null>;
  loadCategories: () => Promise<void>;
  
  // Actions - Decorations
  createDecoration: (decorationData: Omit<Decoration, 'id'>, categoryId: string) => Promise<void>;
  updateDecoration: (id: number, updates: Partial<Omit<Decoration, 'id'>>) => Promise<void>;
  deleteDecoration: (id: number) => Promise<void>;
  getDecorationById: (id: number) => Promise<Decoration | null>;
  loadDecorations: () => Promise<void>;
  
  // Actions - UI
  setSelectedCategory: (categoryId: string | null) => void;
  setSelectedDecoration: (decoration: Decoration | null) => void;
  setShowCategoryForm: (show: boolean) => void;
  setShowDecorationForm: (show: boolean) => void;
  clearError: () => void;
  
  // Computed getters
  getDecorationsByCategory: (categoryId: string) => Decoration[];
  findCategoryById: (id: string) => DecorationCategory | undefined;
  findDecorationById: (id: number) => Decoration | undefined;
}

export const useAdminDecorationsStore = create<AdminDecorationsState>()(
  devtools(
    subscribeWithSelector(
      (set, get) => ({
        // Initial state
        decorations: [],
        categories: [],
        isLoading: false,
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
        error: null,
        lastError: null,
        selectedCategory: null,
        selectedDecoration: null,
        showCategoryForm: false,
        showDecorationForm: false,

        // Actions - Categories
        createCategory: async (categoryData: Omit<DecorationCategory, 'decorations'>) => {
          set({ isCreating: true, error: null });
          try {
            const response: AdminApiResponse<DecorationCategory> = await adminDecorationsService.createCategory(categoryData);
            
            if (response.success && response.data) {
              set((state) => ({
                categories: [...state.categories, response.data!],
                isCreating: false,
                showCategoryForm: false
              }));
            } else {
              set({ 
                error: response.error || 'Failed to create category',
                lastError: response.error || 'Failed to create category',
                isCreating: false 
              });
            }
          } catch (error: any) {
            const errorMessage = error.message || 'Failed to create category';
            set({ 
              error: errorMessage,
              lastError: errorMessage,
              isCreating: false 
            });
          }
        },

        updateCategory: async (id: string, updates: Partial<Omit<DecorationCategory, 'decorations'>>) => {
          set({ isUpdating: true, error: null });
          try {
            const response: AdminApiResponse<DecorationCategory> = await adminDecorationsService.updateCategory(id, updates);
            
            if (response.success && response.data) {
              set((state) => ({
                categories: state.categories.map(category => 
                  category.id === id ? response.data! : category
                ),
                isUpdating: false
              }));
            } else {
              set({ 
                error: response.error || 'Failed to update category',
                lastError: response.error || 'Failed to update category',
                isUpdating: false 
              });
            }
          } catch (error: any) {
            const errorMessage = error.message || 'Failed to update category';
            set({ 
              error: errorMessage,
              lastError: errorMessage,
              isUpdating: false 
            });
          }
        },

        deleteCategory: async (id: string) => {
          set({ isDeleting: true, error: null });
          try {
            const response: AdminApiResponse<boolean> = await adminDecorationsService.deleteCategory(id);
            
            if (response.success) {
              set((state) => ({
                categories: state.categories.filter(category => category.id !== id),
                decorations: state.decorations.filter(decoration => 
                  !state.categories.find(cat => cat.id === id)?.decorations.some(dec => dec.id === decoration.id)
                ),
                isDeleting: false
              }));
            } else {
              set({ 
                error: response.error || 'Failed to delete category',
                lastError: response.error || 'Failed to delete category',
                isDeleting: false 
              });
            }
          } catch (error: any) {
            const errorMessage = error.message || 'Failed to delete category';
            set({ 
              error: errorMessage,
              lastError: errorMessage,
              isDeleting: false 
            });
          }
        },

        getCategoryById: async (id: string): Promise<DecorationCategory | null> => {
          try {
            const response: AdminApiResponse<DecorationCategory> = await adminDecorationsService.getCategoryById(id);
            return response.success ? response.data || null : null;
          } catch (error) {
            // console.error('Error getting category by ID:', error);
            return null;
          }
        },

        loadCategories: async () => {
          set({ isLoading: true, error: null });
          try {
            const response: AdminApiResponse<DecorationCategory[]> = await adminDecorationsService.getAllCategories();
            
            if (response.success && response.data) {
              set({ 
                categories: response.data,
                isLoading: false 
              });
            } else {
              set({ 
                error: response.error || 'Failed to load categories',
                lastError: response.error || 'Failed to load categories',
                isLoading: false 
              });
            }
          } catch (error: any) {
            const errorMessage = error.message || 'Failed to load categories';
            set({ 
              error: errorMessage,
              lastError: errorMessage,
              isLoading: false 
            });
          }
        },

        // Actions - Decorations
        createDecoration: async (decorationData: Omit<Decoration, 'id'>, categoryId: string) => {
          set({ isCreating: true, error: null });
          try {
            const response: AdminApiResponse<Decoration> = await adminDecorationsService.createDecoration(decorationData, categoryId);
            
            if (response.success && response.data) {
              set((state) => ({
                decorations: [...state.decorations, response.data!],
                categories: state.categories.map(category => 
                  category.id === categoryId 
                    ? { ...category, decorations: [...category.decorations, response.data!] }
                    : category
                ),
                isCreating: false,
                showDecorationForm: false
              }));
            } else {
              set({ 
                error: response.error || 'Failed to create decoration',
                lastError: response.error || 'Failed to create decoration',
                isCreating: false 
              });
            }
          } catch (error: any) {
            const errorMessage = error.message || 'Failed to create decoration';
            set({ 
              error: errorMessage,
              lastError: errorMessage,
              isCreating: false 
            });
          }
        },

        updateDecoration: async (id: number, updates: Partial<Omit<Decoration, 'id'>>) => {
          set({ isUpdating: true, error: null });
          try {
            const response: AdminApiResponse<Decoration> = await adminDecorationsService.updateDecoration(id, updates);
            
            if (response.success && response.data) {
              set((state) => ({
                decorations: state.decorations.map(decoration => 
                  decoration.id === id ? response.data! : decoration
                ),
                categories: state.categories.map(category => ({
                  ...category,
                  decorations: category.decorations.map(decoration => 
                    decoration.id === id ? response.data! : decoration
                  )
                })),
                isUpdating: false
              }));
            } else {
              set({ 
                error: response.error || 'Failed to update decoration',
                lastError: response.error || 'Failed to update decoration',
                isUpdating: false 
              });
            }
          } catch (error: any) {
            const errorMessage = error.message || 'Failed to update decoration';
            set({ 
              error: errorMessage,
              lastError: errorMessage,
              isUpdating: false 
            });
          }
        },

        deleteDecoration: async (id: number) => {
          set({ isDeleting: true, error: null });
          try {
            const response: AdminApiResponse<boolean> = await adminDecorationsService.deleteDecoration(id);
            
            if (response.success) {
              set((state) => ({
                decorations: state.decorations.filter(decoration => decoration.id !== id),
                categories: state.categories.map(category => ({
                  ...category,
                  decorations: category.decorations.filter(decoration => decoration.id !== id)
                })),
                isDeleting: false
              }));
            } else {
              set({ 
                error: response.error || 'Failed to delete decoration',
                lastError: response.error || 'Failed to delete decoration',
                isDeleting: false 
              });
            }
          } catch (error: any) {
            const errorMessage = error.message || 'Failed to delete decoration';
            set({ 
              error: errorMessage,
              lastError: errorMessage,
              isDeleting: false 
            });
          }
        },

        getDecorationById: async (id: number): Promise<Decoration | null> => {
          try {
            const response: AdminApiResponse<Decoration> = await adminDecorationsService.getDecorationById(id);
            return response.success ? response.data || null : null;
          } catch (error) {
            // console.error('Error getting decoration by ID:', error);
            return null;
          }
        },

        loadDecorations: async () => {
          set({ isLoading: true, error: null });
          try {
            const response: AdminApiResponse<Decoration[]> = await adminDecorationsService.getAllDecorations();
            
            if (response.success && response.data) {
              set({ 
                decorations: response.data,
                isLoading: false 
              });
            } else {
              set({ 
                error: response.error || 'Failed to load decorations',
                lastError: response.error || 'Failed to load decorations',
                isLoading: false 
              });
            }
          } catch (error: any) {
            const errorMessage = error.message || 'Failed to load decorations';
            set({ 
              error: errorMessage,
              lastError: errorMessage,
              isLoading: false 
            });
          }
        },

        // Actions - UI
        setSelectedCategory: (categoryId: string | null) => {
          set({ selectedCategory: categoryId });
        },

        setSelectedDecoration: (decoration: Decoration | null) => {
          set({ selectedDecoration: decoration });
        },

        setShowCategoryForm: (show: boolean) => {
          set({ showCategoryForm: show });
        },

        setShowDecorationForm: (show: boolean) => {
          set({ showDecorationForm: show });
        },

        clearError: () => {
          set({ error: null, lastError: null });
        },

        // Computed getters
        getDecorationsByCategory: (categoryId: string) => {
          const state = get();
          const category = state.categories.find(cat => cat.id === categoryId);
          return category ? category.decorations : [];
        },

        findCategoryById: (id: string) => {
          const state = get();
          return state.categories.find(category => category.id === id);
        },

        findDecorationById: (id: number) => {
          const state = get();
          return state.decorations.find(decoration => decoration.id === id);
        }
      })
    ),
    { name: 'admin-decorations-store' }
  )
);
