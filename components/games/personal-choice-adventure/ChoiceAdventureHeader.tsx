"use client";

import { ChevronLeft, Trophy } from "lucide-react";
import Link from "next/link";

interface ChoiceAdventureHeaderProps {
  childId: string;
  score: number;
  level: number;
}

export function ChoiceAdventureHeader({ childId, score, level }: ChoiceAdventureHeaderProps) {
  return (
    <header className="relative z-20 mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex items-start justify-between gap-3 sm:items-center">
        <Link
          href={`/games/${childId}`}
          className="flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-2 font-bold text-slate-500 transition-colors hover:text-slate-600 sm:px-4"
        >
          <ChevronLeft size={20} className="stroke-[3px]" />
          <span className="text-sm max-[420px]:hidden">Exit Journey</span>
        </Link>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-2 shadow-sm sm:px-5">
          <Trophy size={16} className="text-amber-500" />
          <span className="text-sm font-black text-slate-700">{score}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center text-center sm:absolute sm:left-1/2 sm:top-1/2 sm:mt-0 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <h1 className="text-xl font-black tracking-tight text-slate-800 sm:text-2xl">Choice Adventure</h1>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-blue-600">
            Level {level}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Self-Awareness
          </span>
        </div>
      </div>
    </header>
  );
}
