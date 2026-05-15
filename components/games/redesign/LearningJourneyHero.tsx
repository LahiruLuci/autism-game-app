"use client";

import { motion } from "framer-motion";
import type { AssessmentResult } from "@/types/survey";

interface LearningJourneyHeroProps {
  childName: string;
  assessment: AssessmentResult | null;
}

export function LearningJourneyHero({ childName, assessment }: LearningJourneyHeroProps) {
  const stats = [
    { label: `🌱 Level ${assessment?.predicted_level || 1} Explorer`, color: "bg-green-50 text-green-600 border-green-100" },
    { label: "💛 Emotion Growth", color: "bg-rose-50 text-rose-600 border-rose-100" },
    { label: "🧠 Cognitive Focus", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "🌈 Calm Learning", color: "bg-violet-50 text-violet-600 border-violet-100" },
  ];

  return (
    <section className="relative py-20 md:py-32 text-center max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/80 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Guided Learning Journey</span>
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight text-slate-900 leading-[0.95]">
            Hello, {childName} <span className="inline-block origin-bottom animate-bounce-slow">✨</span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-slate-500 max-w-3xl mx-auto font-medium">
            Explore your specialized learning path. Each activity is carefully selected to support your unique growth and development.
          </p>
        </div>

        {/* Floating Stats Pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className={`px-6 py-3 rounded-2xl backdrop-blur-md border shadow-premium font-bold text-xs tracking-wide ${stat.color} flex items-center gap-2`}
            >
              {stat.label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
