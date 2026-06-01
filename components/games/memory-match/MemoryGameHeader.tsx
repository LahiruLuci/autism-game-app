"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface MemoryGameHeaderProps {
  childId: string;
  childName: string;
  score: number;
  level: number;
}

export function MemoryGameHeader({ childId, childName, score, level }: MemoryGameHeaderProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
      <Link
        href={`/games/${childId}`}
        className="flex items-center gap-2 text-slate-600 font-bold hover:text-rose-500 transition-colors bg-white/50 px-4 py-2 rounded-full border border-slate-100"
      >
        <ChevronLeft size={20} className="stroke-[3px]" />
        <span className="text-sm">Exit Journey</span>
      </Link>

      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Memory Match</h1>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100">
          Level {level}
        </span>
      </div>

      <div className="flex flex-col items-end bg-white/50 px-5 py-2 rounded-2xl border border-slate-100 min-w-[80px]">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Score</span>
        <span className="text-2xl font-black text-blue-700 leading-none">{score}</span>
      </div>
    </div>
  );
}
