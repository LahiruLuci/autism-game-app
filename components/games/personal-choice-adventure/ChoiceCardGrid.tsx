"use client";

import { motion } from "framer-motion";
import { ChoiceOption } from "@/lib/games/personal-choice-adventure/scenarios";

interface ChoiceCardGridProps {
  options: ChoiceOption[];
  onSelect: (option: ChoiceOption) => void;
  disabled: boolean;
}

export function ChoiceCardGrid({ options, onSelect, disabled }: ChoiceCardGridProps) {
  const gridClass = options.length <= 2
    ? "max-w-3xl grid-cols-1 sm:grid-cols-2"
    : "max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`mx-auto grid w-full ${gridClass} gap-3 px-2 sm:gap-4 lg:gap-5`}>
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
          whileHover={!disabled ? { y: -4, scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.97 } : {}}
          disabled={disabled}
          onClick={() => onSelect(option)}
          className="group relative flex min-h-[128px] items-center gap-4 overflow-hidden rounded-[2rem] border border-white/90 bg-white/90 p-5 text-left shadow-[0_16px_34px_rgba(15,23,42,0.09)] backdrop-blur-md transition-all duration-300 hover:border-rose-200 hover:bg-rose-50/50 hover:shadow-[0_22px_48px_rgba(244,114,182,0.16)] focus:outline-none focus:ring-4 focus:ring-rose-200/70 disabled:pointer-events-none disabled:opacity-50 sm:min-h-[142px] sm:p-6 lg:min-h-[150px]"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.8),transparent_32%)] opacity-90" />
          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/90 bg-gradient-to-br from-white via-rose-50 to-sky-50 text-3xl shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-500 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem] sm:text-4xl">
            {option.emoji}
          </span>
          <span className="relative text-base font-black leading-snug text-slate-800 sm:text-lg">
            {option.text}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
