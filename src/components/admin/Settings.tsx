"use client";

import { useState } from 'react';
import { Save, Globe, CreditCard, Truck, Bell, Shield, Users, Zap } from 'lucide-react';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('business-info');

  const settingsSections = [
    { id: 'business-info', name: 'Business Info', icon: Globe },
    { id: 'payment-billing', name: 'Payment & Billing', icon: CreditCard },
    { id: 'order-delivery', name: 'Order & Delivery', icon: Truck },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'website-seo', name: 'Website & SEO', icon: Globe },
    { id: 'security-privacy', name: 'Security & Privacy', icon: Shield },
    { id: 'staff-access', name: 'Staff & Access', icon: Users },
    { id: 'integrations', name: 'Integrations', icon: Zap }
  ];

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="His Royal Cakeness" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="info@hisroyalcakeness.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="+254 700 123 456" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="123 Cake Street, Nairobi, Kenya" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">About Us</label>
            <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="We are a premium cake bakery specializing in custom-designed cakes for all occasions. Our master bakers create delicious, beautiful cakes that make every celebration special."></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Hours & Delivery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monday - Friday</span>
                <input type="text" className="w-32 px-2 py-1 border border-gray-300 rounded text-sm" defaultValue="9:00 AM - 8:00 PM" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Saturday</span>
                <input type="text" className="w-32 px-2 py-1 border border-gray-300 rounded text-sm" defaultValue="9:00 AM - 6:00 PM" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sunday</span>
                <input type="text" className="w-32 px-2 py-1 border border-gray-300 rounded text-sm" defaultValue="10:00 AM - 4:00 PM" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Settings</label>
            <div className="space-y-3">
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Same Day Delivery</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Next Day Delivery</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Express Delivery (2-3 hours)</span>
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Minimum Order Value</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentBilling = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment & Billing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Methods</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Credit/Debit Cards</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">UPI Payments</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Digital Wallets (Paytm, PhonePe)</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Cash on Delivery</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Settings</label>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">GST Rate (%)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="18" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">GST Number</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="27ABCDE1234F1Z5" />
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Show GST breakdown on invoices</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Banking Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="Equity Bank" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="1234567890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="EQUI0001234" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="His Royal Cakeness" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrderDelivery = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Processing</label>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Minimum Order Value (KES)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Order Lead Time (hours)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="24" />
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Allow custom cake orders</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Require advance payment</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Zones</label>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Local Delivery (0-5 km)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="200" />
                <span className="text-xs text-gray-500">Delivery fee in KES</span>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Extended Delivery (5-15 km)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="400" />
                <span className="text-xs text-gray-500">Delivery fee in KES</span>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Express Delivery Fee</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="800" />
                <span className="text-xs text-gray-500">Additional fee for 2-3 hour delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Partners</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Bolt Food</h4>
              <p className="text-sm text-gray-600">Fast food delivery service</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Jumia Food</h4>
              <p className="text-sm text-gray-600">Online food delivery platform</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">In-house Delivery</h4>
              <p className="text-sm text-gray-600">Own delivery team</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">New Order Notifications</h4>
              <p className="text-sm text-gray-600">Get notified when new orders are placed</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Order Status Updates</h4>
              <p className="text-sm text-gray-600">Notify customers about order progress</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Low Stock Alerts</h4>
              <p className="text-sm text-gray-600">Get notified when ingredients are running low</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Customer Reviews</h4>
              <p className="text-sm text-gray-600">Get notified when customers leave reviews</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">SMS Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Order Confirmations</h4>
              <p className="text-sm text-gray-600">Send SMS when orders are confirmed</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Delivery Updates</h4>
              <p className="text-sm text-gray-600">Send SMS for delivery status updates</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWebsiteSEO = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Website & SEO</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website Title</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="His Royal Cakeness - Premium Custom Cakes in Nairobi" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
            <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" defaultValue="Order delicious custom cakes for birthdays, weddings, and special occasions. Premium quality cakes delivered across Nairobi. Best cake bakery in Kenya."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" placeholder="G-XXXXXXXXXX" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Business Profile</label>
            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" placeholder="https://business.google.com/..." />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media & Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Links</label>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Facebook</label>
                <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Instagram</label>
                <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" placeholder="https://instagram.com/..." />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Twitter</label>
                <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]" placeholder="https://twitter.com/..." />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Third-party Integrations</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">WhatsApp Business</h4>
                  <p className="text-sm text-gray-600">Connect WhatsApp for customer support</p>
                </div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Connected</span>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Google My Business</h4>
                  <p className="text-sm text-gray-600">Sync with Google Business Profile</p>
                </div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Connected</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-[#c7b8ea] text-black rounded-md text-sm font-semibold hover:bg-[#c7b8ea]/80 transition-colors">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Session Timeout</h4>
              <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>Never</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Login Notifications</h4>
              <p className="text-sm text-gray-600">Get notified of new login attempts</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Data Collection</h4>
              <p className="text-sm text-gray-600">Allow collection of analytics data</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Cookie Consent</h4>
              <p className="text-sm text-gray-600">Show cookie consent banner to visitors</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">GDPR Compliance</h4>
              <p className="text-sm text-gray-600">Enable GDPR compliance features</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaffAccess = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Staff Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <span className="text-white font-medium">JD</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">John Doe</h4>
                <p className="text-sm text-gray-600">Baker</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                <span className="text-white font-medium">JS</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Jane Smith</h4>
                <p className="text-sm text-gray-600">Manager</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                <span className="text-white font-medium">MJ</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Mike Johnson</h4>
                <p className="text-sm text-gray-600">Delivery</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-[#c7b8ea] text-black rounded-md text-sm font-semibold hover:bg-[#c7b8ea]/80 transition-colors">
          Add New Staff Member
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Access Permissions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Order Management</h4>
              <p className="text-sm text-gray-600">Allow staff to view and manage orders</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>All Staff</option>
              <option>Managers Only</option>
              <option>Bakers Only</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Inventory Management</h4>
              <p className="text-sm text-gray-600">Allow staff to update inventory</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Managers Only</option>
              <option>All Staff</option>
              <option>Bakers Only</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Customer Data</h4>
              <p className="text-sm text-gray-600">Allow staff to view customer information</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option>Managers Only</option>
              <option>All Staff</option>
              <option>None</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Integrations</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">M-Pesa</h4>
                <p className="text-sm text-gray-600">Mobile money payment gateway</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Configure</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">P</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">PayPal</h4>
                <p className="text-sm text-gray-600">International payment processing</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Not Connected</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Connect</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Stripe</h4>
                <p className="text-sm text-gray-600">Credit card payment processing</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Configure</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Marketing Integrations</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Mailchimp</h4>
                <p className="text-sm text-gray-600">Email marketing automation</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Not Connected</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Connect</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">F</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Facebook Pixel</h4>
                <p className="text-sm text-gray-600">Facebook advertising tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Configure</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'business-info':
        return renderBusinessInfo();
      case 'payment-billing':
        return renderPaymentBilling();
      case 'order-delivery':
        return renderOrderDelivery();
      case 'notifications':
        return renderNotifications();
      case 'website-seo':
        return renderWebsiteSEO();
      case 'security-privacy':
        return renderSecurityPrivacy();
      case 'staff-access':
        return renderStaffAccess();
      case 'integrations':
        return renderIntegrations();
      default:
        return renderBusinessInfo();
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Business Settings</h2>
          <p className="text-gray-600 text-base">Manage your business information, payment methods, and website settings.</p>
        </div>
        <button className="px-6 py-2 bg-[#c7b8ea] text-black rounded-md font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
      
      {/* Settings Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                      activeSection === section.id
                        ? 'bg-[#c7b8ea] text-black font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {section.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 