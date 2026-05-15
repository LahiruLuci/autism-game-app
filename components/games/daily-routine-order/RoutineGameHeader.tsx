"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface RoutineGameHeaderProps {
  childId: string;
  score: number;
  level: number;
}

export function RoutineGameHeader({ childId, score, level }: RoutineGameHeaderProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 flex items-center justify-between relative z-50">
      <Link
        href={`/games/${childId}`}
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white/80 text-sm font-bold text-slate-500 hover:text-amber-600 hover:-translate-y-0.5 transition-all duration-300"
      >
        <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span>Exit Journey</span>
      </Link>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Daily Routine</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 bg-amber-50/50 px-3 py-1 rounded-full border border-amber-100">
            Level {level}
          </span>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/80 shadow-sm flex flex-col items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</span>
        <span className="text-2xl font-black text-amber-600">{score}</span>
      </div>
    </div>
  );
}
