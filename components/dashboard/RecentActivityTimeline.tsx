"use client";

import { Game, GameScore } from "@/types/game";
import { formatDate } from "@/lib/dashboard";
import { Activity } from "lucide-react";

interface RecentActivityTimelineProps {
  scores: GameScore[];
  games: Game[];
}

export function RecentActivityTimeline({ scores, games }: RecentActivityTimelineProps) {
  if (scores.length === 0) return null;

  const recentScores = scores.slice(0, 5);

  const getGameName = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    return game ? game.game_name : "Learning Activity";
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm h-full">
      <h2 className="text-xl font-black text-slate-800 mb-6">Recent Activity</h2>
      
      <div className="space-y-6">
        {recentScores.map((score, index) => (
          <div key={score.id} className="flex gap-4 relative">
            {/* Timeline line */}
            {index < recentScores.length - 1 && (
              <div className="absolute top-10 left-5 w-0.5 h-full -mb-6 bg-slate-100"></div>
            )}
            
            <div className="relative z-10 w-10 h-10 rounded-full bg-indigo-50 border-4 border-white flex items-center justify-center text-indigo-500 shrink-0 shadow-sm">
              <Activity size={16} />
            </div>
            
            <div className="flex-1 pt-2">
              <h3 className="font-bold text-slate-800 text-sm">
                {getGameName(score.game_id)} <span className="text-slate-400 font-medium">— Level {score.level}</span>
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Completed with score <span className="font-black text-indigo-600">{score.final_score}</span>
              </p>
              <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-widest">
                {formatDate(score.played_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
