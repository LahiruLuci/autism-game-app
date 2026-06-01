"use client";

import { motion } from "framer-motion";

type EmotionProgressBarProps = {
  currentRound: number;
  totalRounds: number;
};

export function EmotionProgressBar({ currentRound, totalRounds }: EmotionProgressBarProps) {
  const progress = (currentRound / totalRounds) * 100;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pointer-events-none z-40">
      <div className="h-2 w-full bg-slate-200/40 backdrop-blur-md rounded-full relative overflow-hidden border border-white/40 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, type: "spring", stiffness: 50, damping: 20 }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
        >
          {/* Animated shimmer effect */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
