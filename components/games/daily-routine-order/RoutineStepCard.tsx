"use client";

import { motion } from "framer-motion";
import { RoutineStep } from "@/lib/games/daily-routine-order/routines";

interface RoutineStepCardProps {
  step: RoutineStep;
  onClick?: () => void;
  isSelected?: boolean;
  index?: number;
  disabled?: boolean;
}

export function RoutineStepCard({ step, onClick, isSelected, index, disabled }: RoutineStepCardProps) {
  return (
    <motion.button
      whileHover={!disabled && !isSelected ? { scale: 1.05, y: -5 } : {}}
      whileTap={!disabled && !isSelected ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || isSelected}
      className={`
        relative w-full aspect-[4/3] rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300
        ${isSelected 
          ? 'bg-slate-50 border-2 border-dashed border-slate-200 opacity-40 grayscale pointer-events-none' 
          : 'bg-white border border-slate-100 shadow-premium hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-900/5'
        }
      `}
    >
      <span className="text-4xl md:text-5xl drop-shadow-sm">{step.icon}</span>
      <span className="text-xs md:text-sm font-bold text-slate-700 text-center line-clamp-2">
        {step.text}
      </span>
      
      {index !== undefined && (
        <div className="absolute top-4 left-4 w-6 h-6 rounded-lg bg-amber-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
          {index + 1}
        </div>
      )}
    </motion.button>
  );
}
