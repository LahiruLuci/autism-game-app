"use client";

import { motion } from "framer-motion";

interface CountingDisplayAreaProps {
  emoji: string;
  count: number;
}

export function CountingDisplayArea({ emoji, count }: CountingDisplayAreaProps) {
  const getGridLayout = () => {
    if (count <= 5) return "flex flex-wrap justify-center gap-4 sm:gap-5";
    if (count <= 10) return "grid grid-cols-5 gap-3 sm:gap-4";
    return "grid grid-cols-5 gap-2 sm:gap-3";
  };

  return (
    <motion.div
      key={`${emoji}-${count}`}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="flex min-h-[250px] flex-col items-center justify-center gap-7 rounded-[2.5rem] border border-white/80 bg-white/80 p-6 text-center shadow-[0_22px_58px_rgba(34,211,238,0.11)] backdrop-blur-xl sm:min-h-[290px] sm:p-8 lg:p-10">
        <div className={getGridLayout()}>
          {Array.from({ length: count }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
              className="select-none rounded-2xl bg-white/60 px-2 py-1 text-4xl drop-shadow-sm sm:text-5xl lg:text-6xl"
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <div className="rounded-full border border-cyan-100 bg-white/75 px-6 py-2 shadow-[0_10px_22px_rgba(34,211,238,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            How many are there?
          </p>
        </div>
      </div>
    </motion.div>
  );
}
