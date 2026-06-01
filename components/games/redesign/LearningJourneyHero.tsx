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
    <section className="relative pt-16 pb-12 text-center max-w-5xl mx-auto px-6 overflow-hidden">
      {/* Background Decorative Blobs - Very soft and non-overstimulating */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-rose-50/50 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col items-center gap-12">
        {/* Large, Friendly Mascot Welcome */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LumiMascot
            state="normal"
            message={`Hi ${firstName}!`}
            size="lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Ready to learn <br />
              <span className="text-blue-400">something new?</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 font-bold max-w-lg mx-auto leading-relaxed">
              Choose an activity below to start your adventure today.
            </p>
          </div>

          {/* Simple Progress Indicators - No excessive glows */}
          <div className="flex items-center justify-center gap-4">
            <div className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest shadow-sm flex items-center gap-2">
              <span className="text-base">🌈</span>
              Level {assessment?.predicted_level || 1}
            </div>
            <div className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest shadow-sm flex items-center gap-2">
              <span className="text-base">⭐</span>
              Learning Track
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
