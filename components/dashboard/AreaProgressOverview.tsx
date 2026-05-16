"use client";

import { AreaStat, formatAreaName, formatTime } from "@/lib/dashboard";

interface AreaProgressOverviewProps {
  areaStats: AreaStat[];
}

export function AreaProgressOverview({ areaStats }: AreaProgressOverviewProps) {
  const getAreaColorClass = (area: string) => {
    switch (area) {
      case "emotion": return "bg-rose-50 text-rose-600 border-rose-100";
      case "cognitive": return "bg-blue-50 text-blue-600 border-blue-100";
      case "self_awareness": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "mathematical": return "bg-violet-50 text-violet-600 border-violet-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const getAreaBgColorClass = (area: string) => {
    switch (area) {
      case "emotion": return "bg-rose-500";
      case "cognitive": return "bg-blue-500";
      case "self_awareness": return "bg-emerald-500";
      case "mathematical": return "bg-violet-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm">
      <h2 className="text-xl font-black text-slate-800 mb-6">Area Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {areaStats.map((stat) => (
          <div key={stat.area} className={`rounded-3xl border p-5 ${getAreaColorClass(stat.area)} bg-opacity-50`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{formatAreaName(stat.area)}</h3>
                {stat.gamesPlayed > 0 ? (
                  <p className="text-xs font-medium opacity-80 mt-1">
                    {stat.gamesPlayed} activities played
                  </p>
                ) : (
                  <p className="text-xs font-medium opacity-80 mt-1">
                    Not started yet
                  </p>
                )}
              </div>
              {stat.latestLevel && (
                <div className="px-2 py-1 rounded bg-white/50 text-xs font-bold border border-current/20">
                  Lvl {stat.latestLevel}
                </div>
              )}
            </div>

            {stat.gamesPlayed > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-xl p-3 border border-white">
                    <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Avg Score</p>
                    <p className="text-lg font-black">{stat.averageScore}</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-3 border border-white">
                    <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Avg Time</p>
                    <p className="text-lg font-black">{formatTime(stat.averageTime)}</p>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold opacity-80 uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{stat.progressPercent}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/60 rounded-full overflow-hidden border border-white/40">
                    <div 
                      className={`h-full rounded-full ${getAreaBgColorClass(stat.area)}`}
                      style={{ width: `${stat.progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
