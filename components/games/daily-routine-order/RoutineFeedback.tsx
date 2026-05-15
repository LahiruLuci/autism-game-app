"use client";

import { motion, AnimatePresence } from "framer-motion";

interface RoutineFeedbackProps {
  message: string;
  type: "correct" | "incorrect" | null;
}

export function RoutineFeedback({ message, type }: RoutineFeedbackProps) {
  if (!type || !message) return null;

  const themes = {
    correct: "bg-green-100 text-green-700 border-green-200 shadow-green-900/5",
    incorrect: "bg-amber-100 text-amber-700 border-amber-200 shadow-amber-900/5",
  };

  return (
    <div className="fixed top-40 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-6 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          className={`
            px-10 py-6 rounded-[2.5rem] border-2 backdrop-blur-md shadow-2xl
            flex items-center justify-center text-center text-xl font-black tracking-tight
            ${themes[type]}
          `}
        >
          {message}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
