"use client";

import { motion } from "framer-motion";

type EmotionProgressBarProps = {
  currentRound: number;
  totalRounds: number;
};

export function EmotionProgressBar({ currentRound, totalRounds }: EmotionProgressBarProps) {
  const progress = (currentRound / totalRounds) * 100;

  return (
    <div className="w-full h-1.5 bg-slate-100/50 backdrop-blur-sm relative overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_0_12px_rgba(96,165,250,0.4)]"
      />
    </div>
  );
}
