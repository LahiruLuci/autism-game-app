"use client";

import { useRouter } from "next/navigation";
import { StoryLevelConfig } from "@/types/games/emotion-story-choice";

type StoryHeaderProps = {
  childName: string;
  levelConfig: StoryLevelConfig;
  currentRound: number;
  childId: string;
};

export function StoryHeader({ childName, levelConfig, currentRound, childId }: StoryHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl">📖</div>
        <div>
          <h1 className="font-display text-lg font-bold text-slate-900 leading-none tracking-tight">Story Choice</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-widest">
              {levelConfig.label}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Round {currentRound} of {levelConfig.rounds}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push(`/games/${childId}`)}
          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
  );
}
