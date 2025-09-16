// src/Components/auth/LoginForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/Button";
import { useToast } from "../ui/ToastProvider";
import EmailInput from "./EmailInput";
import PhoneInput from "./PhoneInput";
import OtpInput from "./OtpInput";
import LoadingSpinner from "./LoadingSpinner";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LoginForm = ({ initialStep = "phone", initialEmail = "", initialMobile = "", initialRequestId = "" }) => {
  const [step, setStep] = useState(initialStep);
  const [email, setEmail] = useState(initialEmail);
  const [mobile, setMobile] = useState(initialMobile);
  const [otp, setOtp] = useState("");
  const [requestId, setRequestId] = useState(initialRequestId || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isValidEmail = (s) => /\S+@\S+\.\S+/.test(s);
  const isValidMobile = (s) => /^[6-9]\d{9}$/.test(s);

  useEffect(() => {
    // sync props -> state (important when nav passes state)
    setStep(initialStep || "phone");
    setEmail(initialEmail || "");
    setMobile(initialMobile || "");
    setRequestId(initialRequestId || "");
    if ((initialStep || "phone") === "phone") setOtp("");
  }, [initialStep, initialEmail, initialMobile, initialRequestId]);

  // Send OTP to backend
  const handleSendOtp = async () => {
    setErrors({});
    const newErrors = {};
    if (!isValidEmail(email)) newErrors.email = "Invalid email";
    if (!isValidMobile(mobile)) newErrors.mobile = "Invalid mobile (10 digits)";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      showToast({ title: "Invalid input", description: newErrors.email || newErrors.mobile, type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone: `${mobile}` })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to send OTP");

      // store requestId returned by backend
      setRequestId(data.requestId);
      // navigate to OTP route and pass state
      navigate("/verify-otp", { state: { step: "otp", email, mobile, requestId: data.requestId } });
      // also set local step so UI switches before route update
      setStep("otp");
      showToast({ title: "OTP Sent", description: `OTP sent to +91 ${mobile}`, type: "success" });
    } catch (err) {
      console.error(err);
      showToast({ title: "Send failed", description: err.message || "Could not send OTP", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP with backend
  const handleVerifyOtp = async () => {
    setErrors({});
    if (!otp || otp.length !== 6) {
      setErrors({ otp: "Enter 6-digit OTP" });
      showToast({ title: "Invalid OTP", description: "OTP must be 6 digits", type: "error" });
      return;
    }
    if (!requestId) {
      showToast({ title: "Session missing", description: "Please resend OTP", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone: `${mobile}`, otp })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Verification failed");

      // success: store token for demo
      if (data.token) sessionStorage.setItem("auth_token", data.token);
      sessionStorage.setItem("tracksec_logged_in", "1");
      navigate("/tracking");
    } catch (err) {
      console.error(err);
      showToast({ title: "Verification failed", description: err.message || "Invalid OTP", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-blue-500/20 shadow-2xl rounded-3xl">
      <CardHeader className="text-center py-8">
        <CardTitle className="text-2xl font-bold">{step === "phone" ? "Login to TrackSecure" : "Verify Mobile"}</CardTitle>
        <CardDescription className="text-slate-300 mt-2">{step === "phone" ? "Enter email & mobile" : "Enter the code sent to your phone"}</CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        {step === "phone" && (
          <div className="space-y-4">
            <EmailInput value={email} onChange={setEmail} error={errors.email} isLoading={loading} />
            <PhoneInput value={mobile} onChange={setMobile} error={errors.mobile} isLoading={loading} />
            <Button onClick={handleSendOtp} className="w-full" disabled={loading}>
              {loading ? <><LoadingSpinner size="small" /><span className="ml-2">Sending...</span></> : "Send OTP"}
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <OtpInput value={otp} onChange={setOtp} error={errors.otp} isLoading={loading} />
            <Button onClick={handleVerifyOtp} className="w-full" disabled={loading || otp.length !== 6}>
              {loading ? <><LoadingSpinner size="small" /><span className="ml-2">Verifying...</span></> : "Verify OTP"}
            </Button>

            <div className="flex space-x-2">
              <Button onClick={() => navigate("/")} variant="outline" className="flex-1">Back</Button>
              <Button onClick={handleSendOtp} variant="ghost" className="flex-1">Resend</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginForm;
