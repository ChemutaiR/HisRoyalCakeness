"use client";

import { Save } from 'lucide-react';

interface ProductFormHeaderProps {
  isEditing: boolean;
  isLoading?: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProductFormHeader({
  isEditing,
  isLoading = false,
  onEdit,
  onSave,
  onCancel,
}: ProductFormHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Product Configuration</h2>
        <p className="text-gray-600">Configure all product details and options</p>
      </div>
      <div className="flex space-x-3">
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-[#c7b8ea] text-white rounded-lg hover:bg-[#b5a3e8] transition-colors"
          >
            Edit Product
          </button>
        ) : (
          <>
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={isLoading}
              className="px-4 py-2 bg-[#c7b8ea] text-white rounded-lg hover:bg-[#b5a3e8] transition-colors flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}

