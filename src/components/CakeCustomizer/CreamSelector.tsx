'use client';

interface CreamOption {
  name: string;
  price: number;
  available: boolean;
}

interface CreamSelectorProps {
  options: CreamOption[];
  selectedCream: CreamOption | null;
  // eslint-disable-next-line no-unused-vars
  onCreamChange: (cream: CreamOption) => void;
}

export default function CreamSelector({ options, selectedCream, onCreamChange }: CreamSelectorProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Whipping Cream Type</h3>
      <div className="space-y-3">
        {options.map((cream) => (
          <label
            key={cream.name}
            className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedCream?.name === cream.name
                ? 'border-[#c7b8ea] bg-[#c7b8ea]/5'
                : 'border-gray-200 hover:border-[#c7b8ea] hover:bg-gray-50'
            } ${!cream.available ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input
              type="radio"
              name="cream"
              value={cream.name}
              checked={selectedCream?.name === cream.name}
              onChange={() => cream.available && onCreamChange(cream)}
              disabled={!cream.available}
              className="text-[#c7b8ea] focus:ring-[#c7b8ea]"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">{cream.name}</div>
              {cream.price > 0 && (
                <div className="text-sm text-gray-600">
                  +KES {cream.price.toLocaleString()}
                </div>
              )}
              {cream.price === 0 && (
                <div className="text-sm text-green-600 font-medium">Included</div>
              )}
            </div>
            {selectedCream?.name === cream.name && (
              <div className="text-[#c7b8ea]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </label>
        ))}
      </div>
      
      {selectedCream && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Selected:</span> {selectedCream.name}
            {selectedCream.price > 0 && (
              <span className="ml-2 text-[#c7b8ea] font-medium">
                (+KES {selectedCream.price.toLocaleString()})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 