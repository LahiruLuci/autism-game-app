"use client";

import { motion } from "framer-motion";
import { QuestionMode, ShapeMatchOption } from "@/lib/games/shape-number-match/questions";

interface ShapeAnswerGridProps {
  mode: QuestionMode;
  emoji: string;
  options: ShapeMatchOption[];
  onSelect: (option: ShapeMatchOption) => void;
  disabled: boolean;
}

export function ShapeAnswerGrid({ mode, emoji, options, onSelect, disabled }: ShapeAnswerGridProps) {
  const getGridCols = () => {
    if (options.length === 2) return "grid-cols-2";
    if (options.length === 3) return "grid-cols-1 sm:grid-cols-3";
    return "grid-cols-2 sm:grid-cols-4";
  };

  return (
    <div className={`grid gap-4 sm:gap-6 w-full max-w-5xl mx-auto px-6 ${getGridCols()}`}>
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          whileHover={!disabled ? { y: -5, scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          disabled={disabled}
          onClick={() => onSelect(option)}
          className={`relative group p-6 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:border-sky-100 disabled:opacity-50 flex flex-col items-center justify-center gap-3 min-h-[140px] ${
            mode === "NUMBER_TO_GROUP" ? "sm:min-h-[180px]" : ""
          }`}
        >
          {mode === "COUNT_TO_NUMBER" ? (
            <span className="text-4xl font-black text-slate-800 group-hover:text-sky-600 transition-colors">
              {option.value}
            </span>
          ) : (
            <div className="flex flex-wrap justify-center gap-1 max-w-[120px]">
              {Array.from({ length: option.value }).map((_, i) => (
                <span key={i} className="text-xl sm:text-2xl">{emoji}</span>
              ))}
            </div>
          )}
          
          <div className="absolute inset-0 rounded-[2.5rem] bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      ))}
    </div>
  );
}
