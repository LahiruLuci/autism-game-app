"use client";

import { motion } from "framer-motion";
import { X, Trophy } from "lucide-react";
import Link from "next/link";

interface ChoiceAdventureHeaderProps {
  childId: string;
  score: number;
  level: number;
}

export function ChoiceAdventureHeader({ childId, score, level }: ChoiceAdventureHeaderProps) {
  return (
    <header className="relative z-20 w-full max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-slate-100">
          🌟
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Choice Adventure</h1>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
              Level {level}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Self-Awareness
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm">
          <Trophy size={16} className="text-amber-500" />
          <span className="text-sm font-black text-slate-700">{score}</span>
        </div>
        
        <Link
          href={`/games/${childId}`}
          className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md border border-white text-slate-400 hover:text-slate-600 hover:bg-white transition-all flex items-center justify-center shadow-sm"
        >
          <X size={20} />
        </Link>
      </div>
    </header>
  );
}
