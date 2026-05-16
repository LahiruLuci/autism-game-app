"use client";

import { GameScore } from "@/types/score";
import { AreaStat, formatAreaName } from "@/lib/dashboard";

interface ChartProps {
  scores?: GameScore[];
  areaStats?: AreaStat[];
}

export function ScoreTrendChart({ scores }: ChartProps) {
  if (!scores || scores.length < 3) {
    return (
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm h-full flex flex-col items-center justify-center min-h-[300px]">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Score Trend</h3>
        <p className="text-slate-400 text-sm text-center">
          More activities needed to show trend chart.
        </p>
      </div>
    );
  }

  // Use up to 10 latest scores for the chart
  const recentScores = [...scores].slice(0, 10).reverse();
  const maxScore = Math.max(...recentScores.map(s => s.final_score), 100);

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm h-full min-h-[300px] flex flex-col">
      <h3 className="text-lg font-black text-slate-800 mb-6">Learning Trend</h3>
      <div className="flex-1 w-full flex items-end gap-2 h-48 relative pt-4">
        {/* Y-axis rough lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
          <div className="border-t border-slate-100 border-dashed w-full"></div>
          <div className="border-t border-slate-100 border-dashed w-full"></div>
          <div className="border-t border-slate-100 border-dashed w-full"></div>
        </div>
        
        {/* Bars (instead of line chart, a simple bar trend is easier with pure CSS) */}
        {recentScores.map((score, index) => {
          const heightPercent = Math.max((score.final_score / maxScore) * 100, 5);
          return (
            <div key={score.id} className="relative flex-1 flex flex-col items-center group h-full justify-end z-10 pb-6">
              <div 
                className="w-full max-w-[3rem] bg-indigo-200 group-hover:bg-indigo-500 rounded-t-md transition-all duration-300 relative"
                style={{ height: `${heightPercent}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-20">
                  Score: {score.final_score}
                </div>
              </div>
              <div className="absolute bottom-0 text-[10px] font-bold text-slate-400 uppercase">
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AreaAverageChart({ areaStats }: ChartProps) {
  if (!areaStats || areaStats.length === 0) return null;

  const data = areaStats.map(stat => ({
    name: formatAreaName(stat.area).split(" ")[0], // Short name
    score: stat.averageScore,
    area: stat.area,
  }));

  const getBarColor = (area: string) => {
    switch (area) {
      case "emotion": return "bg-rose-500";
      case "cognitive": return "bg-blue-500";
      case "self_awareness": return "bg-emerald-500";
      case "mathematical": return "bg-violet-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm h-full min-h-[300px] flex flex-col">
      <h3 className="text-lg font-black text-slate-800 mb-6">Area Averages</h3>
      <div className="flex-1 w-full flex items-end gap-4 h-48 relative pt-4">
        {/* Y-axis rough lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
          <div className="border-t border-slate-100 border-dashed w-full"></div>
          <div className="border-t border-slate-100 border-dashed w-full"></div>
          <div className="border-t border-slate-100 border-dashed w-full"></div>
        </div>

        {data.map((entry, index) => {
          const heightPercent = Math.max((entry.score / 100) * 100, 5);
          return (
            <div key={index} className="relative flex-1 flex flex-col items-center group h-full justify-end z-10 pb-6">
              <div 
                className={`w-full max-w-[4rem] ${getBarColor(entry.area)} rounded-t-lg transition-all duration-300 opacity-90 group-hover:opacity-100 relative shadow-sm`}
                style={{ height: `${heightPercent}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
                  {entry.score}
                </div>
              </div>
              <div className="absolute bottom-0 text-xs font-bold text-slate-500 truncate w-full text-center">
                {entry.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
