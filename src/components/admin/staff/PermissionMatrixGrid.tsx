"use client";

import { Check, X } from 'lucide-react';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface PermissionMatrixGridProps {
  permissions: Permission[];
  selectedPermissions: string[];
  onTogglePermission: (permissionId: string) => void;
  onToggleCategory?: (category: string, selectAll: boolean) => void;
  readOnly?: boolean;
}

export default function PermissionMatrixGrid({
  permissions,
  selectedPermissions,
  onTogglePermission,
  onToggleCategory,
  readOnly = false,
}: PermissionMatrixGridProps) {
  const categories = Array.from(new Set(permissions.map(p => p.category)));

  const getCategoryPermissions = (category: string) => {
    return permissions.filter(p => p.category === category);
  };

  const isCategoryFullySelected = (category: string) => {
    const categoryPermissions = getCategoryPermissions(category);
    return categoryPermissions.every(p => selectedPermissions.includes(p.id));
  };

  const isCategoryPartiallySelected = (category: string) => {
    const categoryPermissions = getCategoryPermissions(category);
    const selectedCount = categoryPermissions.filter(p => selectedPermissions.includes(p.id)).length;
    return selectedCount > 0 && selectedCount < categoryPermissions.length;
  };

  const handleToggleCategory = (category: string) => {
    if (!onToggleCategory || readOnly) return;
    
    const _categoryPermissions = getCategoryPermissions(category);
    const selectAll = !isCategoryFullySelected(category);
    
    onToggleCategory(category, selectAll);
  };

  return (
    <div className="space-y-6">
      {categories.map(category => {
        const categoryPermissions = getCategoryPermissions(category);
        const fullySelected = isCategoryFullySelected(category);
        const _partiallySelected = isCategoryPartiallySelected(category);

        return (
          <div key={category}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-semibold text-gray-800">{category}</h4>
              {onToggleCategory && !readOnly && (
                <button
                  onClick={() => handleToggleCategory(category)}
                  className="text-sm text-[#c7b8ea] hover:text-[#c7b8ea]/80 font-medium"
                >
                  {fullySelected ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryPermissions.map(permission => {
                const hasPermission = selectedPermissions.includes(permission.id);
                
                return (
                  <div
                    key={permission.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      readOnly
                        ? 'cursor-default'
                        : hasPermission
                        ? 'border-green-200 bg-green-50 hover:bg-green-100'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                    }`}
                    onClick={() => !readOnly && onTogglePermission(permission.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {hasPermission ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {permission.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

