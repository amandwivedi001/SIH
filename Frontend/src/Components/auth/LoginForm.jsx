import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/Button";
import { useToast } from "../ui/ToastProvider";
import { CheckCircle } from "lucide-react";
import PhoneInput from "./PhoneInput";
import OtpInput from "./OtpInput";
import LoadingSpinner from "./LoadingSpinner";

const LoginForm = () => {
  const [step, setStep] = useState("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const isValidMobile = (number) => /^[6-9]\d{9}$/.test(number);

  const handleSendOtp = () => {
    setErrors({});
    if (!mobile || !isValidMobile(mobile)) {
      setErrors({ mobile: "Please enter a valid 10-digit mobile number" });
      showToast({
        title: "Invalid Mobile",
        description: "Enter a valid 10-digit mobile number",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      showToast({
        title: "OTP Sent",
        description: `Code sent to +91 ${mobile}`,
        type: "success",
      });
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setErrors({});
    if (!otp || otp.length !== 6) {
      setErrors({ otp: "Please enter 6-digit OTP" });
      showToast({
        title: "Invalid OTP",
        description: "OTP must be 6 digits",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        setStep("success");
        showToast({
          title: "Login Successful",
          description: "Welcome to TrackSecure",
          type: "success",
        });
      } else {
        setErrors({ otp: "Invalid OTP. Try 123456 for demo" });
        showToast({
          title: "Login Failed",
          description: "Invalid OTP. Try 123456",
          type: "error",
        });
      }
    }, 1200);
  };

  const steps = {
    phone: {
      title: "Login to TrackSecure",
      description: "Enter your mobile number to get OTP",
    },
    otp: {
      title: "Verify Mobile",
      description: "Enter the code sent to your phone",
    },
    success: {
      title: "Welcome!",
      description: "Successfully logged in",
    },
  };

  return (
    <Card className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-blue-500/30 shadow-2xl shadow-blue-900/40 hover:shadow-blue-500/50 transition-all duration-500 rounded-3xl">
      <CardHeader className="text-center py-8">
        <CardTitle className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
          {steps[step].title}
        </CardTitle>
        <CardDescription className="text-slate-300 mt-2">
          {steps[step].description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        {step === "phone" && (
          <div className="space-y-4">
            <PhoneInput
              value={mobile}
              onChange={setMobile}
              error={errors.mobile}
              isLoading={loading}
            />
            <Button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/40 hover:shadow-lg hover:shadow-blue-500/40 transition-all"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="small" />
                  <span className="ml-2">Sending...</span>
                </div>
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <OtpInput
              value={otp}
              onChange={setOtp}
              error={errors.otp}
              isLoading={loading}
            />
            <Button
              onClick={handleVerifyOtp}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-900/40 hover:shadow-lg hover:shadow-emerald-400/40 transition-all"
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="small" />
                  <span className="ml-2">Verifying...</span>
                </div>
              ) : (
                "Verify OTP"
              )}
            </Button>

            <div className="flex space-x-2">
              <Button
                onClick={() => setStep("phone")}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
              >
                Back
              </Button>
              <Button
                onClick={handleSendOtp}
                variant="ghost"
                className="flex-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 transition-all"
              >
                Resend
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-6 py-6">
            <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto animate-pulse" />
            <p className="text-slate-300 text-lg">Ready to track your devices!</p>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:opacity-90 text-white shadow-lg shadow-blue-900/50 transition-all">
              Go to Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginForm;
