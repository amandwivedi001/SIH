import React from "react";

// Root Card
export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden
        border border-border/40 
        bg-gradient-to-br from-background/90 via-card/80 to-background/70
        backdrop-blur-xl shadow-lg shadow-primary/10
        hover:shadow-primary/20 transition-all duration-300
        ${className}
      `}
    >
      {/* Decorative top border glow */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse" />
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
        bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent
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
    <p className={`mt-2 text-sm text-muted-foreground ${className}`}>
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
