"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { EmotionLevelConfig } from "@/types/games/emotion-face-match";

type EmotionGameHeaderProps = {
  childName: string;
  levelConfig: EmotionLevelConfig;
  currentRound: number;
  childId: string;
};

export function EmotionGameHeader({ childName, levelConfig, currentRound, childId }: EmotionGameHeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
      <button
        onClick={() => router.push(`/games/${childId}`)}
        className="flex items-center gap-2 text-slate-600 font-bold hover:text-rose-500 transition-colors bg-white/50 px-4 py-2 rounded-full border border-slate-100"
      >
        <ChevronLeft size={20} className="stroke-[3px]" />
        <span className="text-sm">Exit Journey</span>
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Face Match</h1>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100">
          Level {levelConfig.level} — {levelConfig.label}
        </span>
      </div>

      <div className="flex items-center gap-3 bg-white/50 px-5 py-2 rounded-2xl border border-slate-100 min-w-[120px] justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Explorer</span>
          <span className="text-sm font-black text-slate-800">{childName.split(" ")[0]}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-100 border border-white flex items-center justify-center text-xs font-black text-blue-600 shadow-sm">
          {childName.charAt(0)}
        </div>
      </div>
    </div>
  );
}
