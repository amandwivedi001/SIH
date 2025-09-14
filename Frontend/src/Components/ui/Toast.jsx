import React from "react";

const Toast = ({ title, description, type = "info", onClose }) => {
  const colors = {
    success: "bg-green-500/90 text-white",
    error: "bg-red-500/90 text-white",
    warning: "bg-yellow-500/90 text-black",
    info: "bg-blue-500/90 text-white",
  };

  return (
    <div
      className={`
        ${colors[type]} 
        px-4 py-3 rounded-lg shadow-lg mb-3 
        animate-slide-in
        flex items-start justify-between space-x-3
      `}
    >
      <div>
        <p className="font-semibold">{title}</p>
        {description && (
          <p className="text-sm opacity-90">{description}</p>
        )}
      </div>
      <button onClick={onClose} className="ml-2 font-bold">×</button>
    </div>
  );
};

export default Toast;
