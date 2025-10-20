"use client";

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function AdminLayout({ 
  children, 
  title = "Admin Panel",
  description = "Manage your bakery operations"
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar - Fixed height to cover full remaining viewport */}
        <div className="flex-shrink-0">
          <AdminSidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={toggleSidebar} 
          />
        </div>
        
        {/* Main Content with consistent margin from sidebar */}
        <div className="flex-1 flex flex-col min-h-0 ml-6">
          <div className="flex-1 py-8">
            <div className="max-w-7xl mx-auto px-4 h-full">
              
              {/* Page Content */}
              <div className="bg-white rounded-lg shadow-sm h-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
