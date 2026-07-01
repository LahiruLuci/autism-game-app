"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";

type CalmCompletionScreenProps = {
  onShowResults: () => void;
  seconds?: number;
};

export function CalmCompletionScreen({
  onShowResults,
  seconds = 5,
}: CalmCompletionScreenProps) {
  const [remaining, setRemaining] = useState(seconds);
  const hasNavigatedRef = useRef(false);

  const showResults = () => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    onShowResults();
  };

  useEffect(() => {
    const countdown = window.setInterval(() => {
      setRemaining((current) => Math.max(current - 1, 0));
    }, 1000);
    const redirect = window.setTimeout(showResults, seconds * 1000);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(redirect);
    };
  }, [seconds]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 px-4 py-8">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-xl flex-col items-center gap-7 rounded-[2.5rem] border border-white/80 bg-white/75 p-7 text-center shadow-premium backdrop-blur-xl sm:rounded-[3rem] sm:p-10"
      >
        <LumiMascot state="correct" size="md" />

        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-500">
            Game Complete
          </p>
          <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            Great work! You finished the game.
          </h1>
          <p className="mx-auto max-w-sm text-base font-bold leading-relaxed text-slate-500 sm:text-lg">
            Let&apos;s look at your results together.
          </p>
        </div>

        <div className="w-full space-y-3">
          <button
            type="button"
            onClick={showResults}
            className="min-h-14 w-full rounded-full bg-blue-600 px-6 text-base font-black uppercase tracking-widest text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
          >
            Show Results
          </button>
          <p className="text-xs font-bold text-slate-400">
            Results will open in {remaining} second{remaining === 1 ? "" : "s"}.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
