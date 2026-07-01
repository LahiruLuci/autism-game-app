"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RoutineStep } from "@/lib/games/daily-routine-order/routines";
import { RoutineStepCard } from "./RoutineStepCard";
import { ArrowRight } from "lucide-react";

interface RoutineSelectedOrderProps {
  selectedSteps: RoutineStep[];
  totalSteps: number;
}

export function RoutineSelectedOrder({ selectedSteps, totalSteps }: RoutineSelectedOrderProps) {
  const placeholders = Array.from({ length: totalSteps - selectedSteps.length });

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">My Routine Order</h3>
      </div>

      <div className="rounded-[2rem] border border-white/80 bg-white/40 p-4 shadow-premium backdrop-blur-xl sm:rounded-[3rem] sm:p-8">
        <div className="flex flex-nowrap items-center justify-center gap-2 sm:flex-wrap sm:gap-4">
          <AnimatePresence mode="popLayout">
            {selectedSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                layout
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="flex min-w-0 items-center gap-2 sm:shrink-0 sm:gap-4"
              >
                <div className="w-16 min-w-0 sm:w-24 md:w-32">
                  <RoutineStepCard step={step} index={idx} />
                </div>
                {idx < totalSteps - 1 && (
                  <ArrowRight size={20} className="text-slate-300 hidden sm:block" />
                )}
              </motion.div>
            ))}

            {placeholders.map((_, idx) => (
              <motion.div
                key={`empty-${idx}`}
                layout
                className="flex aspect-[4/3] min-w-0 flex-1 items-center justify-center rounded-[1.25rem] border-2 border-dashed border-slate-200 bg-white/30 text-xl font-black text-slate-200 sm:w-24 sm:flex-none sm:rounded-[2rem] sm:text-2xl md:w-32"
              >
                ?
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
