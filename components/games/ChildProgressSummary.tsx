"use client";

import { motion } from "framer-motion";
import type { AssessmentResult } from "@/types/survey";

type ChildProgressSummaryProps = {
  assessment: AssessmentResult | null;
};

export function ChildProgressSummary({ assessment }: ChildProgressSummaryProps) {
  const stats = [
    {
      label: "Suggested Level",
      value: assessment ? `Level ${assessment.predicted_level}` : "Pending",
      icon: "🎯",
    },
    {
      label: "Survey Status",
      value: assessment ? "Completed" : "Action Required",
      icon: "📋",
      alert: !assessment,
    },
    {
      label: "Current Focus",
      value: "Emotion Recognition",
      icon: "💛",
    },
    {
      label: "Learning Pace",
      value: "Gentle & Supportive",
      icon: "🌱",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative z-10"
    >
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{stat.icon}</span>
                <span className="uppercase tracking-widest text-[10px] font-bold text-slate-400">
                  {stat.label}
                </span>
              </div>
              <p className={`text-lg font-bold ${stat.alert ? "text-amber-600" : "text-slate-800"}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
