"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import ReviewModeration from '@/components/admin/reviews/ReviewModeration';

export default function ReviewModerationPage() {
  return (
    <AdminLayout 
      title="Review Moderation" 
      description="Moderate and manage customer reviews before they go live"
    >
      <ReviewModeration />
    </AdminLayout>
  );
}
