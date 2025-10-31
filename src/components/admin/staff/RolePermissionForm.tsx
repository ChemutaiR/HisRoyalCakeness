"use client";

import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui';
import PermissionMatrixGrid from './PermissionMatrixGrid';
import { defaultPermissions } from '@/utils/admin/permissions-list';

export interface RoleFormData {
  name: string;
  description: string;
  permissions: string[];
}

interface RolePermissionFormProps {
  initialData?: Partial<RoleFormData>;
  mode: 'create' | 'edit';
  onSave: (data: RoleFormData) => void | Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function RolePermissionForm({
  initialData,
  mode,
  onSave,
  onCancel,
  isLoading = false,
}: RolePermissionFormProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    permissions: initialData?.permissions || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTogglePermission = useCallback((permissionId: string) => {
    setFormData(prev => {
      const hasPermission = prev.permissions.includes(permissionId);
      return {
        ...prev,
        permissions: hasPermission
          ? prev.permissions.filter(p => p !== permissionId)
          : [...prev.permissions, permissionId]
      };
    });
  }, []);

  const handleToggleCategory = useCallback((category: string, selectAll: boolean) => {
    const categoryPermissions = defaultPermissions
      .filter(p => p.category === category)
      .map(p => p.id);

    setFormData(prev => {
      if (selectAll) {
        // Add all category permissions that aren't already selected
        const newPermissions = categoryPermissions.filter(id => !prev.permissions.includes(id));
        return {
          ...prev,
          permissions: [...prev.permissions, ...newPermissions]
        };
      } else {
        // Remove all category permissions
        return {
          ...prev,
          permissions: prev.permissions.filter(id => !categoryPermissions.includes(id))
        };
      }
    });
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Role Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }));
                if (errors.name) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.name;
                    return newErrors;
                  });
                }
              }}
              placeholder="e.g., Senior Baker, Customer Service"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the role's responsibilities..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] resize-none"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Permissions</h3>
            <p className="text-sm text-gray-600 mt-1">
              Select the permissions for this role. {formData.permissions.length} permission(s) selected.
            </p>
          </div>
        </div>
        
        <PermissionMatrixGrid
          permissions={defaultPermissions}
          selectedPermissions={formData.permissions}
          onTogglePermission={handleTogglePermission}
          onToggleCategory={handleToggleCategory}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.name.trim()}
          className="px-4 py-2 bg-[#c7b8ea] text-black rounded-lg text-sm font-semibold hover:bg-[#c7b8ea]/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : mode === 'create' ? 'Create Role' : 'Update Role'}
        </button>
      </div>
    </form>
  );
}

