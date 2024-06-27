import React, { useEffect } from "react";

interface ErrorNotificationProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  visible,
  onClose,
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 bg-red-600 text-white text-center transition-transform ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="text-white ml-4">
          &#x2716;
        </button>
      </div>
    </div>
  );
};

export default ErrorNotification;
