"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MemoryFeedbackProps {
  message: string;
  type: "correct" | "incorrect" | null;
}

export function MemoryFeedback({ message, type }: MemoryFeedbackProps) {
  if (!type || !message) return null;

  const config = {
    correct: "bg-green-100 text-green-700 border-green-200 shadow-green-900/5",
    incorrect: "bg-amber-100 text-amber-700 border-amber-200 shadow-amber-900/5",
  };

  return (
    <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={`
            px-8 py-5 rounded-[2rem] border-2 backdrop-blur-md shadow-2xl
            flex items-center justify-center text-center text-lg font-black tracking-tight
            ${config[type]}
          `}
        >
          {message}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
