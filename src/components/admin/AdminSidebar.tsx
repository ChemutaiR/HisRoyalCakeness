"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Package,
  BarChart3,
  Cake,
  Users,
  BookOpen,
  Tag,
  Star,
  Settings,
  UserCheck,
  Home
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Home,
    current: false
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: Package,
    current: false,
    children: [
      { name: 'Manage Orders', href: '/admin/orders' },
      { name: 'Order History', href: '/admin/orders/history' }
    ]
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    current: false
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: Cake,
    current: false
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: Users,
    current: false
  },
  {
    name: 'Recipes',
    href: '/admin/recipes',
    icon: BookOpen,
    current: false
  },
  {
    name: 'Promotions',
    href: '/admin/promotions',
    icon: Tag,
    current: false
  },
  {
    name: 'Reviews',
    href: '/admin/reviews',
    icon: Star,
    current: false,
    children: [
      { name: 'All Reviews', href: '/admin/reviews' },
      { name: 'Moderation', href: '/admin/reviews/moderation' }
    ]
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    current: false,
    children: [
      { name: 'General', href: '/admin/settings' },
      { name: 'Business', href: '/admin/settings/business' },
      { name: 'Delivery', href: '/admin/settings/delivery' },
      { name: 'Payment', href: '/admin/settings/payment' },
      { name: 'Notifications', href: '/admin/settings/notifications' }
    ]
  },
  {
    name: 'Staff',
    href: '/admin/staff',
    icon: UserCheck,
    current: false,
    children: [
      { name: 'All Staff', href: '/admin/staff' },
      { name: 'Permissions', href: '/admin/staff/permissions' }
    ]
  }
];

export default function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const hasActiveChild = (children: any[]) => {
    return children.some(child => isActive(child.href));
  };

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full min-h-screen`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#c7b8ea] rounded-lg flex items-center justify-center">
              <Cake className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-lg">Admin</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.href);
            const hasActiveChildItem = item.children ? hasActiveChild(item.children) : false;
            const isExpanded = expandedItems.includes(item.name);
            const shouldShowAsActive = isItemActive || hasActiveChildItem;

            return (
              <li key={item.name}>
                <div>
                  <div className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    shouldShowAsActive
                      ? 'bg-[#c7b8ea] text-black'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}>
                    <Link
                      href={item.href}
                      className="flex items-center flex-1"
                    >
                      <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                      {!isCollapsed && (
                        <span className="flex-1">{item.name}</span>
                      )}
                    </Link>
                    {!isCollapsed && item.children && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleExpanded(item.name);
                        }}
                        className="ml-2 p-1 rounded hover:bg-gray-700"
                      >
                        {isExpanded ? (
                          <ChevronLeft className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  {/* Submenu */}
                  {item.children && !isCollapsed && isExpanded && (
                    <ul className="mt-1 ml-6 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive(child.href)
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed && (
          <div className="text-xs text-gray-400 text-center">
            His Royal Cake Ness
            <br />
            Admin Panel
          </div>
        )}
      </div>
    </div>
  );
}
