"use client";

import { motion } from "framer-motion";
import { QuestionMode } from "@/lib/games/shape-number-match/questions";

interface ShapeDisplayCardProps {
  mode: QuestionMode;
  emoji: string;
  count: number;
}

export function ShapeDisplayCard({ mode, emoji, count }: ShapeDisplayCardProps) {
  const getGridLayout = () => {
    if (count <= 4) return "flex flex-nowrap justify-center gap-3 sm:gap-6";
    if (count <= 5) return "flex flex-wrap justify-center gap-4 sm:gap-6";
    if (count <= 10) return "grid grid-cols-5 gap-4";
    return "grid grid-cols-5 gap-3";
  };

  return (
    <motion.div
      key={`${mode}-${count}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="min-h-[300px] rounded-[3rem] border border-white/80 bg-white/40 p-6 shadow-premium backdrop-blur-xl sm:min-h-[320px] sm:p-14 flex flex-col items-center justify-center space-y-8 sm:space-y-10">
        {mode === "COUNT_TO_NUMBER" ? (
          <div className={getGridLayout()}>
            {Array.from({ length: count }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="select-none text-4xl drop-shadow-sm sm:text-6xl"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Number</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-black text-slate-900 drop-shadow-sm sm:text-8xl"
            >
              {count}
            </motion.div>
          </div>
        )}

        <div className="pt-2 text-center sm:pt-4">
          <p className="text-base font-bold italic tracking-tight text-slate-500 sm:text-lg">
            {mode === "COUNT_TO_NUMBER" ? "How many shapes are there?" : "Which group matches the number?"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
