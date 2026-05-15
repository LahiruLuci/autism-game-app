"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ReflectionFeedbackProps {
  message: string;
  visible: boolean;
}

export function ReflectionFeedback({ message, visible }: ReflectionFeedbackProps) {
  return (
    <div className="h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="px-8 py-3 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-sm flex items-center gap-3"
          >
            <span className="text-sm font-black text-slate-700 tracking-tight">
              {message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
