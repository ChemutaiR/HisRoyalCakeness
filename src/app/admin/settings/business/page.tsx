"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, Globe, Clock, Phone, Instagram, AlertCircle, Loader2, Edit, X } from 'lucide-react';
import { BusinessInfo, BusinessHours } from '@/types/admin/settings';
import { useSettings } from '@/hooks/admin/useSettings';
import { businessFormSchema } from '@/lib/validation';

export default function BusinessSettingsPage() {
  const {
    businessInfo,
    businessHours,
    isLoading,
    isUpdating,
    hasError,
    errorMessage,
    lastSaved: _lastSaved,
    canSave,
    phoneValidation,
    socialMediaValidation,
    updateSettings,
    setField,
    setBusinessHours,
    clearError,
    resetForm
  } = useSettings();

  const [formData, setFormData] = useState<BusinessInfo & { businessHours: BusinessHours }>({
    phoneNumber: '',
    socialMedia: '',
    businessHours: {
      monday: { open: '08:00', close: '18:00', closed: false },
      tuesday: { open: '08:00', close: '18:00', closed: false },
      wednesday: { open: '08:00', close: '18:00', closed: false },
      thursday: { open: '08:00', close: '18:00', closed: false },
      friday: { open: '08:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '20:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: false }
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  // Sync form data with store data
  useEffect(() => {
    if (businessInfo && businessHours) {
      setFormData({
        phoneNumber: businessInfo.phoneNumber,
        socialMedia: businessInfo.socialMedia,
        businessHours: businessHours
      });
    }
  }, [businessInfo, businessHours]);

  const handleInputChange = (field: keyof BusinessInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setField(field, value);
  };

  const handleHoursChange = (day: string, field: string, value: string | boolean) => {
    const updatedHours = {
      ...formData.businessHours[day as keyof BusinessHours],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: updatedHours
      }
    }));
    
    setBusinessHours(day as keyof BusinessHours, updatedHours);
  };

  const handleSave = async () => {
    try {
      // Validate form data with Zod before saving
      const validationResult = businessFormSchema.safeParse(formData);
      
      if (!validationResult.success) {
        // Validation failed - could show user-friendly error messages here
        return;
      }
      
      await updateSettings(formData);
      setIsEditing(false);
      resetForm();
    } catch (error) {
      // Handle save error - could show user notification here
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    if (businessInfo && businessHours) {
      setFormData({
        phoneNumber: businessInfo.phoneNumber,
        socialMedia: businessInfo.socialMedia,
        businessHours: businessHours
      });
    }
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <AdminLayout 
      title="Business Settings" 
      description="Configure your business information and details"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-medium text-gray-800 tracking-wide mb-0.5">Business Information</h2>
            <p className="text-sm text-gray-500 leading-relaxed">Update your business details and contact information.</p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                {canSave && (
                  <button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isUpdating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {hasError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-2 mb-6">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-600 text-sm">{errorMessage}</p>
            </div>
            <button
              onClick={clearError}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-center space-x-2 mb-6">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            <p className="text-blue-800">Loading business settings...</p>
          </div>
        )}

        {/* Business Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-sm font-medium text-gray-800 tracking-wide">Basic Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="tel" 
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  readOnly={!isEditing}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    !isEditing 
                      ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                      : phoneValidation.isValid 
                        ? 'border-gray-300 focus:ring-[#c7b8ea]' 
                        : 'border-red-300 focus:ring-red-500'
                  }`}
                />
                {!phoneValidation.isValid && phoneValidation.message && (
                  <p className="text-red-600 text-sm mt-1">{phoneValidation.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Social Media</label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  value={formData.socialMedia}
                  onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                  readOnly={!isEditing}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    !isEditing 
                      ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                      : socialMediaValidation.isValid 
                        ? 'border-gray-300 focus:ring-[#c7b8ea]' 
                        : 'border-red-300 focus:ring-red-500'
                  }`}
                  placeholder="@username"
                />
                {!socialMediaValidation.isValid && socialMediaValidation.message && (
                  <p className="text-red-600 text-sm mt-1">{socialMediaValidation.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-sm font-medium text-gray-800 tracking-wide">Business Hours</h3>
          </div>
          <div className="space-y-4">
            {days.map(day => {
              const dayData = formData.businessHours[day.key as keyof typeof formData.businessHours];
              return (
                <div key={day.key} className="flex items-center gap-4">
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700">{day.label}</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!dayData.closed}
                      onChange={(e) => handleHoursChange(day.key, 'closed', !e.target.checked)}
                      className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                    />
                    <span className="text-sm text-gray-600">Open</span>
                  </div>
                  {!dayData.closed && (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={dayData.open}
                        onChange={(e) => handleHoursChange(day.key, 'open', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={dayData.close}
                        onChange={(e) => handleHoursChange(day.key, 'close', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                      />
                    </div>
                  )}
                  {dayData.closed && (
                    <span className="text-sm text-gray-500">Closed</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}