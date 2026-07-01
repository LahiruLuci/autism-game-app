"use client";

import { motion } from "framer-motion";
import { ChoiceOption } from "@/lib/games/personal-choice-adventure/scenarios";

interface ChoiceCardGridProps {
  options: ChoiceOption[];
  onSelect: (option: ChoiceOption) => void;
  disabled: boolean;
}

export function ChoiceCardGrid({ options, onSelect, disabled }: ChoiceCardGridProps) {
  return (
    <div className={`grid gap-4 sm:gap-6 lg:gap-7 w-full mx-auto px-6 ${
      options.length <= 2
        ? "max-w-2xl grid-cols-1 sm:grid-cols-2"
        : "max-w-3xl grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center"
    }`}>
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={!disabled ? { y: -5, scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          disabled={disabled}
          onClick={() => onSelect(option)}
          className="group relative flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:border-blue-100 hover:shadow-xl disabled:opacity-50 lg:min-h-[180px] lg:w-[220px]"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-500">
            {option.emoji}
          </div>
          <span className="text-sm font-bold text-slate-700 text-center leading-snug">
            {option.text}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
