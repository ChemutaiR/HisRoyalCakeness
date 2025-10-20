"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// State management imports removed - will be replaced with Redux

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // TODO: Replace with Redux state management
  const login = async (credentials: { email: string; password: string }) => {
    // Temporary placeholder - will be replaced with actual auth logic
    // console.log('Login attempt:', credentials);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };
  
  const addNotification = (notification: { type: string; title: string; message: string; duration?: number }) => {
    // Temporary placeholder - will be replaced with actual notification system
    // console.log('Notification:', notification);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({
        email: form.email,
        password: form.password
      });
      
      addNotification({
        type: 'success',
        title: 'Welcome back!',
        message: 'You have been successfully logged in',
        duration: 3000
      });
      
      router.push('/');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: 'Invalid email or password. Please try again.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl p-10 md:p-12">
      <h1 className="text-2xl font-bold mb-6 text-left">Login</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="relative pt-2">
          <input
            id="email"
            type="text"
            className={`peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-base focus:outline-none focus:ring-0 focus:border-[#c7b8ea] transition-all`}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            autoComplete="username"
          />
          <label
            htmlFor="email"
            className={`absolute left-0 top-2 text-gray-500 text-sm font-normal pointer-events-none transition-all duration-200
              peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[#c7b8ea]
              ${form.email ? '-top-4 text-sm text-[#c7b8ea]' : ''}`}
          >
            Username or Email
          </label>
        </div>
        <div className="relative pt-2">
          <input
            id="password"
            type="password"
            className={`peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-base focus:outline-none focus:ring-0 focus:border-[#c7b8ea] transition-all`}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            autoComplete="current-password"
          />
          <label
            htmlFor="password"
            className={`absolute left-0 top-2 text-gray-500 text-sm font-normal pointer-events-none transition-all duration-200
              peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[#c7b8ea]
              ${form.password ? '-top-4 text-sm text-[#c7b8ea]' : ''}`}
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#c7b8ea] text-black text-base font-semibold py-2 rounded-full hover:bg-[#c7b8ea]/80 transition-colors shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
} 