"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

type EmotionProgressBarProps = {
  currentRound: number;
  totalRounds: number;
  compact?: boolean;
};

export function EmotionProgressBar({
  currentRound,
  totalRounds,
  compact = false,
}: EmotionProgressBarProps) {
  const progress = (currentRound / totalRounds) * 100;

  if (compact) {
    return (
      <div className="flex w-full items-center gap-3 sm:gap-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-500 sm:size-12">
          <Star size={22} fill="currentColor" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-2 text-sm font-black text-slate-800">
            Question {currentRound} of {totalRounds}
          </p>
          <div className="relative h-2 overflow-hidden rounded-full bg-blue-100">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-y-0 left-0 rounded-full bg-blue-500"
            />
          </div>
        </div>

        <div className="shrink-0 rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 sm:px-4">
          {Math.round(progress)}%
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-6 py-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
          Question {currentRound} of {totalRounds}
        </span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
        />
      </div>
    </div>
  );
}
