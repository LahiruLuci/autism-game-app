"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

interface ShapeFeedbackProps {
  message: string;
  type: "correct" | "incorrect" | null;
}

export function ShapeFeedback({ message, type }: ShapeFeedbackProps) {
  return (
    <div className="h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {type && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`px-8 py-4 rounded-full shadow-sm border flex items-center gap-3 ${
              type === "correct" 
                ? "bg-sky-50 border-sky-100 text-sky-700" 
                : "bg-amber-50 border-amber-100 text-amber-700"
            }`}
          >
            {type === "correct" ? <Sparkles size={18} /> : <CheckCircle2 size={18} className="opacity-50" />}
            <span className="text-sm font-black uppercase tracking-widest">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
