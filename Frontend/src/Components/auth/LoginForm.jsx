// src/Components/auth/LoginForm.jsx
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/Button";
import { useToast } from "../ui/ToastProvider";
import PhoneInput from "./PhoneInput";
import OtpInput from "./OtpInput";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [step, setStep] = useState("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isValidMobile = (number) => /^[6-9]\d{9}$/.test(number);

  const handleSendOtp = () => {
    setErrors({});
    if (!mobile || !isValidMobile(mobile)) {
      setErrors({ mobile: "Please enter a valid 10-digit mobile number" });
      showToast({ title: "Invalid Mobile", description: "Enter a valid 10-digit mobile number", type: "error" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      showToast({ title: "OTP Sent", description: `Code sent to +91 ${mobile}`, type: "success" });
    }, 1200);
  };

  const handleVerifyOtp = () => {
    setErrors({});
    if (!otp || otp.length !== 6) {
      setErrors({ otp: "Please enter 6-digit OTP" });
      showToast({ title: "Invalid OTP", description: "OTP must be 6 digits", type: "error" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        // reliable flag for the tracking page
        try {
          sessionStorage.setItem("tracksec_logged_in", "1");
        } catch (e) {
          console.warn("sessionStorage not available", e);
        }
        // immediate navigation
        navigate("/tracking");
      } else {
        setErrors({ otp: "Invalid OTP. Try 123456 for demo" });
        showToast({ title: "Login Failed", description: "Invalid OTP. Try 123456", type: "error" });
      }
    }, 900);
  };

  return (
    <Card className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-blue-500/30 shadow-2xl rounded-3xl">
      <CardHeader className="text-center py-8">
        <CardTitle className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
          {step === "phone" ? "Login to TrackSecure" : "Verify Mobile"}
        </CardTitle>
        <CardDescription className="text-slate-300 mt-2">
          {step === "phone" ? "Enter your mobile number to get OTP" : "Enter the code sent to your phone"}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        {step === "phone" && (
          <div className="space-y-4">
            <PhoneInput value={mobile} onChange={setMobile} error={errors.mobile} isLoading={loading} />
            <Button onClick={handleSendOtp} className="w-full bg-blue-600" disabled={loading}>
              {loading ? (<><LoadingSpinner size="small" /><span className="ml-2">Sending...</span></>) : "Send OTP"}
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <OtpInput value={otp} onChange={setOtp} error={errors.otp} isLoading={loading} />
            <Button onClick={handleVerifyOtp} className="w-full bg-emerald-500" disabled={loading || otp.length !== 6}>
              {loading ? (<><LoadingSpinner size="small" /><span className="ml-2">Verifying...</span></>) : "Verify OTP"}
            </Button>

            <div className="flex space-x-2">
              <Button onClick={() => setStep("phone")} variant="outline" className="flex-1">Back</Button>
              <Button onClick={handleSendOtp} variant="ghost" className="flex-1">Resend</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginForm;
