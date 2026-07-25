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
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={!disabled && !isSelected ? { scale: 1.03, y: -4 } : {}}
      whileTap={!disabled && !isSelected ? { scale: 0.97 } : {}}
      onClick={onClick}
      disabled={disabled || isSelected}
      className={`
        relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[1.6rem] p-4 transition-all duration-300 sm:rounded-[1.85rem] sm:p-5
        ${isSelected
          ? "pointer-events-none border-2 border-dashed border-slate-200 bg-white/55 opacity-45 grayscale"
          : "border border-white/90 bg-white/90 shadow-[0_14px_30px_rgba(15,23,42,0.09)] backdrop-blur-md hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-[0_20px_42px_rgba(245,158,11,0.16)] focus:outline-none focus:ring-4 focus:ring-amber-200/70"
        }
      `}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.82),transparent_34%)] opacity-90" />
      <span className="relative text-3xl drop-shadow-sm sm:text-4xl md:text-5xl">{step.icon}</span>
      <span className="relative line-clamp-2 text-center text-xs font-black leading-snug text-slate-700 md:text-sm">
        {step.text}
      </span>

      {index !== undefined && (
        <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-[10px] font-black text-white shadow-sm">
          {index + 1}
        </div>
      )}
    </motion.button>
  );
}
