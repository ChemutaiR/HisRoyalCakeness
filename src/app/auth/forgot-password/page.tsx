"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { forgotPasswordSchema } from '@/lib/validation/auth';
import authApi from '@/services/auth/authApi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addNotification = (notification: { type: string; title: string; message: string; duration?: number }) => {
    // placeholder notification system
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) {
      const msg = parsed.error.flatten().fieldErrors.email?.[0] || 'Invalid email';
      setError(msg);
      return;
    }
    setError(null);
    setIsLoading(true);
    const res = await authApi.requestPasswordReset(email);
    setIsLoading(false);
    if (res.success) {
      addNotification({ type: 'success', title: 'Email Sent', message: 'If an account exists, a reset link was sent.' });
      router.push('/auth/login');
    } else {
      addNotification({ type: 'info', title: 'Check Your Email', message: 'If an account exists, a reset link was sent.' });
      router.push('/auth/login');
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl p-10 md:p-12">
      <h1 className="text-2xl font-bold mb-6 text-left">Forgot Password</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="relative pt-2">
          <input
            id="email"
            type="email"
            className={`peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-base focus:outline-none focus:ring-0 focus:border-[#c7b8ea] transition-all`}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <label
            htmlFor="email"
            className={`absolute left-0 top-2 text-gray-500 text-sm font-normal pointer-events-none transition-all duration-200
              peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[#c7b8ea]
              ${email ? '-top-4 text-sm text-[#c7b8ea]' : ''}`}
          >
            Email
          </label>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#c7b8ea] text-black text-base font-semibold py-2 rounded-full hover:bg-[#c7b8ea]/80 transition-colors shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'Send reset link'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/auth/login')}
          className="w-full text-sm text-gray-600 hover:text-gray-800 underline mt-2"
        >
          Back to login
        </button>
      </form>
    </div>
  );
}


