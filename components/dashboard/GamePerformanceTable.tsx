"use client";

import { GameScore } from "@/types/score";
import { Game } from "@/types/game";
import { formatAreaName, formatDate, formatTime } from "@/lib/dashboard";

interface GamePerformanceTableProps {
  scores: GameScore[];
  games: Game[];
}

export function GamePerformanceTable({ scores, games }: GamePerformanceTableProps) {
  if (scores.length === 0) return null;

  const getGameName = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    return game ? game.name : "Unknown Game";
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100">
        <h2 className="text-xl font-black text-slate-800">Activity History</h2>
      </div>

      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-widest font-bold">
              <th className="px-6 py-4 font-bold border-b border-slate-100">Game</th>
              <th className="px-6 py-4 font-bold border-b border-slate-100">Area</th>
              <th className="px-6 py-4 font-bold border-b border-slate-100">Level</th>
              <th className="px-6 py-4 font-bold border-b border-slate-100">Score</th>
              <th className="px-6 py-4 font-bold border-b border-slate-100">Time</th>
              <th className="px-6 py-4 font-bold border-b border-slate-100">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {scores.slice(0, 10).map((score) => (
              <tr key={score.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">
                  {getGameName(score.game_id)}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-xs font-bold">
                    {formatAreaName(score.area)}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-600 text-center">
                  {score.level}
                </td>
                <td className="px-6 py-4">
                  <span className="font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                    {score.final_score}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">
                  {formatTime(score.time_taken)}
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">
                  {formatDate(score.played_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden flex flex-col divide-y divide-slate-100">
        {scores.slice(0, 10).map((score) => (
          <div key={score.id} className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-800">{getGameName(score.game_id)}</h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">{formatDate(score.played_at)}</p>
              </div>
              <span className="font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md text-sm">
                {score.final_score}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-bold mt-1">
              <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                {formatAreaName(score.area)}
              </span>
              <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                Lvl {score.level}
              </span>
              <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                {formatTime(score.time_taken)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {scores.length > 10 && (
        <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Showing latest 10 activities</p>
        </div>
      )}
    </div>
  );
}
