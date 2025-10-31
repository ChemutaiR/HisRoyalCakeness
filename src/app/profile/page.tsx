'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useProfile from '@/hooks/profile/useProfile';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Loader2, Upload, X } from 'lucide-react';

export default function ProfilePage() {
  const { profile, settings, orders, loading, error, saveProfile, saveSettings, changePassword, uploadAvatar, reload } = useProfile();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [pwd, setPwd] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setPhone(profile.phone || '');
    }
    if (settings) {
      setEmailNotifications(settings.emailNotifications);
      setSmsNotifications(settings.smsNotifications);
      setMarketingOptIn(settings.marketingOptIn);
    }
  }, [profile, settings]);

  async function onSaveProfile() {
    setSaving(true);
    await saveProfile({ firstName, lastName, phone });
    setSaving(false);
  }

  async function onSaveSettings() {
    setSettingsSaving(true);
    await saveSettings({ emailNotifications, smsNotifications, marketingOptIn });
    setSettingsSaving(false);
  }

  async function onChangePassword() {
    setPwdSaving(true);
    await changePassword(pwd);
    setPwdSaving(false);
  }

  async function onPickAvatar(file: File) {
    await uploadAvatar(file);
  }

  return (
    <main className="min-h-screen bg-white text-black font-work-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600 mb-6">Manage your account details, orders, and preferences.</p>

        {loading && (
          <div className="flex items-center gap-2 text-gray-600"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
        )}
        {error && (
          <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Profile and Settings */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Account Information</h2>
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                      {profile?.avatarUrl ? (
                        <Image src={profile.avatarUrl} alt="Avatar" width={96} height={96} className="h-24 w-24 object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">No Avatar</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                        const f = e.target.files && e.target.files[0];
                        if (f) onPickAvatar(f);
                      }} />
                      <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}><Upload className="w-4 h-4 mr-2" />Change</Button>
                      {profile?.avatarUrl && (
                        <Button variant="ghost" size="sm" onClick={() => uploadAvatar(new File([], ''))}><X className="w-4 h-4 mr-2" />Remove</Button>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 700 000 000" />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={onSaveProfile} disabled={saving}>{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}</Button>
                </div>
              </div>

              {/* Settings Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2"><input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} /> Email Notifications</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={smsNotifications} onChange={(e) => setSmsNotifications(e.target.checked)} /> SMS Notifications</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} /> Marketing Opt-in</label>
                </div>
                <div className="mt-4">
                  <Button onClick={onSaveSettings} disabled={settingsSaving}>{settingsSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Settings'}</Button>
                </div>
              </div>

              {/* Password Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <Input type="password" value={pwd.currentPassword} onChange={(e) => setPwd({ ...pwd, currentPassword: e.target.value })} placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <Input type="password" value={pwd.newPassword} onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })} placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <Input type="password" value={pwd.confirmPassword} onChange={(e) => setPwd({ ...pwd, confirmPassword: e.target.value })} placeholder="••••••••" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={onChangePassword} disabled={pwdSaving}>{pwdSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}</Button>
                </div>
              </div>
            </div>

            {/* Right: Orders */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Order History</h2>
                <div className="space-y-3">
                  {orders && orders.length > 0 ? orders.slice(0, 6).map((o, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-900 font-medium">Order #{o.id || o.orderNumber || '—'}</div>
                        <div className="text-xs text-gray-600">{o.status || '—'}</div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{o.date || o.createdAt || ''}</div>
                      <div className="text-sm text-gray-900 mt-1">KES {o.total ? Number(o.total).toLocaleString() : '—'}</div>
                    </div>
                  )) : (
                    <div className="text-sm text-gray-600">No orders yet.</div>
                  )}
                </div>
                <div className="mt-4"><Button variant="outline" onClick={() => reload()}>Refresh</Button></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}


