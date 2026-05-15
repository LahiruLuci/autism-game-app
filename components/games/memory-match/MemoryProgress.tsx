"use client";

interface MemoryProgressProps {
  matchedPairs: number;
  totalPairs: number;
}

export function MemoryProgress({ matchedPairs, totalPairs }: MemoryProgressProps) {
  const percentage = Math.round((matchedPairs / totalPairs) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 space-y-4">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Journey Progress</span>
          <p className="text-sm font-bold text-slate-600">
            {matchedPairs} of {totalPairs} pairs found
          </p>
        </div>
        <span className="text-xl font-black text-blue-600">{percentage}%</span>
      </div>

      <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-white">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-700 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
