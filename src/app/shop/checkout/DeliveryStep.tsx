'use client';

import { format, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DeliveryZoneSelector } from '@/components/checkout/DeliveryZoneSelector';
import { DeliveryZone } from '@/types/shop/delivery';
import { CheckoutFormData } from '@/types/orders/order';
import { Address } from '@/types/shared/order';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface DeliveryStepProps {
  formData: CheckoutFormData;
  deliveryZones: DeliveryZone[];
  updateFormData: (data: Partial<CheckoutFormData>) => void;
  getFieldError: (fieldName: string) => string;
  markFieldTouched: (fieldName: string) => void;
}

export default function DeliveryStep({
  formData,
  deliveryZones,
  updateFormData,
  getFieldError,
  markFieldTouched,
}: DeliveryStepProps) {
  const handleDeliveryDateChange = (date: Date | null) => {
    if (date) {
      updateFormData({ deliveryDate: format(date, 'yyyy-MM-dd') });
    } else {
      updateFormData({ deliveryDate: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Delivery Zone Selection */}
      <DeliveryZoneSelector
        zones={deliveryZones}
        selectedZoneId={formData.deliveryZone}
        onZoneSelect={(zoneId) => {
          updateFormData({ deliveryZone: zoneId });
          markFieldTouched('deliveryZone');
        }}
        error={getFieldError('deliveryZone')}
      />
      
      {/* Street Address */}
      <div className="space-y-4">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <Input
            type="text"
            id="street"
            placeholder="Enter your street address"
            value={formData.deliveryAddress?.street || ''}
            onChange={(e) => {
              updateFormData({ deliveryAddress: { ...formData.deliveryAddress as Address, street: e.target.value } });
              markFieldTouched('deliveryAddress.street');
            }}
            onBlur={() => markFieldTouched('deliveryAddress.street')}
            className={getFieldError('deliveryAddress.street') 
              ? 'border-red-300 focus:ring-red-500' 
              : ''}
          />
          {getFieldError('deliveryAddress.street') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('deliveryAddress.street')}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <Input
            type="tel"
            id="phone"
            placeholder="0712345678 or +254712345678"
            value={formData.deliveryAddress?.phone || ''}
            onChange={(e) => {
              updateFormData({ deliveryAddress: { ...formData.deliveryAddress as Address, phone: e.target.value } });
              markFieldTouched('deliveryAddress.phone');
            }}
            onBlur={() => markFieldTouched('deliveryAddress.phone')}
            autoComplete="tel"
            className={getFieldError('deliveryAddress.phone') 
              ? 'border-red-300 focus:ring-red-500' 
              : ''}
          />
          {getFieldError('deliveryAddress.phone') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('deliveryAddress.phone')}</p>
          )}
        </div>
        <div>
          <label htmlFor="directions" className="block text-sm font-medium text-gray-700 mb-1">Directions/Landmarks (Optional)</label>
          <textarea
            id="directions"
            placeholder="Describe nearby landmarks, building names, or specific directions to help us find you"
            value={formData.deliveryAddress?.directions || ''}
            onChange={(e) => {
              updateFormData({ deliveryAddress: { ...formData.deliveryAddress as Address, directions: e.target.value } });
              markFieldTouched('deliveryAddress.directions');
            }}
            onBlur={() => markFieldTouched('deliveryAddress.directions')}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              getFieldError('deliveryAddress.directions') 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-[#c7b8ea]'
            }`}
          ></textarea>
          {getFieldError('deliveryAddress.directions') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('deliveryAddress.directions')}</p>
          )}
        </div>
        {/* Delivery Date */}
        <div>
          <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
          <DatePicker
            selected={formData.deliveryDate ? parseISO(formData.deliveryDate) : null}
            onChange={(date) => {
              handleDeliveryDateChange(date);
              markFieldTouched('deliveryDate');
            }}
            onBlur={() => markFieldTouched('deliveryDate')}
            dateFormat="yyyy-MM-dd"
            minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
            placeholderText="Pick delivery date"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              getFieldError('deliveryDate') 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-[#c7b8ea]'
            }`}
          />
          {getFieldError('deliveryDate') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('deliveryDate')}</p>
          )}
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">Why we need advance notice</p>
                <p className="text-blue-800">
                  We require at least 24 hours notice to ensure your cake is freshly baked with the finest ingredients and crafted to perfection. This allows us to deliver the exceptional quality you deserve.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
          <Select
            value={formData.deliveryTime || ''}
            onValueChange={(value) => {
              updateFormData({ deliveryTime: value });
              markFieldTouched('deliveryTime');
            }}
          >
            <SelectTrigger className={`w-full ${
              getFieldError('deliveryTime') 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-[#c7b8ea]'
            }`}>
              <SelectValue placeholder="Select delivery time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">9:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="13:00">1:00 PM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
              <SelectItem value="16:00">4:00 PM</SelectItem>
              <SelectItem value="17:00">5:00 PM</SelectItem>
              <SelectItem value="18:00">6:00 PM</SelectItem>
            </SelectContent>
          </Select>
          {getFieldError('deliveryTime') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('deliveryTime')}</p>
          )}
        </div>
        <div>
          <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
          <textarea
            id="specialInstructions"
            placeholder="Any special delivery instructions or notes"
            value={formData.specialInstructions || ''}
            onChange={(e) => {
              updateFormData({ specialInstructions: e.target.value });
              markFieldTouched('specialInstructions');
            }}
            onBlur={() => markFieldTouched('specialInstructions')}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              getFieldError('specialInstructions') 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-[#c7b8ea]'
            }`}
          ></textarea>
          {getFieldError('specialInstructions') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('specialInstructions')}</p>
          )}
        </div>
      </div>
    </div>
  );
}

