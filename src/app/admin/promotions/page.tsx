"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import Promotions from '@/components/admin/promotions/Promotions';

export default function PromotionsPage() {
  return (
    <AdminLayout 
      title="Promotions" 
      description="Create and manage discounts and promotions"
    >
      <Promotions />
    </AdminLayout>
  );
}
