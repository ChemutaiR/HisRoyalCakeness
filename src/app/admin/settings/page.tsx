"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to business settings as the main settings page
    router.replace('/admin/settings/business');
  }, [router]);

  return null;
}
