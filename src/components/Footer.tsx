"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Clock, Phone } from 'lucide-react';
import { useSettingsStore } from '@/store/slices/admin/settings';
import { formatFooterBusinessHours } from '@/utils/admin/settings/formatting';

const Footer = () => {
  const businessHours = useSettingsStore(state => state.businessHours);
  const businessInfo = useSettingsStore(state => state.businessInfo);
  
  return (
    <footer className="bg-black text-white" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Left Column - Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo3.png" 
                alt="His Royal Cakeness Logo" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-lg font-semibold">His Royal Cakeness</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span>{businessInfo?.phoneNumber || '+123 456 7890'}</span>
              </div>
            </div>
          </div>

          {/* Center Column - Business Hours */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock size={18} />
              <h4 className="text-lg font-semibold">Business Hours</h4>
            </div>
            <div className="text-gray-300 text-sm leading-relaxed" aria-label="Business operating hours">
              {businessHours ? formatFooterBusinessHours(businessHours) : 'Mon-Fri: 8AM-6PM, Sat: 9AM-8PM, Sun: 10AM-4PM'}
            </div>
          </div>

          {/* Right Column - Social & Legal */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <Link 
                  href={businessInfo?.socialMedia ? `https://instagram.com/${businessInfo.socialMedia.replace('@', '')}` : '#'} 
                  className="text-gray-300 hover:text-white transition-colors" 
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
              </div>
              {businessInfo?.socialMedia && (
                <p className="text-gray-400 text-sm">{businessInfo.socialMedia}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} His Royal Cakeness. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 