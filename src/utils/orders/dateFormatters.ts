/**
 * Order Date Formatting Utilities
 * 
 * Utility functions for formatting dates in order-related components
 */

/**
 * Format date string to readable format
 */
export function formatOrderDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

