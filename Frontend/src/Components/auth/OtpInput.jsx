import React, { useRef } from "react";

const OtpInput = ({ value, onChange, error, isLoading }) => {
  const inputsRef = useRef([]);

  // Handle input change for each box
  const handleChange = (index, val) => {
    if (!/^\d*$/.test(val)) return; // only digits
    const newOtp = value.split("");
    newOtp[index] = val;
    onChange(newOtp.join(""));

    // Move focus to next input if filled
    if (val && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace to move focus back
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-background rounded-xl shadow-md">
      <label className="block text-blue-200 text-lg font-semibold mb-4">
        OTP
      </label>
      <div className="flex justify-between gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <input
          name="Otp"
            key={i}
            type="text"
            maxLength={1}
            value={value[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={isLoading}
            ref={(el) => (inputsRef.current[i] = el)}
            className={`w-12 h-14 text-center text-white text-lg font-bold rounded-lg border ${
              error ? "border-destructive" : "border-border/50"
            } bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200`}
          />
        ))}
      </div>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
};

export default OtpInput;
