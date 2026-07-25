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
    <div className="w-full space-y-4">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Choose The Steps</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:flex lg:flex-wrap lg:justify-center lg:gap-5">
        {steps.map((step) => (
          <div key={step.id} className="lg:w-36 xl:w-40">
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
