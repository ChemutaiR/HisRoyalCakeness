"use client";

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

export default function NotificationsSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    customerReviews: true,
    lowStock: true,
    dailyReports: false,
    weeklyReports: true
  });

  const [smsNotifications, setSmsNotifications] = useState({
    newOrders: true,
    urgentOrders: true,
    deliveryUpdates: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    systemAlerts: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    quietHours: { enabled: true, start: '22:00', end: '08:00' },
    emailFrequency: 'immediate',
    smsEnabled: true,
    pushEnabled: true
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleEmailNotificationChange = (key: string, value: boolean) => {
    setEmailNotifications(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSmsNotificationChange = (key: string, value: boolean) => {
    setSmsNotifications(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handlePushNotificationChange = (key: string, value: boolean) => {
    setPushNotifications(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleNotificationSettingsChange = (field: string, value: string | boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleQuietHoursChange = (updates: { enabled?: boolean; start?: string; end?: string }) => {
    setNotificationSettings(prev => ({
      ...prev,
      quietHours: { ...prev.quietHours, ...updates }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // console.log('Saving notification settings:', {
    //   emailNotifications,
    //   smsNotifications,
    //   pushNotifications,
    //   notificationSettings
    // });
    setHasChanges(false);
  };

  return (
    <AdminLayout 
      title="Notification Settings" 
      description="Configure email, SMS, and push notifications"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Notification Settings</h2>
            <p className="text-gray-600">Manage how and when you receive notifications about your bakery.</p>
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

        {/* Email Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-lg font-semibold text-gray-800">Email Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'newOrders', label: 'New Orders', description: 'Get notified when new orders are placed' },
              { key: 'orderUpdates', label: 'Order Updates', description: 'Receive updates when order status changes' },
              { key: 'customerReviews', label: 'Customer Reviews', description: 'Get notified of new customer reviews' },
              { key: 'lowStock', label: 'Low Stock Alerts', description: 'Receive alerts when inventory is low' },
              { key: 'dailyReports', label: 'Daily Reports', description: 'Receive daily sales and performance reports' },
              { key: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly summary reports' }
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{item.label}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={emailNotifications[item.key as keyof typeof emailNotifications]}
                    onChange={(e) => handleEmailNotificationChange(item.key, e.target.checked)}
                    className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                  />
                  <span className="text-sm text-gray-600">Enabled</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-lg font-semibold text-gray-800">SMS Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'newOrders', label: 'New Orders', description: 'Get SMS alerts for new orders' },
              { key: 'urgentOrders', label: 'Urgent Orders', description: 'Receive SMS for urgent or large orders' },
              { key: 'deliveryUpdates', label: 'Delivery Updates', description: 'Get SMS updates about delivery status' }
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{item.label}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={smsNotifications[item.key as keyof typeof smsNotifications]}
                    onChange={(e) => handleSmsNotificationChange(item.key, e.target.checked)}
                    className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                  />
                  <span className="text-sm text-gray-600">Enabled</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-lg font-semibold text-gray-800">Push Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'newOrders', label: 'New Orders', description: 'Get push notifications for new orders' },
              { key: 'orderUpdates', label: 'Order Updates', description: 'Receive push updates when order status changes' },
              { key: 'systemAlerts', label: 'System Alerts', description: 'Get push notifications for system alerts' }
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{item.label}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pushNotifications[item.key as keyof typeof pushNotifications]}
                    onChange={(e) => handlePushNotificationChange(item.key, e.target.checked)}
                    className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                  />
                  <span className="text-sm text-gray-600">Enabled</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-lg font-semibold text-gray-800">General Settings</h3>
          </div>
          <div className="space-y-6">
            {/* Quiet Hours */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Quiet Hours</h4>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={notificationSettings.quietHours.enabled}
                    onChange={(e) => handleQuietHoursChange({ enabled: e.target.checked })}
                    className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                  />
                  <span className="text-sm text-gray-600">Enable quiet hours</span>
                </label>
                {notificationSettings.quietHours.enabled && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={notificationSettings.quietHours.start}
                      onChange={(e) => handleQuietHoursChange({ start: e.target.value })}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={notificationSettings.quietHours.end}
                      onChange={(e) => handleQuietHoursChange({ end: e.target.value })}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Email Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Frequency</label>
              <select
                value={notificationSettings.emailFrequency}
                onChange={(e) => handleNotificationSettingsChange('emailFrequency', e.target.value)}
                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
              >
                <option value="immediate">Immediate</option>
                <option value="hourly">Hourly Digest</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
              </select>
            </div>

            {/* Global Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={notificationSettings.smsEnabled}
                  onChange={(e) => handleNotificationSettingsChange('smsEnabled', e.target.checked)}
                  className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                />
                <span className="text-sm text-gray-600">Enable SMS notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={notificationSettings.pushEnabled}
                  onChange={(e) => handleNotificationSettingsChange('pushEnabled', e.target.checked)}
                  className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                />
                <span className="text-sm text-gray-600">Enable push notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}