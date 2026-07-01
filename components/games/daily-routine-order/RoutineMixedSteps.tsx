"use client";

import { RoutineStep } from "@/lib/games/daily-routine-order/routines";
import { RoutineStepCard } from "./RoutineStepCard";

interface RoutineMixedStepsProps {
  steps: RoutineStep[];
  selectedIds: string[];
  onSelect: (step: RoutineStep) => void;
  disabled: boolean;
}

export function RoutineMixedSteps({ steps, selectedIds, onSelect, disabled }: RoutineMixedStepsProps) {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-slate-300" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Available Steps</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center">
        {steps.map((step) => (
          <div key={step.id} className="md:w-36 lg:w-40">
            <RoutineStepCard
              step={step}
              onClick={() => onSelect(step)}
              isSelected={selectedIds.includes(step.id)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
