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
    if (count <= 5) return "flex flex-wrap justify-center gap-6";
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
      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 p-10 sm:p-14 shadow-premium flex flex-col items-center justify-center space-y-10 min-h-[320px]">
        {mode === "COUNT_TO_NUMBER" ? (
          <div className={getGridLayout()}>
            {Array.from({ length: count }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="text-5xl sm:text-6xl drop-shadow-sm select-none"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Number</p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-8xl font-black text-slate-900 drop-shadow-sm"
            >
              {count}
            </motion.div>
          </div>
        )}
        
        <div className="pt-4 text-center">
          <p className="text-slate-500 font-bold tracking-tight text-lg italic">
            {mode === "COUNT_TO_NUMBER" ? "How many shapes are there?" : "Which group matches the number?"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
