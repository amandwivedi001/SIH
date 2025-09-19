import React from "react";

const PhoneInput = ({ value, onChange, error, isLoading }) => {
    const handleChange = (val) => {
        if (/^\d{0,10}$/.test(val)) {
            onChange(val);
        }
    };

    return (
        <div className="space-y-2 relative">
            <label
                htmlFor="phone"
                className="block text-left text-sm font-semibold text-black"
            >
                Mobile Number
            </label>
            <input
                name="Phone"
                id="phone"
                type="tel"
                placeholder="Enter 10-digit mobile"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg 
                   bg-white border border-yellow-400/60 
                   text-black placeholder-slate-800 
                   focus:ring-2 focus:ring-yellow-400 
                   focus:outline-none disabled:opacity-50"
            />
            {isLoading && (
                <span className="absolute right-3 top-2.5 animate-spin text-yellow-400">
                    ⏳
                </span>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default PhoneInput;
