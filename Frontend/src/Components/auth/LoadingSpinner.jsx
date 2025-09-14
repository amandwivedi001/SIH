import React from 'react';

const LoadingSpinner = ({ size = "small" }) => {
  const dimensions = size === "small" ? "h-4 w-4" : "h-6 w-6";
  return (
    <div className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${dimensions}`} />
  );
};

export default LoadingSpinner;
