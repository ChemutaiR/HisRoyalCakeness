"use client";

import { X } from 'lucide-react';
import { Instruction } from '@/types/admin/recipes';

interface InstructionInputProps {
  instruction: Instruction;
  index: number;
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}

export default function InstructionInput({
  instruction,
  index,
  onUpdate,
  onRemove,
}: InstructionInputProps) {
  return (
    <div className="flex gap-2 items-start">
      <div className="flex-shrink-0 w-8 h-8 bg-[#c7b8ea] text-black rounded-full flex items-center justify-center text-sm font-semibold mt-1">
        {index + 1}
      </div>
      <div className="flex-1">
        <textarea
          value={instruction.step}
          onChange={(e) => onUpdate(instruction.id, e.target.value)}
          className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#c7b8ea] text-sm min-h-[60px] resize-none"
          placeholder="Describe this step in detail..."
        />
      </div>
      <button
        type="button"
        onClick={() => onRemove(instruction.id)}
        className="text-red-500 hover:text-red-700 p-1 mt-1"
        title="Remove step"
      >
        <X size={16} />
      </button>
    </div>
  );
}

