/**
 * Product Cream Options Utilities
 * 
 * Utility functions for parsing, serializing, and formatting cream options
 */

/**
 * Parse a cream option string into name and cost
 * Example: "Vanilla (+200)" -> { name: "Vanilla", cost: 200 }
 */
export function parseCreamOption(option: string): { name: string; cost: number } {
  const costMatch = option.match(/\+(\d+)/);
  const cost = costMatch ? parseInt(costMatch[1]) : 0;
  const name = option.replace(/\s*\(\+\d+\)/, '').trim();
  return { name, cost };
}

/**
 * Serialize name and cost into cream option string
 * Example: ("Vanilla", 200) -> "Vanilla (+200)"
 */
export function serializeCreamOption(name: string, cost: number): string {
  const cleanName = name.trim();
  const cleanCost = Number.isFinite(cost) && cost > 0 ? ` (+${Math.floor(cost)})` : '';
  return `${cleanName}${cleanCost}`;
}

/**
 * Format cream option for display
 */
export function formatCreamDisplay(option: string, isDefault: boolean): { name: string; cost: number; displayText: string } {
  const { name, cost } = parseCreamOption(option);
  const displayText = isDefault 
    ? 'Included' 
    : cost > 0 
      ? `+KES ${cost}` 
      : '';
  return { name, cost, displayText };
}

