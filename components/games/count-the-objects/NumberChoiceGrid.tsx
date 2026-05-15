"use client";

import { motion } from "framer-motion";

interface NumberChoiceGridProps {
  options: number[];
  onSelect: (value: number) => void;
  disabled: boolean;
}

export function NumberChoiceGrid({ options, onSelect, disabled }: NumberChoiceGridProps) {
  return (
    <div className={`grid gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-6 ${
      options.length === 2 ? "grid-cols-2" : 
      options.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
    }`}>
      {options.map((value, index) => (
        <motion.button
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          whileHover={!disabled ? { y: -5, scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          disabled={disabled}
          onClick={() => onSelect(value)}
          className="aspect-square sm:aspect-auto sm:h-24 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-100 transition-all flex items-center justify-center disabled:opacity-50 group"
        >
          <span className="text-3xl font-black text-slate-800 group-hover:text-cyan-600 transition-colors">
            {value}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
