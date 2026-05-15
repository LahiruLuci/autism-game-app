"use client";

interface PatternProgressProps {
  current: number;
  total: number;
}

export function PatternProgress({ current, total }: PatternProgressProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full max-w-xl mx-auto px-6 py-8 space-y-4">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pattern Progress</span>
          <p className="text-sm font-bold text-slate-600">
            Round {current} of {total}
          </p>
        </div>
        <span className="text-xl font-black text-blue-600">{percentage}%</span>
      </div>

      <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-white p-1">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
