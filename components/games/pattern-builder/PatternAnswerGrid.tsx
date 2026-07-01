"use client";

import { motion } from "framer-motion";

interface PatternAnswerGridProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled: boolean;
}

export function PatternAnswerGrid({ options, onSelect, disabled }: PatternAnswerGridProps) {
  return (
    <div className="mx-auto grid w-full max-w-[320px] grid-cols-2 gap-4 px-4 py-2 sm:max-w-[460px] sm:gap-5 sm:p-3 md:max-w-[520px]">
      {options.map((option, idx) => (
        <motion.button
          key={idx}
          whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className={`
            aspect-square rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center text-4xl sm:rounded-[2rem] sm:text-5xl md:text-6xl shadow-premium
            transition-all duration-300 ${disabled ? 'opacity-50 grayscale pointer-events-none' : 'hover:border-blue-200 hover:shadow-2xl'}
          `}
          aria-label={`Select ${option}`}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}
