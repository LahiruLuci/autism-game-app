"use client";

import { motion } from "framer-motion";

type StoryProgressBarProps = {
  currentRound: number;
  totalRounds: number;
};

export function StoryProgressBar({
  currentRound,
  totalRounds,
}: StoryProgressBarProps) {
  const progress = (currentRound / totalRounds) * 100;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-black text-slate-700">
          Story {currentRound} of {totalRounds}
        </span>
        <span className="text-xs font-bold text-slate-400">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-orange-100">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 rounded-full bg-orange-400"
        />
      </div>
    </div>
  );
}
