"use client";

import { motion } from "framer-motion";

interface PatternSequenceCardProps {
  pattern: string[];
  instruction: string;
}

export function PatternSequenceCard({ pattern, instruction }: PatternSequenceCardProps) {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 sm:space-y-10">
      <div className="text-center">
        <h3 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">{instruction}</h3>
      </div>

      <div className="flex flex-col items-center justify-center space-y-5 rounded-[2rem] border border-white/80 bg-white/40 p-4 shadow-premium backdrop-blur-xl sm:space-y-8 sm:rounded-[3rem] sm:p-10 md:p-16">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8">
          {pattern.map((symbol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-white text-2xl shadow-sm sm:h-20 sm:w-20 sm:rounded-3xl sm:text-4xl md:h-28 md:w-28 md:rounded-[2.5rem] md:text-6xl"
            >
              {symbol}
            </motion.div>
          ))}

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl text-blue-300 shadow-inner sm:h-20 sm:w-20 sm:rounded-3xl sm:text-4xl md:h-28 md:w-28 md:rounded-[2.5rem] md:text-5xl"
          >
            ?
          </motion.div>
        </div>

        <div className="pt-1 text-center sm:pt-4">
          <p className="text-base font-bold italic tracking-tight text-slate-500 sm:text-lg">
            Look closely at the shapes.
          </p>
        </div>
      </div>
    </div>
  );
}
