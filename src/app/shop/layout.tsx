'use client';
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCatalogStore } from '@/store/slices/shop/catalog';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadCakes, loading } = useCatalogStore();

  // Load catalog data when the layout mounts
  useEffect(() => {
    if (!loading) {
      loadCakes();
    }
  }, [loadCakes, loading]);

  return (
    <div className="min-h-screen bg-gray-50 font-work-sans flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
