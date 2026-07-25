"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface MemoryGameHeaderProps {
  childId: string;
  childName: string;
  score: number;
  level: number;
}

export function MemoryGameHeader({ childId, score, level }: MemoryGameHeaderProps) {
  const helperText = "Tap a card and find the matching card.";

  return (
    <div className="relative z-20 mx-auto w-full max-w-[1180px] px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex items-start justify-between gap-3 sm:items-center">
        <Link
          href={`/games/${childId}`}
          className="flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-2 font-bold text-slate-600 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-md transition-colors hover:text-rose-500 sm:px-4"
        >
          <ChevronLeft size={20} className="stroke-[3px]" />
          <span className="text-sm max-[420px]:hidden">Exit Journey</span>
        </Link>

        <div className="flex min-w-[86px] flex-col items-end rounded-2xl border border-white/80 bg-white/85 px-4 py-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Score</span>
          <span className="text-2xl font-black leading-none text-blue-700">{score}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center text-center sm:absolute sm:left-1/2 sm:top-1/2 sm:mt-0 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <h1 className="text-2xl font-black tracking-tight text-slate-800">
          Memory Match
        </h1>
        <span className="rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
          Level {level}
        </span>
        {helperText && (
          <p className="mt-2 rounded-full border border-sky-100 bg-white/75 px-4 py-2 text-xs font-black leading-relaxed text-slate-600 shadow-[0_10px_22px_rgba(37,99,235,0.08)] backdrop-blur-md sm:max-w-[360px]">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}
