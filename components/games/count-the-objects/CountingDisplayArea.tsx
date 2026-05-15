"use client";

import { motion } from "framer-motion";

interface CountingDisplayAreaProps {
  emoji: string;
  count: number;
}

export function CountingDisplayArea({ emoji, count }: CountingDisplayAreaProps) {
  // Logic to determine grid layout based on count
  const getGridLayout = () => {
    if (count <= 5) return "flex flex-wrap justify-center gap-6";
    if (count <= 10) return "grid grid-cols-5 gap-4";
    return "grid grid-cols-5 gap-3"; // For level 3 (up to 15)
  };

  return (
    <motion.div
      key={`${emoji}-${count}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 p-10 sm:p-14 shadow-premium flex flex-col items-center justify-center space-y-10 min-h-[300px]">
        <div className={getGridLayout()}>
          {Array.from({ length: count }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="text-5xl sm:text-6xl drop-shadow-sm select-none"
            >
              {emoji}
            </motion.span>
          ))}
        </div>
        
        <div className="pt-4">
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">
            How many are there?
          </p>
        </div>
      </div>
    </motion.div>
  );
}
