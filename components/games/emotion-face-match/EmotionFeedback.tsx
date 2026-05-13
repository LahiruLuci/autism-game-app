"use client";

import { motion, AnimatePresence } from "framer-motion";

type EmotionFeedbackProps = {
  message: string;
  type: "success" | "info" | null;
};

export function EmotionFeedback({ message, type }: EmotionFeedbackProps) {
  return (
    <div className="h-12 flex items-center justify-center">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-lg border-2 z-10 ${
              type === "success" 
                ? "bg-green-50 text-green-700 border-green-100 shadow-green-900/5" 
                : "bg-blue-50 text-blue-700 border-blue-100 shadow-blue-900/5"
            }`}
          >
            <div className="flex items-center gap-2">
              {type === "success" && <span>✨</span>}
              {message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
