// src/Components/LoginPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./auth/LoginForm";

const LoginPage = () => {
  const location = useLocation();

  // ✅ Read state passed from navigate("/otpVerification")
  const step = location.state?.step || "phone";
  const email = location.state?.email || "";
  const mobile = location.state?.mobile || "";
  const requestId = location.state?.requestId || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-stretch gap-12">

          {/* Left Section: Info + Features */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left flex flex-col">

            {/* Heading + Paragraph */}
            <div className="space-y-6 order-1">
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
                Secure Real-Time <span className="text-blue-400">Device Tracking</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0">
                Monitor and track your valuable assets with enterprise-grade security,
                real-time location updates, and intelligent analytics.
              </p>
            </div>

            {/* Login Form (mobile only → comes between heading and features) */}
            <div className="w-full flex justify-center order-2 lg:hidden">
              <LoginForm initialStep={step} initialEmail={email} initialMobile={mobile} />
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 order-3 justify-items-center">
              <div className="bg-white/10 p-6 rounded-xl shadow-lg text-left hover:bg-white/20 transition w-full max-w-xs">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="font-semibold text-white">Live Tracking</span>
                <p className="text-slate-300 text-sm mt-1">Real-time location updates</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl shadow-lg text-left hover:bg-white/20 transition w-full max-w-xs">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="font-semibold text-white">Secure Access</span>
                <p className="text-slate-300 text-sm mt-1">End-to-end encryption</p>
              </div>
            </div>
          </div>

          {/* Right Section: Login Form (desktop only) */}
          <div className="lg:w-1/2 w-full flex justify-center items-center">
            <div className="hidden lg:block w-full max-w-lg">
              <LoginForm initialStep={step} initialEmail={email} initialMobile={mobile} initialRequestId={requestId}/>
            </div>
          </div>

        </div>
      </div>  
    </div>
  );
};

export default LoginPage;
