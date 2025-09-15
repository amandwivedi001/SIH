import React from "react";

const PhoneInput = ({ value, onChange, error, isLoading }) => {
    // Handle input change with validation (only digits, max 10)
    const handleChange = (val) => {
        if (/^\d{0,10}$/.test(val)) {
            onChange(val);
        }
    };

    return (
        <div className="space-y-2 relative">
            <label htmlFor="phone" className="text-sm font-medium text-foreground text-se text-blue-200">
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
                className={`w-full px-4 py-2 rounded-lg border ${error ? "border-destructive" : "border-border/50"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-white`}
            />
            {isLoading && (
                <span className="absolute right-3 top-2.5 animate-spin text-primary">
                    ⏳
                </span>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
};

export default PhoneInput;
