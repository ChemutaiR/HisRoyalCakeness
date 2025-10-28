'use client';

import { Decoration } from '@/types/shop/catalog/decorations';

interface Size {
  size: string;
  price: number;
  servings: number;
}

interface CreamOption {
  name: string;
  price: number;
  available: boolean;
}

interface Cake {
  name: string;
  basePrice: number;
}

interface CustomizationSummaryProps {
  cake: Cake;
  selectedSize: Size | null;
  selectedCream: CreamOption | null;
  selectedDecorations: Decoration[];
  totalPrice: number;
}

export default function CustomizationSummary({ 
  cake, 
  selectedSize, 
  selectedCream, 
  selectedDecorations,
  totalPrice 
}: CustomizationSummaryProps) {
  if (!selectedSize) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium text-gray-800 tracking-wide mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        {/* Cake Name */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-800 tracking-wide">{cake.name}</span>
        </div>

        {/* Size */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Size: {selectedSize.size}</span>
          <span className="text-sm font-semibold text-gray-900 tracking-tight">KES {selectedSize.price.toLocaleString()}</span>
        </div>

        {/* Cream */}
        {selectedCream && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Cream: {selectedCream.name}</span>
            <span className="text-sm font-semibold text-gray-900 tracking-tight">
              {selectedCream.price > 0 ? `+KES ${selectedCream.price.toLocaleString()}` : 'Included'}
            </span>
          </div>
        )}

        {/* Servings */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Servings</span>
          <span className="text-sm font-semibold text-gray-900 tracking-tight">{selectedSize.servings} people</span>
        </div>

        {/* Decorations */}
        {selectedDecorations && selectedDecorations.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Decorations:</div>
            {selectedDecorations.map((decoration, index) => (
              <div key={decoration.id} className="flex justify-between items-center text-sm ml-4">
                <span className="text-gray-500">• {decoration.name}</span>
                <span className="text-sm font-semibold text-gray-900 tracking-tight">
                  +KES {decoration.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-900 tracking-tight">Total</span>
          <span className="text-sm font-semibold text-gray-900 tracking-tight">
            KES {totalPrice.toLocaleString()}
          </span>
        </div>

      </div>

    </div>
  );
} 