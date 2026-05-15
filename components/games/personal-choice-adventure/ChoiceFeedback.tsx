"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";

interface ChoiceFeedbackProps {
  message: string;
  type: "correct" | "incorrect" | null;
  helpfulTip?: string;
}

export function ChoiceFeedback({ message, type, helpfulTip }: ChoiceFeedbackProps) {
  return (
    <div className="h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {type && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`px-6 py-4 rounded-[2rem] shadow-sm border flex flex-col items-center gap-1 ${
              type === "correct" 
                ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                : "bg-amber-50 border-amber-100 text-amber-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {type === "correct" ? <CheckCircle2 size={18} /> : <Info size={18} />}
              <span className="text-sm font-black uppercase tracking-widest">{message}</span>
            </div>
            {helpfulTip && (
              <p className="text-xs font-bold opacity-80 italic">
                Helpful choice: {helpfulTip}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
