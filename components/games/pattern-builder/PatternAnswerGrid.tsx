"use client";

import { motion } from "framer-motion";

interface PatternAnswerGridProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled: boolean;
}

export function PatternAnswerGrid({ options, onSelect, disabled }: PatternAnswerGridProps) {
  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-2 gap-6 p-4">
      {options.map((option, idx) => (
        <motion.button
          key={idx}
          whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className={`
            aspect-square rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center text-6xl md:text-7xl shadow-premium
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
