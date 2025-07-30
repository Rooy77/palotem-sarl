// src/components/Notification.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

type Props = {
  message: string | null;
  type?: "success" | "error" | "info";
};

export default function Notification({ message, type = "success" }: Props) {
  const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-white" />,
    error: <XCircle className="w-5 h-5 text-white" />,
    info: <AlertCircle className="w-5 h-5 text-white" />,
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-2 rounded shadow-lg
            ${
              type === "success"
                ? "bg-green-600"
                : type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
        >
          {iconMap[type]}
          <span className="text-white font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
