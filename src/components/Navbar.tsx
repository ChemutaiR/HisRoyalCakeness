'use client';

import { Search, User, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/shop/useCart';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Get cart data for cart indicator
  const { totalItems, toggleCart: _toggleCart } = useCart();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/logo3.png"
              alt="His Royal Cakeness Logo"
              width={280}
              height={70}
              className="h-14 w-auto"
              priority
            />
            <span className="ml-4 text-white text-lg font-pacifico">His Royal Cakeness</span>
          </Link>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Search className="h-6 w-6 text-white" />
            </button>
            <div className="relative">
              <button
                ref={userButtonRef}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <User className="h-6 w-6 text-white" />
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50 py-2 flex flex-col font-work-sans"
                >
                  <Link
                    href="/admin"
                    className="px-4 py-2 text-left rounded hover:bg-[#c7b8ea] hover:text-black transition-colors block"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Admin
                  </Link>
                  <button
                    className="px-4 py-2 text-left rounded hover:bg-[#c7b8ea] hover:text-black transition-colors"
                    onClick={() => { setDropdownOpen(false); router.push('/auth/signup'); }}
                  >
                    Create Account
                  </button>
                  <button
                    className="px-4 py-2 text-left rounded hover:bg-[#c7b8ea] hover:text-black transition-colors"
                    onClick={() => { setDropdownOpen(false); router.push('/auth/login'); }}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
            <button
              className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
              onClick={() => router.push('/shop/cart')}
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingCart className="h-6 w-6 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c7b8ea] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 