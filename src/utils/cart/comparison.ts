import { CustomizationOptions } from '@/types/shop/catalog';

/**
 * Compares two CustomizationOptions objects to determine if they are identical
 * This is used to determine if two cart items are the same customization
 * 
 * @param customization1 - First customization object
 * @param customization2 - Second customization object
 * @returns true if customizations are identical, false otherwise
 */
export function areCustomizationsEqual(
  customization1: CustomizationOptions, 
  customization2: CustomizationOptions
): boolean {
  // Compare selected size
  if (customization1.selectedSize?.size !== customization2.selectedSize?.size) {
    return false;
  }

  // Compare selected cream
  if (customization1.selectedCream?.name !== customization2.selectedCream?.name) {
    return false;
  }

  // Compare selected container type
  if (customization1.selectedContainerType?.value !== customization2.selectedContainerType?.value) {
    return false;
  }

  // Compare custom notes
  if (customization1.customNotes !== customization2.customNotes) {
    return false;
  }

  // Compare uploaded images
  if (!areArraysEqual(customization1.uploadedImages, customization2.uploadedImages)) {
    return false;
  }

  // Compare selected decorations
  if (!areDecorationsEqual(customization1.selectedDecorations, customization2.selectedDecorations)) {
    return false;
  }

  return true;
}

/**
 * Compares two arrays of strings for equality
 * 
 * @param array1 - First array
 * @param array2 - Second array
 * @returns true if arrays are identical, false otherwise
 */
function areArraysEqual(array1: string[], array2: string[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }
  
  return array1.every((item, index) => item === array2[index]);
}

/**
 * Compares two arrays of decorations for equality
 * Decorations are considered equal if they have the same IDs in the same order
 * 
 * @param decorations1 - First decorations array
 * @param decorations2 - Second decorations array
 * @returns true if decoration arrays are identical, false otherwise
 */
function areDecorationsEqual(
  decorations1: CustomizationOptions['selectedDecorations'], 
  decorations2: CustomizationOptions['selectedDecorations']
): boolean {
  if (decorations1.length !== decorations2.length) {
    return false;
  }
  
  // Sort by ID to ensure order doesn't matter for comparison
  const sorted1 = [...decorations1].sort((a, b) => a.id - b.id);
  const sorted2 = [...decorations2].sort((a, b) => a.id - b.id);
  
  return sorted1.every((decoration, index) => decoration.id === sorted2[index].id);
}

/**
 * Generates a unique key for a customization object
 * This can be used for caching or debugging purposes
 * 
 * @param customization - Customization object
 * @returns unique string key representing the customization
 */
export function getCustomizationKey(customization: CustomizationOptions): string {
  const parts = [
    `size:${customization.selectedSize?.size || 'none'}`,
    `cream:${customization.selectedCream?.name || 'none'}`,
    `container:${customization.selectedContainerType?.value || 'none'}`,
    `notes:${customization.customNotes || 'none'}`,
    `images:${customization.uploadedImages.length}`,
    `decorations:${customization.selectedDecorations.map(d => d.id).sort().join(',')}`
  ];
  
  return parts.join('|');
}
