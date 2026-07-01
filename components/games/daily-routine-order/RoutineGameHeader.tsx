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
    <div className="relative z-20 mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex items-start justify-between gap-3 sm:items-center">
        <Link
          href={`/games/${childId}`}
          className="group inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/50 px-3 py-2 text-sm font-bold text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-amber-600 sm:px-4"
        >
          <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="max-[420px]:hidden">Exit Journey</span>
        </Link>

        <div className="flex min-w-[80px] flex-col items-end rounded-2xl border border-white/80 bg-white/50 px-4 py-2 shadow-sm sm:px-5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</span>
          <span className="text-2xl font-black leading-none text-amber-600">{score}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center text-center sm:absolute sm:left-1/2 sm:top-1/2 sm:mt-0 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Daily Routine</h1>
        <div className="mt-1 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="rounded-full border border-amber-100 bg-amber-50/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
            Level {level}
          </span>
        </div>
      </div>
    </div>
  );
}
