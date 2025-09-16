// src/Components/auth/EmailInput.jsx
import React from "react";

const EmailInput = ({ value, onChange, error, isLoading }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-blue-200 mb-1"
      >
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
        placeholder="Enter your email"
        disabled={isLoading}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EmailInput;
