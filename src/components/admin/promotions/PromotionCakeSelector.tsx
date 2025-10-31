"use client";

interface PromotionCakeSelectorProps {
  applyToAll: boolean;
  onToggleApplyToAll: (v: boolean) => void;
  availableCakeNames: string[];
  selectedCakeNames: string[];
  onChangeSelected: (names: string[]) => void;
}

export default function PromotionCakeSelector({
  applyToAll,
  onToggleApplyToAll,
  availableCakeNames,
  selectedCakeNames,
  onChangeSelected,
}: PromotionCakeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Applicable Cakes</label>
      <div className="flex items-center gap-2 mb-2">
        <input
          id="apply-all"
          type="checkbox"
          checked={applyToAll}
          onChange={(e) => onToggleApplyToAll(e.target.checked)}
        />
        <label htmlFor="apply-all" className="text-sm text-gray-700">Apply to all cakes</label>
      </div>
      {!applyToAll && (
        <select
          multiple
          onChange={(e) => {
            const newlySelected = Array.from(e.target.selectedOptions).map((o) => o.value);
            const merged = [...selectedCakeNames, ...newlySelected.filter((n) => !selectedCakeNames.includes(n))];
            onChangeSelected(merged);
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
        >
          {availableCakeNames
            .filter((name) => !selectedCakeNames.includes(name))
            .map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
        </select>
      )}
      {!applyToAll && selectedCakeNames.length > 0 && (
        <>
          <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple cakes.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedCakeNames.map((name) => (
              <span key={name} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200">
                {name}
                <button
                  type="button"
                  onClick={() => onChangeSelected(selectedCakeNames.filter((n) => n !== name))}
                  className="hover:text-red-600"
                  aria-label={`Remove ${name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


