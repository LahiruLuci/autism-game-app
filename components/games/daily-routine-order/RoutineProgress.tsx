"use client";

interface RoutineProgressProps {
  current: number;
  total: number;
}

export function RoutineProgress({ current, total }: RoutineProgressProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 rounded-[1.75rem] border border-white/75 bg-white/75 px-5 py-4 shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur-md lg:px-6 lg:py-5">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity Progress</span>
          <p className="text-sm font-bold text-slate-600">
            Routine {current} of {total}
          </p>
        </div>
        <span className="text-xl font-black text-amber-600">{percentage}%</span>
      </div>

      <div className="h-4 overflow-hidden rounded-full border border-white bg-slate-100 p-1 shadow-inner">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 shadow-sm transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
