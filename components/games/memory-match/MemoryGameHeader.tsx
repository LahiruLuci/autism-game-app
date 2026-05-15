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
    <div className="w-full max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
      <Link
        href={`/games/${childId}`}
        className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-700 transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Exit Journey</span>
      </Link>

      <div className="flex flex-col items-center">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Memory Match</h1>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
          Level {level}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</span>
        <span className="text-2xl font-black text-blue-600">{score}</span>
      </div>
    </div>
  );
}
