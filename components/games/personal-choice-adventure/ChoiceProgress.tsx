"use client";

interface ChoiceProgressProps {
  current: number;
  total: number;
}

export function ChoiceProgress({ current, total }: ChoiceProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 rounded-[1.75rem] border border-white/75 bg-white/75 px-5 py-4 shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur-md lg:px-6 lg:py-5">
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Round {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full border border-white bg-slate-100 p-1 shadow-inner">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400 shadow-sm transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
