"use client";

import { motion } from "framer-motion";

interface PatternAnswerGridProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled: boolean;
}

export function PatternAnswerGrid({ options, onSelect, disabled }: PatternAnswerGridProps) {
  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-wrap items-center justify-center gap-3 px-2 py-2 sm:max-w-[560px] sm:gap-4 md:max-w-[900px] md:flex-nowrap lg:max-w-[980px]">
      {options.map((option, idx) => (
        <motion.button
          key={idx}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: idx * 0.06, ease: "easeOut" }}
          whileHover={!disabled ? { scale: 1.04, y: -4 } : {}}
          whileTap={!disabled ? { scale: 0.96 } : {}}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className={`
            relative flex h-28 w-[calc(50%-0.4rem)] min-w-[7rem] items-center justify-center overflow-hidden rounded-[1.45rem] border border-white/90 bg-white/90 text-4xl shadow-[0_16px_34px_rgba(15,23,42,0.10)] backdrop-blur-md
            transition-all duration-300 sm:h-32 sm:text-5xl md:h-36 md:w-36 md:min-w-0 lg:h-40 lg:w-40 lg:text-6xl
            ${disabled ? "pointer-events-none opacity-50 grayscale" : "hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-[0_22px_42px_rgba(37,99,235,0.16)] focus:outline-none focus:ring-4 focus:ring-blue-200/70"}
          `}
          aria-label={`Select ${option}`}
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_26%_20%,rgba(255,255,255,0.8),transparent_34%)] opacity-80" />
          <span className="relative drop-shadow-sm">{option}</span>
        </motion.button>
      ))}
    </div>
  );
}
