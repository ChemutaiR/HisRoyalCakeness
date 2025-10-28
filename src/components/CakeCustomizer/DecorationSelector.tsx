'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import DecorationCard from './DecorationCard';
import { Decoration, DecorationCategory } from '@/types/shop/catalog/decorations';
import { mockDecorationOperations } from '@/mockDatabase/shop/decorations';

interface DecorationSelectorProps {
  selectedDecorations: Decoration[];
  onDecorationsChange: (decorations: Decoration[]) => void;
}

export default function DecorationSelector({ 
  selectedDecorations, 
  onDecorationsChange 
}: DecorationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [categories, setCategories] = useState<DecorationCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Load decorations and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [decorationsData, categoriesData] = await Promise.all([
          mockDecorationOperations.getAllDecorations(),
          mockDecorationOperations.getAllCategories()
        ]);
        setDecorations(decorationsData);
        setCategories(categoriesData);
      } catch (error) {
        // console.error('Failed to load decorations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter decorations based on search and category
  const filteredDecorations = useMemo(() => {
    let filtered = decorations;

    // Filter by category
    if (selectedCategory !== 'all') {
      const category = categories.find(c => c.id === selectedCategory);
      if (category) {
        filtered = filtered.filter(d => category.decorations.some(cd => cd.id === d.id));
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [decorations, categories, selectedCategory, searchQuery]);

  const handleToggleDecoration = (decoration: Decoration) => {
    const isSelected = selectedDecorations.some(d => d.id === decoration.id);
    
    if (isSelected) {
      // Remove decoration
      onDecorationsChange(selectedDecorations.filter(d => d.id !== decoration.id));
    } else {
      // Add decoration
      onDecorationsChange([...selectedDecorations, decoration]);
    }
  };

  const isDecorationSelected = (decoration: Decoration) => {
    return selectedDecorations.some(d => d.id === decoration.id);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🎨 Decorations</h3>
      
      {/* Search and Filter */}
      <div className="space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search decorations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#c7b8ea] text-black'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#c7b8ea] text-black'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Decorations Grid */}
      {filteredDecorations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            {searchQuery ? 'No decorations found matching your search.' : 'No decorations available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {filteredDecorations.map((decoration) => (
            <DecorationCard
              key={decoration.id}
              decoration={decoration}
              isSelected={isDecorationSelected(decoration)}
              onToggle={handleToggleDecoration}
            />
          ))}
        </div>
      )}

      {/* Selected Decorations Summary */}
      {selectedDecorations.length > 0 && (
        <div className="mt-4 p-3 bg-[#c7b8ea]/10 border border-[#c7b8ea]/20 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-medium">{selectedDecorations.length}</span> decoration{selectedDecorations.length !== 1 ? 's' : ''} selected
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedDecorations.map((decoration) => (
              <span
                key={decoration.id}
                className="inline-flex items-center px-2 py-1 bg-[#c7b8ea] text-black text-xs rounded-full"
              >
                {decoration.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
