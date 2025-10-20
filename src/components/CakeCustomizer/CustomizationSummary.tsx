'use client';

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
  totalPrice: number;
}

export default function CustomizationSummary({ 
  cake, 
  selectedSize, 
  selectedCream, 
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

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-900 tracking-tight">Total</span>
          <span className="text-sm font-semibold text-gray-900 tracking-tight">
            KES {totalPrice.toLocaleString()}
          </span>
        </div>

        {/* Price per serving */}
        <div className="text-xs text-gray-500 leading-relaxed text-center">
          KES {(totalPrice / selectedSize.servings).toFixed(0)} per serving
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-xs text-gray-500 leading-relaxed space-y-1">
          <div>• Delivery time: 2-3 business days</div>
          <div>• Free delivery for orders above KES 5,000</div>
          <div>• Custom decorations may require additional time</div>
        </div>
      </div>
    </div>
  );
} 