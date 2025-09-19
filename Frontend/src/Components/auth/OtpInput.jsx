import React, { useRef } from "react";

const OtpInput = ({ value, onChange, error, isLoading }) => {
  const inputsRef = useRef([]);

  const handleChange = (index, val) => {
    if (!/^\d*$/.test(val)) return; // only digits
    const newOtp = value.split("");
    newOtp[index] = val;
    onChange(newOtp.join(""));

    if (val && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <label className="block text-yellow-600 text-lg font-semibold mb-4">
        Enter OTP
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
            className={`w-12 h-14 text-center text-black text-lg font-bold 
                        rounded-lg border ${
                          error ? "border-red-500" : "border-yellow-400/60"
                        } 
                        bg-white placeholder-slate-500 
                        focus:outline-none focus:ring-2 focus:ring-yellow-400 
                        transition-all duration-200`}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default OtpInput;
