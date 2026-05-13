"use client";

import { useRouter } from "next/navigation";
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
    <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl">🎭</div>
        <div>
          <h1 className="font-display text-lg font-bold text-slate-900 leading-none tracking-tight">Face Match</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
              {levelConfig.label}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Round {currentRound} of {levelConfig.rounds}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Playing as</p>
          <p className="text-sm font-bold text-slate-700 leading-none">{childName.split(" ")[0]}</p>
        </div>
        <button 
          onClick={() => router.push(`/games/${childId}`)}
          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all duration-300"
          aria-label="Quit game"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
  );
}
