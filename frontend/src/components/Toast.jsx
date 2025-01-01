// components/Toast.js
"use client";
import { useState, useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
        onClose && onClose();
      }, 3000); 
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-80 px-4 py-2 rounded-md text-white ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
