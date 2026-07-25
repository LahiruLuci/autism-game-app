"use client";

import { motion } from "framer-motion";

interface ScenarioCardProps {
  emoji: string;
  situation: string;
  question: string;
}

export function ScenarioCard({ emoji, situation, question }: ScenarioCardProps) {
  return (
    <motion.div
      key={situation}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="grid items-center gap-5 rounded-[2.5rem] border border-white/80 bg-white/80 p-5 text-center shadow-[0_22px_58px_rgba(244,114,182,0.10)] backdrop-blur-xl sm:p-7 lg:grid-cols-[auto_1fr] lg:p-8 lg:text-left">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/90 bg-gradient-to-br from-white via-rose-50 to-sky-50 text-5xl shadow-[0_16px_34px_rgba(15,23,42,0.10)] sm:h-28 sm:w-28 sm:text-6xl lg:mx-0"
        >
          {emoji}
        </motion.div>

        <div className="space-y-3">
          <p className="mx-auto max-w-3xl text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:mx-0">
            {situation}
          </p>
          <p className="inline-flex rounded-full border border-rose-100 bg-white/75 px-5 py-2 text-base font-black tracking-tight text-rose-600 shadow-[0_10px_22px_rgba(244,114,182,0.08)] sm:text-lg">
            {question}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
