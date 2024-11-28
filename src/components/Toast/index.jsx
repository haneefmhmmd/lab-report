import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1200,
        padding: "10px 20px",
        borderRadius: "5px",
        backgroundColor: type === "success" ? "#28a745" : "#dc3545",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
