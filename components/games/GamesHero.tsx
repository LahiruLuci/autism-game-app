"use client";

import { motion } from "framer-motion";
import type { ChildProfile } from "@/types/child";
import type { AssessmentResult } from "@/types/survey";

type GamesHeroProps = {
  child: ChildProfile | null;
  assessment: AssessmentResult | null;
};

export function GamesHero({ child, assessment }: GamesHeroProps) {
  const suggestedFocus = assessment 
    ? `Emotion Recognition — Level ${assessment.predicted_level}`
    : "Developmental Support Survey";

  return (
    <section className="relative pt-12 pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-6"
        >
          <div className="space-y-2">
            <h2 className="uppercase tracking-[0.2em] text-xs font-bold text-blue-500/70">
              Guided Learning Journey
            </h2>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Helping {child?.child_name.split(" ")[0] || "child"} continue learning gently.
            </h1>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
              <p className="text-lg font-semibold text-slate-700">
                Today's suggested focus: <span className="text-blue-600">{suggestedFocus}</span>
              </p>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
              Small daily activities can help children build confidence step by step in a safe, supportive environment.
            </p>
          </div>
        </motion.div>

        {/* Abstract Illustration Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="w-72 h-72 rounded-[4rem] bg-gradient-to-br from-blue-100 to-violet-100 rotate-12 absolute inset-0 blur-2xl opacity-40 animate-pulse" />
          <div className="relative w-64 h-64 rounded-[3rem] bg-white shadow-2xl shadow-blue-100 flex items-center justify-center text-8xl">
            ✨
          </div>
        </motion.div>
      </div>
    </section>
  );
}
