// src/Components/auth/EmailInput.jsx
import React from "react";

const EmailInput = ({ value, onChange, error, isLoading }) => {
  return (
    <div className="w-full">
      <label
    htmlFor="phone"
    className="block text-left text-sm font-semibold text-black"
  >
    Email Address
  </label>
      <input
        type="email"
        id="email"
        name="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-3 rounded-lg transition-all duration-200
          bg-white text-black placeholder-slate-800
          border ${error ? "border-red-500 focus:ring-red-500" : "border-yellow-400 focus:ring-yellow-400"}
          focus:outline-none focus:ring-2
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        placeholder="Enter your email"
        disabled={isLoading}
      />
      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
    </div>
  );
};

export default EmailInput;
