"use client";

import { Shield, ShieldOff } from 'lucide-react';

interface CustomerActionsProps {
  isActiveTab: boolean;
  onDeactivate: () => void;
  onBlacklist?: () => void;
  onReactivate: () => void;
}

export default function CustomerActions({
  isActiveTab,
  onDeactivate,
  onBlacklist,
  onReactivate,
}: CustomerActionsProps) {
  if (isActiveTab) {
    return (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeactivate();
          }}
          className="text-orange-600 hover:text-orange-900"
          title="Deactivate"
        >
          <ShieldOff className="w-4 h-4" />
        </button>
        {onBlacklist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBlacklist();
            }}
            className="text-red-600 hover:text-red-900"
            title="Blacklist"
          >
            <Shield className="w-4 h-4" />
          </button>
        )}
      </>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onReactivate();
      }}
      className="text-green-600 hover:text-green-900"
      title="Reactivate"
    >
      <Shield className="w-4 h-4" />
    </button>
  );
}

