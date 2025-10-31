"use client";

interface OrderNotesSectionProps {
  customNotes?: string;
  specialInstructions?: string;
}

export default function OrderNotesSection({
  customNotes,
  specialInstructions,
}: OrderNotesSectionProps) {
  if (!customNotes && !specialInstructions) {
    return null;
  }

  return (
    <div className="space-y-4">
      {customNotes && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-blue-600 text-sm">📝</span>
            <h4 className="font-semibold text-blue-900 text-sm">Custom Notes</h4>
          </div>
          <p className="text-blue-800 text-sm">{customNotes}</p>
        </div>
      )}

      {specialInstructions && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-yellow-600 text-sm">⚠️</span>
            <h4 className="font-semibold text-yellow-900 text-sm">Special Instructions</h4>
          </div>
          <p className="text-yellow-800 text-sm">{specialInstructions}</p>
        </div>
      )}
    </div>
  );
}

