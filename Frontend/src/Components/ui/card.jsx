import React from "react";

// Root Card
export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden
        border border-[#EDB74B]/30 
        bg-amber-200
        backdrop-blur-xl shadow-lg shadow-[#EDB74B]/10
        hover:shadow-[#EDB74B]/20 transition-all duration-300
        ${className}
      `}
    >
      {/* Decorative top border glow */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#EDB74B] via-amber-400 to-[#EDB74B] animate-pulse" />
      {children}
    </div>
  );
};

// Header
export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`p-6 text-center ${className}`}>
      {children}
    </div>
  );
};

// Title
export const CardTitle = ({ children, className = "" }) => {
  return (
    <h2
      className={`
        text-2xl font-extrabold tracking-tight 
        bg-gradient-to-r from-[#EDB74B] to-amber-500 bg-clip-text text-transparent
        drop-shadow-sm ${className}
      `}
    >
      {children}
    </h2>
  );
};

// Description
export const CardDescription = ({ children, className = "" }) => {
  return (
    <p className={` mt-2 text-sm text-slate-600 ${className}`}>
      {children}
    </p>
  );
};

// Content
export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`p-6 pt-2 ${className}`}>
      {children}
    </div>
  );
};
