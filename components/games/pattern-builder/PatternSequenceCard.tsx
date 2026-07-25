"use client";

import { motion } from "framer-motion";

interface PatternSequenceCardProps {
  pattern: string[];
  instruction: string;
}

export function PatternSequenceCard({ pattern, instruction }: PatternSequenceCardProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{instruction}</h3>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 rounded-[2.25rem] border border-white/80 bg-white/75 p-4 shadow-[0_22px_58px_rgba(37,99,235,0.11)] backdrop-blur-xl sm:p-7 md:p-9">
        <div className="flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3 md:flex-nowrap md:gap-5 lg:gap-6">
          {pattern.map((symbol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.84, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/90 bg-white text-2xl shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:h-20 sm:w-20 sm:rounded-3xl sm:text-4xl md:h-24 md:w-24 md:text-5xl lg:h-28 lg:w-28 lg:rounded-[2rem] lg:text-6xl"
            >
              {symbol}
            </motion.div>
          ))}

          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl font-black text-blue-300 shadow-inner sm:h-20 sm:w-20 sm:rounded-3xl sm:text-4xl md:h-24 md:w-24 md:text-5xl lg:h-28 lg:w-28 lg:rounded-[2rem]"
          >
            ?
          </motion.div>
        </div>

        <div className="rounded-full border border-blue-100 bg-white/70 px-5 py-2 text-center shadow-[0_10px_24px_rgba(37,99,235,0.08)]">
          <p className="text-sm font-black tracking-tight text-slate-600 sm:text-base">
            Look closely. What comes next?
          </p>
        </div>
      </div>
    </div>
  );
}
