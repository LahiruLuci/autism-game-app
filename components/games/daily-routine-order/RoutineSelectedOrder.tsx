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

      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 border border-white/80 shadow-premium">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <AnimatePresence mode="popLayout">
            {selectedSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                layout
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="flex items-center gap-4"
              >
                <div className="w-24 md:w-32">
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
                className="w-24 md:w-32 aspect-[4/3] rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/30 flex items-center justify-center text-slate-200 text-2xl font-black"
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
