import { AlertTriangle, CheckCircle, X, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const Toast = ({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    const baseStyles =
      "fixed top-4 right-4 max-w-sm w-full bg-white border-l-4 rounded-lg shadow-lg p-4 flex items-start gap-3 transform transition-all duration-300 ease-in-out z-50";

    switch (type) {
      case "success":
        return `${baseStyles} border-l-emerald-500`;
      case "warning":
        return `${baseStyles} border-l-amber-500`;
      case "error":
        return `${baseStyles} border-l-red-500`;
      default:
        return `${baseStyles} border-l-slate-500`;
    }
  };

  const getIcon = () => {
    const iconProps = { className: "h-5 w-5 flex-shrink-0 mt-0.5" };

    switch (type) {
      case "success":
        return (
          <CheckCircle
            {...iconProps}
            className={`${iconProps.className} text-emerald-600`}
          />
        );
      case "warning":
        return (
          <AlertTriangle
            {...iconProps}
            className={`${iconProps.className} text-amber-600`}
          />
        );
      case "error":
        return (
          <XCircle
            {...iconProps}
            className={`${iconProps.className} text-red-600`}
          />
        );
      default:
        return (
          <CheckCircle
            {...iconProps}
            className={`${iconProps.className} text-slate-600`}
          />
        );
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-emerald-800";
      case "warning":
        return "text-amber-800";
      case "error":
        return "text-red-800";
      default:
        return "text-slate-800";
    }
  };

  return (
    <div className={getToastStyles()}>
      {getIcon()}
      <div className="flex-1">
        <p className={`text-sm font-medium ${getTextColor()}`}>{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors duration-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

// Custom hook for managing toasts
export const useToast = () => {
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
      isVisible: true,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };

  const ToastComponent = () => (
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={hideToast}
    />
  );

  return {
    showToast,
    hideToast,
    ToastComponent,
  };
};

export default Toast;
