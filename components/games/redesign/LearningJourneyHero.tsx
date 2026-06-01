"use client";

import { motion } from "framer-motion";
import type { AssessmentResult } from "@/types/survey";
import { LumiMascot } from "./LumiMascot";

interface LearningJourneyHeroProps {
  childName: string;
  assessment: AssessmentResult | null;
}

export function LearningJourneyHero({ childName, assessment }: LearningJourneyHeroProps) {
  const firstName = childName.split(" ")[0];

  return (
    <section className="relative pt-6 pb-8 text-center max-w-5xl mx-auto px-6 overflow-hidden">
      {/* Background Decorative Blobs - Soft clouds and shapes */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl -z-10" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-50/30 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-rose-50/40 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col items-center gap-4">
        {/* Large, Friendly Mascot Welcome */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LumiMascot
            state="normal"
            message={`Hi ${firstName}! \u{1F44B}`}
            size="xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Let&apos;s play <br />
              <span className="text-blue-500">and learn!</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 font-bold max-w-lg mx-auto leading-relaxed">
              Pick a game below to begin your adventure.
            </p>
          </div>

          {/* Simple Progress Indicators - Improved visibility and logic-friendly */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="px-5 py-2.5 rounded-2xl bg-white border-2 border-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest shadow-sm flex items-center gap-2">
              <span className="text-lg">🌈</span>
              Level {assessment?.predicted_level || 1}
            </div>
            <div className="px-5 py-2.5 rounded-2xl bg-white border-2 border-amber-50 text-amber-600 text-xs font-black uppercase tracking-widest shadow-sm flex items-center gap-2">
              <span className="text-lg">⭐</span>
              Learning Track
            </div>
          </div>

          {/* Visual Guidance Element */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="pt-4 flex flex-col items-center gap-2 text-slate-300"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
