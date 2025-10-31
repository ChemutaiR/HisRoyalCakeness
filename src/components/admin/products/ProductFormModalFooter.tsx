"use client";

import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProductFormModalFooterProps {
  currentStep: number;
  totalSteps: number;
  isLoading?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ProductFormModalFooter({
  currentStep,
  totalSteps,
  isLoading = false,
  onPrevious,
  onNext,
  onSubmit,
  onCancel,
}: ProductFormModalFooterProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between p-6 border-t border-gray-200">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </button>

      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        {isLastStep ? (
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Product'}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center px-4 py-2 bg-[#c7b8ea] text-white rounded-lg hover:bg-[#b5a3e8]"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}

