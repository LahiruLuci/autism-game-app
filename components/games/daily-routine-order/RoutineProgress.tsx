"use client";

interface RoutineProgressProps {
  current: number;
  total: number;
}

export function RoutineProgress({ current, total }: RoutineProgressProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full max-w-xl mx-auto px-6 py-8 space-y-4">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity Progress</span>
          <p className="text-sm font-bold text-slate-600">
            Routine {current} of {total}
          </p>
        </div>
        <span className="text-xl font-black text-amber-600">{percentage}%</span>
      </div>

      <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-white p-1">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
