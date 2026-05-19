"use client";

import { RecommendedActivity } from "@/lib/dashboard";
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";

interface RecommendedNextActivityProps {
  childId: string;
  recommendation: RecommendedActivity | null;
}

export function RecommendedNextActivity({ childId, recommendation }: RecommendedNextActivityProps) {
  if (!recommendation) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/30 rounded-[2rem] p-6 sm:p-8 border border-amber-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
          <Lightbulb size={20} />
        </div>
        <h2 className="text-xl font-black text-slate-800">Recommended Next Activity</h2>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-black text-amber-900 leading-tight mb-3">
          {recommendation.game.game_name} — Level {recommendation.game.level}
        </h3>
        <p className="text-amber-800/80 font-medium leading-relaxed mb-8">
          {recommendation.reason}
        </p>
        
        <Link 
          href={`/games/${childId}/${recommendation.game.game_slug}?level=${recommendation.game.level}`}
          className="mt-auto inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-amber-500 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-colors"
        >
          Continue Recommended Activity
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
