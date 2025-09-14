import React from "react";
import LoginForm from "./auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12">
          
          {/* Left Section: Info */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
              Secure Real-Time <span className="text-blue-400">Device Tracking</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0">
              Monitor and track your valuable assets with enterprise-grade security,
              real-time location updates, and intelligent analytics.
            </p>

            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mt-6 justify-center lg:justify-start">
              <div className="bg-white/10 p-6 rounded-xl shadow-lg text-left w-56 hover:bg-white/20 transition">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="font-semibold text-white">Live Tracking</span>
                <p className="text-slate-300 text-sm mt-1">Real-time location updates</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl shadow-lg text-left w-56 hover:bg-white/20 transition">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="font-semibold text-white">Secure Access</span>
                <p className="text-slate-300 text-sm mt-1">End-to-end encryption</p>
              </div>
            </div>
          </div>

          {/* Right Section: Login Form */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <LoginForm />
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
