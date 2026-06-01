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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-4 bg-white/60 backdrop-blur-xl border border-white/80 px-6 py-3 rounded-full shadow-premium pointer-events-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200 flex items-center justify-center text-xl">🎭</div>
        <div>
          <h1 className="font-display text-sm font-black text-slate-900 tracking-tight">Face Match</h1>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
              {levelConfig.label}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
              Round {currentRound}/{levelConfig.rounds}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 px-5 py-3 rounded-full shadow-premium flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Explorer</p>
            <p className="text-xs font-bold text-slate-700 leading-none">{childName.split(" ")[0]}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-white flex items-center justify-center text-xs font-bold text-blue-600">
            {childName.charAt(0)}
          </div>
        </div>

        <button
          onClick={() => router.push(`/games/${childId}`)}
          className="group w-12 h-12 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-slate-400 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-premium"
          aria-label="Quit game"
        >
          <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
  );
}
