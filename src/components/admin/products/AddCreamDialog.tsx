"use client";

import { Input } from '@/components/ui';

interface AddCreamDialogProps {
  isOpen: boolean;
  creamName: string;
  creamCost: number | '';
  onCreamNameChange: (value: string) => void;
  onCreamCostChange: (value: number | '') => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function AddCreamDialog({
  isOpen,
  creamName,
  creamCost,
  onCreamNameChange,
  onCreamCostChange,
  onSave,
  onCancel,
}: AddCreamDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Cake Cream Option</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cream Name</label>
            <Input
              type="text"
              value={creamName}
              onChange={(e) => onCreamNameChange((e.target as HTMLInputElement).value)}
              placeholder="Enter cream name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Cost (KES)</label>
            <Input
              type="number"
              value={creamCost}
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                onCreamCostChange(value === '' ? '' : Number(value));
              }}
              placeholder="0"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Additional cost for this cream option</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!creamName.trim()}
            className="px-4 py-2 bg-[#c7b8ea] text-white rounded-lg hover:bg-[#b5a3e8] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Cream
          </button>
        </div>
      </div>
    </div>
  );
}

