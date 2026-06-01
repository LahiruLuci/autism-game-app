"use client";

import { motion } from "framer-motion";

type StoryProgressBarProps = {
  currentRound: number;
  totalRounds: number;
};

export function StoryProgressBar({ currentRound, totalRounds }: StoryProgressBarProps) {
  const progress = (currentRound / totalRounds) * 100;

  return (
    <div className="w-full max-w-md mx-auto px-6 py-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Story {currentRound} of {totalRounds}</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.3)]"
        />
      </div>
    </div>
  );
}
