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
    <div className="w-full space-y-4">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">My Routine Order</h3>
      </div>

      <div className="rounded-[2.25rem] border border-white/80 bg-white/75 p-4 shadow-[0_18px_48px_rgba(245,158,11,0.10)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-nowrap items-center justify-start gap-2 overflow-x-auto pb-1 sm:justify-center sm:gap-4">
          <AnimatePresence mode="popLayout">
            {selectedSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                layout
                initial={{ opacity: 0, scale: 0.84, x: -16 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.84, x: 16 }}
                className="flex shrink-0 items-center gap-2 sm:gap-3"
              >
                <div className="w-24 sm:w-28 md:w-32">
                  <RoutineStepCard step={step} index={idx} />
                </div>
                {idx < totalSteps - 1 && (
                  <ArrowRight size={20} className="hidden text-amber-300 sm:block" />
                )}
              </motion.div>
            ))}

            {placeholders.map((_, idx) => (
              <motion.div
                key={`empty-${idx}`}
                layout
                className="flex h-20 w-24 shrink-0 items-center justify-center rounded-[1.4rem] border-2 border-dashed border-amber-200/80 bg-white/55 text-2xl font-black text-amber-200 sm:h-24 sm:w-28 sm:rounded-[1.8rem] md:h-28 md:w-32"
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
