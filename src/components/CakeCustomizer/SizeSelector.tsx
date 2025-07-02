'use client';

interface Size {
  size: string;
  price: number;
  servings: number;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size | null;
  onSizeChange: (size: Size) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Size</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sizes.map((size) => (
          <button
            key={size.size}
            onClick={() => onSizeChange(size)}
            className={`p-4 border rounded-lg text-left transition-all duration-200 ${
              selectedSize?.size === size.size
                ? 'border-[#c7b8ea] bg-[#c7b8ea]/5 shadow-md'
                : 'border-gray-300 hover:border-[#c7b8ea] hover:bg-gray-50'
            }`}
          >
            <div className="font-semibold text-gray-900">{size.size}</div>
            <div className="text-sm text-gray-600 mb-2">{size.servings} servings</div>
            <div className="font-bold text-lg text-[#c7b8ea]">
              KES {size.price.toLocaleString()}
            </div>
            {selectedSize?.size === size.size && (
              <div className="mt-2 text-xs text-[#c7b8ea] font-medium">✓ Selected</div>
            )}
          </button>
        ))}
      </div>
      
      {selectedSize && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Selected:</span> {selectedSize.size} - {selectedSize.servings} servings
          </div>
        </div>
      )}
    </div>
  );
} 