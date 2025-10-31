import { useEffect, useState, useCallback } from 'react';
import profileApi from '@/services/profile/profileApi';
import { UserProfile, AccountSettings, ProfileUpdateRequest } from '@/types/profile';
import { profileUpdateSchema, accountSettingsSchema, passwordChangeSchema } from '@/lib/validation/profile';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<AccountSettings | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await profileApi.getProfile();
    if (res.success && res.data) {
      setProfile(res.data.profile);
      setSettings(res.data.settings);
    } else {
      setError(res.error || 'Failed to load profile');
    }
    const ordersRes = await profileApi.getOrders();
    if (ordersRes.success && ordersRes.data) {
      setOrders(ordersRes.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function saveProfile(data: ProfileUpdateRequest) {
    const parsed = profileUpdateSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors };
    }
    const res = await profileApi.updateProfile(parsed.data);
    if (res.success && res.data) {
      setProfile(res.data);
      return { success: true };
    }
    return { success: false, error: res.error };
  }

  async function saveSettings(data: AccountSettings) {
    const parsed = accountSettingsSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors };
    }
    const res = await profileApi.updateSettings(parsed.data);
    if (res.success && res.data) {
      setSettings(res.data);
      return { success: true };
    }
    return { success: false, error: res.error };
  }

  async function changePassword(data: { currentPassword: string; newPassword: string; confirmPassword: string }) {
    const parsed = passwordChangeSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors };
    }
    const res = await profileApi.updatePassword({ currentPassword: parsed.data.currentPassword, newPassword: parsed.data.newPassword });
    return { success: !!res.success, error: res.error };
  }

  async function uploadAvatar(file: File) {
    const res = await profileApi.updateAvatar(file);
    if (res.success && res.data && profile) {
      setProfile({ ...profile, avatarUrl: res.data.avatarUrl });
      return { success: true };
    }
    return { success: false, error: res.error };
  }

  return {
    profile,
    settings,
    orders,
    loading,
    error,
    reload: load,
    saveProfile,
    saveSettings,
    changePassword,
    uploadAvatar,
  };
}

export default useProfile;


