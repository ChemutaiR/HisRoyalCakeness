'use client';

import { Lock } from 'lucide-react';

interface NotesSectionProps {
  isAuthenticated: boolean;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export default function NotesSection({ isAuthenticated, notes, onNotesChange }: NotesSectionProps) {
  if (!isAuthenticated) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <Lock className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Custom Notes</h3>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">
            Sign in to add custom notes and special instructions for your cake.
          </p>
          <button className="text-[#c7b8ea] hover:text-[#c7b8ea]/80 font-medium text-sm">
            Sign in to continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Notes</h3>
      <div className="space-y-3">
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Any special instructions for baking, decoration preferences, dietary requirements, or other notes..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent resize-none"
          rows={4}
          maxLength={500}
        />
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Help us understand your preferences better</span>
          <span>{notes.length}/500</span>
        </div>
      </div>
      
      {notes && (
        <div className="mt-4 p-3 bg-[#c7b8ea]/5 border border-[#c7b8ea]/20 rounded-lg">
          <div className="text-sm text-gray-700">
            <span className="font-medium">Your notes:</span> {notes}
          </div>
        </div>
      )}
    </div>
  );
} 