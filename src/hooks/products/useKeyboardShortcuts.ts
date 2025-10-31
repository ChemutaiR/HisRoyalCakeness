"use client";

import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  searchTerm: string;
  onClearSearch: () => void;
  onFocusSearch?: () => void;
  searchInputSelector?: string;
}

/**
 * Hook for managing keyboard shortcuts related to search
 */
export function useKeyboardShortcuts({
  searchTerm,
  onClearSearch,
  onFocusSearch,
  searchInputSelector = 'input[aria-label="Search products"]',
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Clear search with Escape key
      if (event.key === 'Escape' && searchTerm) {
        onClearSearch();
      }
      
      // Focus search with Ctrl/Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (onFocusSearch) {
          onFocusSearch();
        } else {
          const searchInput = document.querySelector(searchInputSelector) as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm, onClearSearch, onFocusSearch, searchInputSelector]);
}

