"use client";

import { motion } from "framer-motion";

interface PatternSequenceCardProps {
  pattern: string[];
  instruction: string;
}

export function PatternSequenceCard({ pattern, instruction }: PatternSequenceCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-10">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{instruction}</h3>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-white/80 shadow-premium flex items-center justify-center gap-4 md:gap-8 flex-wrap">
        {pattern.map((symbol, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="w-20 h-20 md:w-28 md:h-28 rounded-3xl md:rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center text-4xl md:text-6xl shadow-sm"
          >
            {symbol}
          </motion.div>
        ))}

        {/* The Missing Slot */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 md:w-28 md:h-28 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 flex items-center justify-center text-4xl md:text-5xl text-blue-300 shadow-inner"
        >
          ?
        </motion.div>
      </div>
    </div>
  );
}
