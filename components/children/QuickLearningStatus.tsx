"use client";

import type { AssessmentResult } from "@/types/survey";

type QuickLearningStatusProps = {
  assessment: AssessmentResult | null;
  gameSummary: {
    totalGamesPlayed: number;
    latestActivityDate: string | null;
    averageAccuracy: number;
    latestLevel: number | null;
    latestArea: string | null;
  } | null;
};

export function QuickLearningStatus({ assessment, gameSummary }: QuickLearningStatusProps) {
  const stats = [
    {
      label: "Support Level",
      value: assessment ? `Level ${assessment.predicted_level}` : "Pending",
      icon: "🎯",
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      label: "Survey Status",
      value: assessment ? "Completed" : "Not Completed",
      icon: "📋",
      bg: "bg-green-50",
      text: "text-green-700",
    },
    {
      label: "Games Played",
      value: gameSummary && gameSummary.totalGamesPlayed > 0
        ? `${gameSummary.totalGamesPlayed}`
        : "No games yet",
      icon: "🎮",
      bg: "bg-violet-50",
      text: "text-violet-700",
    },
    {
      label: "Recent Activity",
      value: gameSummary && gameSummary.latestActivityDate
        ? new Date(gameSummary.latestActivityDate).toLocaleDateString()
        : "No activity yet",
      icon: "🕒",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`rounded-3xl ${stat.bg} p-5 flex flex-col items-center text-center gap-2 border border-white/50 shadow-sm transition-transform duration-300 hover:scale-[1.02]`}>
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg shadow-inner">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
              <p className={`text-sm font-bold ${stat.text}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {gameSummary && gameSummary.totalGamesPlayed > 0 && (
        <div className="rounded-3xl bg-indigo-50 p-5 border border-white/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Average Accuracy</p>
              <p className="text-sm font-bold text-indigo-700">{gameSummary.averageAccuracy}%</p>
            </div>
            <div className="text-2xl">📈</div>
          </div>
        </div>
      )}

      <div className="px-2">
        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
          {gameSummary && gameSummary.totalGamesPlayed > 0
            ? "Your child has started learning activities. Review accuracy and activity history to understand progress."
            : "No games have been played yet. Start with recommended activities to begin tracking progress."}
        </p>
      </div>
    </div>
  );
}
