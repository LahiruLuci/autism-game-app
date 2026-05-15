"use client";

interface ShapeProgressProps {
  current: number;
  total: number;
}

export function ShapeProgress({ current, total }: ShapeProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto space-y-3 px-6 pt-8">
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Activity {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 p-0.5 shadow-inner">
        <div 
          className="h-full bg-slate-900 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
