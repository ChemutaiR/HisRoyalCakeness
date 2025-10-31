"use client";

import { RefObject } from 'react';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PromotionImageUpload from './PromotionImageUpload';
import PromotionCakeSelector from './PromotionCakeSelector';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

interface EditPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotion: any;
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

  // Status
  status: string;
  setStatus: (v: string) => void;
}

export default function EditPromotionModal({
  isOpen,
  onClose,
  promotion,
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
  status,
  setStatus,
}: EditPromotionModalProps) {
  if (!isOpen || !promotion) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Edit Promotion</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Trash2 size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Name</label>
            <Input type="text" defaultValue={promotion.name} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              defaultValue={promotion.description}
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
            initialPreview={promotion?.image || null}
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
              <Input type="number" defaultValue={promotion.discountValue} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <Input type="date" defaultValue={promotion.startDate} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <Input type="date" defaultValue={promotion.endDate} />
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
              <Input type="number" defaultValue={promotion.minOrderValue} disabled={!enableMinOrder} placeholder={enableMinOrder ? '0' : 'Disabled'} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Max Usage</label>
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" checked={enableMaxUsage} onChange={(e) => setEnableMaxUsage(e.target.checked)} />
                  Enable
                </label>
              </div>
              <Input type="number" defaultValue={promotion.maxUsage} disabled={!enableMaxUsage} placeholder={enableMaxUsage ? '0' : 'Disabled'} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <span className="truncate">{status}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}


