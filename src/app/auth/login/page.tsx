"use client";

import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl p-10 md:p-12">
      <h1 className="text-2xl font-bold mb-6 text-left">Login</h1>
      <form className="space-y-6">
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
          className="w-full bg-[#c7b8ea] text-black text-base font-semibold py-2 rounded-full hover:bg-[#c7b8ea]/80 transition-colors shadow"
        >
          Login
        </button>
      </form>
    </div>
  );
} 