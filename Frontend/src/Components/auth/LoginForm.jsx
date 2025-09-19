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

const API = "http://localhost:8000/api/v1";

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
    setStep(initialStep || "phone");
    setEmail(initialEmail || "");
    setMobile(initialMobile || "");
    setRequestId(initialRequestId || "");
    if ((initialStep || "phone") === "phone") setOtp("");
  }, [initialStep, initialEmail, initialMobile, initialRequestId]);

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
      const res = await fetch(`${API}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone: `${mobile}` })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to send OTP");

      setRequestId(data.requestId);
      navigate("/verify-otp", { state: { step: "otp", email, mobile, requestId: data.requestId } });
      setStep("otp");
      showToast({ title: "OTP Sent", description: `OTP sent to +91 ${mobile}`, type: "success" });
    } catch (err) {
      console.error(err);
      showToast({ title: "Send failed", description: err.message || "Could not send OTP", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrors({});
    if (!otp || otp.length !== 6) {
      setErrors({ otp: "Enter 6-digit OTP" });
      showToast({ title: "Invalid OTP", description: "OTP must be 6 digits", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone: `${mobile}`, otp })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Verification failed");

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
    <Card className="w-full max-w-lg bg-[#FFFBF5] border border-[#F3E5C7] shadow-xl shadow-[#EDB74B]/20 rounded-2xl">
      <CardHeader className="text-center p-8">
        <CardTitle className="text-3xl font-bold text-slate-800">
          {step === "phone" ? "Welcome" : "Verify Your Mobile"}
        </CardTitle>
        <CardDescription className="text-slate-600 mt-2">
          {step === "phone"
            ? "Enter your details to log in."
            : "Enter the 6-digit code sent to your phone."}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        {step === "phone" && (
          <div className="space-y-6">
            <EmailInput value={email} onChange={setEmail} error={errors.email} isLoading={loading} />
            <PhoneInput value={mobile} onChange={setMobile} error={errors.mobile} isLoading={loading} />
            <Button
              onClick={handleSendOtp}
              className="w-full bg-[#EDB74B] hover:bg-[#d9a43a] text-slate-900 font-semibold py-3 transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-[#EDB74B]/70 focus:outline-none"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  <span className="ml-2">Sending...</span>
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-6">
            <OtpInput value={otp} onChange={setOtp} error={errors.otp} isLoading={loading} />
            <Button
              onClick={handleVerifyOtp}
              className="w-full bg-[#EDB74B] hover:bg-[#d9a43a] text-slate-900 font-semibold py-3 transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-[#EDB74B]/70 focus:outline-none"
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  <span className="ml-2">Verifying...</span>
                </>
              ) : (
                "Verify & Login"
              )}
            </Button>

            <div className="flex justify-between items-center pt-2">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="border-[#E6D9B6] text-slate-700 hover:bg-[#FAF3E6]"
              >
                Back
              </Button>
              <Button
                onClick={handleSendOtp}
                variant="link"
                className="text-[#EDB74B] hover:text-[#c59130] p-0"
                disabled={loading}
              >
                Resend Code
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginForm;
