"use client";

import { X } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProductFormModalHeaderProps {
  title: string;
  currentStep: number;
  steps: Step[];
  onClose: () => void;
}

export default function ProductFormModalHeader({
  title,
  currentStep,
  steps,
  onClose,
}: ProductFormModalHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
        </p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}

