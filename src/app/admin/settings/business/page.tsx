"use client";

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, Globe, Clock, MapPin, Phone, Mail } from 'lucide-react';

export default function BusinessSettingsPage() {
  const [formData, setFormData] = useState({
    businessName: 'His Royal Cakeness',
    businessEmail: 'info@hisroyalcakeness.com',
    phoneNumber: '+254 700 123 456',
    businessAddress: '123 Cake Street, Nairobi, Kenya',
    aboutUs: 'We are a premium cake bakery specializing in custom-designed cakes for all occasions. Our master bakers create delicious, beautiful cakes that make every celebration special.',
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

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleHoursChange = (day: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    // console.log('Saving business settings:', formData);
    setHasChanges(false);
    // Show success message
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
            <h2 className="text-2xl font-bold mb-2">Business Information</h2>
            <p className="text-gray-600">Update your business details and contact information.</p>
          </div>
          {hasChanges && (
            <button
              onClick={handleSave}
              className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>

        {/* Business Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input 
                type="text" 
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="email" 
                  value={formData.businessEmail}
                  onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="tel" 
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" 
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">About Us</label>
              <textarea 
                rows={4} 
                value={formData.aboutUs}
                onChange={(e) => handleInputChange('aboutUs', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                placeholder="Tell customers about your bakery..."
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-lg font-semibold text-gray-800">Business Hours</h3>
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