"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import AdminReviews from '@/components/admin/reviews/Reviews';

export default function ReviewsPage() {
  return (
    <AdminLayout 
      title="Reviews" 
      description="Moderate customer reviews and feedback"
    >
      <AdminReviews />
    </AdminLayout>
  );
}
