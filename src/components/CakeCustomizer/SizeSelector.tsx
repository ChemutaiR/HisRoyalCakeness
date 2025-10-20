'use client';

interface Size {
  size: string;
  price: number;
  servings: number;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size | null;
  // eslint-disable-next-line no-unused-vars
  onSizeChange: (size: Size) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium text-gray-800 tracking-wide mb-4">Choose Size</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sizes.map((size) => (
          <button
            key={size.size}
            onClick={() => onSizeChange(size)}
            className={`p-3 border rounded-lg text-left transition-all duration-200 ${
              selectedSize?.size === size.size
                ? 'border-[#c7b8ea] bg-[#c7b8ea]/5 shadow-md'
                : 'border-gray-300 hover:border-[#c7b8ea] hover:bg-gray-50'
            }`}
          >
            <div className="text-sm font-medium text-gray-800 tracking-wide">{size.size}</div>
            <div className="text-xs text-gray-500 leading-relaxed mb-1">{size.servings} servings</div>
            <div className="text-sm font-semibold text-gray-900 tracking-tight">
              KES {size.price.toLocaleString()}
            </div>
            {selectedSize?.size === size.size && (
              <div className="mt-1 text-xs text-[#c7b8ea] font-medium">✓ Selected</div>
            )}
          </button>
        ))}
      </div>
      
      {selectedSize && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500 leading-relaxed">
            <span className="font-medium">Selected:</span> {selectedSize.size} - {selectedSize.servings} servings
          </div>
        </div>
      )}
    </div>
  );
} 