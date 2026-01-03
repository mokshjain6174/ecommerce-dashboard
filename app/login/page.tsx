"use client";

import { login } from "@/lib/actions/auth.actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";

/**
 * SubmitButton Component
 * Separation Requirement: We extract this into a sub-component so we can use
 * the `useFormStatus` hook to detect when the parent <form> is submitting.
 */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
    >
      {pending ? "Checking..." : "Login to Dashboard"}
    </button>
  );
}

export default function LoginPage() {
  const [error, setError] = useState("");
  /**
   * Handle Form Submission
   * Bridges the Client Event to the Server Action.
   * If the login fails, the server returns an error object which we display.
   */

  const handleSubmit = async (formData: FormData) => {
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            AP
          </div>
        </div>
        {/* --- Header Text --- */}
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">Welcome Back</h1>
        <p className="text-slate-400 text-center mb-8 text-sm">Enter your admin credentials to access</p>
        {/* --- Login Form --- */}
        <form action={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
              placeholder="Enter your email" 
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
              ⚠ {error}
            </div>
          )}

          {/* Submit Button (contains loading state logic) */}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}