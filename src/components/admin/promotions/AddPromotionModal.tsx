"use client";

import { RefObject } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PromotionImageUpload from './PromotionImageUpload';
import PromotionCakeSelector from './PromotionCakeSelector';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

interface AddPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cakeNames: string[];

  // Image
  enableImage: boolean;
  setEnableImage: (v: boolean) => void;
  imageFileRef: RefObject<HTMLInputElement>;
  imagePreview: string | null;
  setImagePreview: (v: string | null) => void;
  setImageFile: (f: File | null) => void;

  // Cakes
  applyToAll: boolean;
  setApplyToAll: (v: boolean) => void;
  selectedCakes: string[];
  setSelectedCakes: (v: string[]) => void;

  // Discount
  discountType: 'Percentage' | 'Fixed Amount';
  setDiscountType: (v: 'Percentage' | 'Fixed Amount') => void;
  enableMinOrder: boolean;
  setEnableMinOrder: (v: boolean) => void;
  enableMaxUsage: boolean;
  setEnableMaxUsage: (v: boolean) => void;
}

export default function AddPromotionModal({
  isOpen,
  onClose,
  cakeNames,
  enableImage,
  setEnableImage,
  imageFileRef,
  imagePreview,
  setImagePreview,
  setImageFile,
  applyToAll,
  setApplyToAll,
  selectedCakes,
  setSelectedCakes,
  discountType,
  setDiscountType,
  enableMinOrder,
  setEnableMinOrder,
  enableMaxUsage,
  setEnableMaxUsage,
}: AddPromotionModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add New Promotion</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Name</label>
            <Input type="text" placeholder="Enter promotion name" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Enter promotion description"
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <PromotionImageUpload
            enabled={enableImage}
            onToggle={setEnableImage}
            fileInputRef={imageFileRef}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            setFile={setImageFile}
          />

          <PromotionCakeSelector
            applyToAll={applyToAll}
            onToggleApplyToAll={setApplyToAll}
            availableCakeNames={cakeNames}
            selectedCakeNames={selectedCakes}
            onChangeSelected={setSelectedCakes}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
              <Select value={discountType} onValueChange={(v) => setDiscountType(v as 'Percentage' | 'Fixed Amount')}>
                <SelectTrigger className="w-full">
                  <span className="truncate">{discountType}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Percentage">Percentage</SelectItem>
                  <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {discountType === 'Percentage' ? 'Discount Percentage (%)' : 'Discount Amount (KES)'}
              </label>
              <Input type="number" placeholder="0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <Input type="date" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Minimum Order Value</label>
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" checked={enableMinOrder} onChange={(e) => setEnableMinOrder(e.target.checked)} />
                  Enable
                </label>
              </div>
              <Input type="number" placeholder={enableMinOrder ? '0' : 'Disabled'} disabled={!enableMinOrder} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Max Usage</label>
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" checked={enableMaxUsage} onChange={(e) => setEnableMaxUsage(e.target.checked)} />
                  Enable
                </label>
              </div>
              <Input type="number" placeholder={enableMaxUsage ? '0' : 'Disabled'} disabled={!enableMaxUsage} />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Promotion</button>
          </div>
        </div>
      </div>
    </div>
  );
}


