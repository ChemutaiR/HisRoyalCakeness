"use client";

import { Input } from '@/components/ui';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui';

interface ProductBasicInfoProps {
  name: string;
  description: string;
  isActive: boolean;
  isEditing: boolean;
  errors: {
    name?: string;
    description?: string;
  };
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onActiveChange: (value: boolean) => void;
}

export default function ProductBasicInfo({
  name,
  description,
  isActive,
  isEditing,
  errors,
  onNameChange,
  onDescriptionChange,
  onActiveChange,
}: ProductBasicInfoProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <Input
            type="text"
            value={name || ''}
            onChange={(e) => onNameChange((e.target as HTMLInputElement).value)}
            disabled={!isEditing}
            className={`${errors.name ? 'border-red-500' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <Select
            value={isActive ? 'active' : 'inactive'}
            onValueChange={(val) => onActiveChange(val === 'active')}
            disabled={!isEditing}
          >
            <SelectTrigger className={`rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${!isEditing ? 'bg-gray-50' : ''}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={description || ''}
          onChange={(e) => onDescriptionChange(e.target.value)}
          disabled={!isEditing}
          rows={3}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${
            errors.description ? 'border-red-500' : ''
          } ${!isEditing ? 'bg-gray-50' : ''}`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
    </div>
  );
}

