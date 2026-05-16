"use client";

import { DashboardSummary, formatTime } from "@/lib/dashboard";
import { CheckCircle2, Star, Clock, Target } from "lucide-react";

interface SummaryCardsProps {
  summary: DashboardSummary;
  level: number;
}

export function SummaryCards({ summary, level }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Card 1 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <p className="text-3xl font-black text-slate-800">{summary.totalActivities}</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Activities Completed</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
          <Star size={24} />
        </div>
        <div>
          <p className="text-3xl font-black text-slate-800">{summary.averageScore}</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Average Score</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
          <Clock size={24} />
        </div>
        <div>
          <p className="text-3xl font-black text-slate-800">{formatTime(summary.averageTime)}</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Average Time</p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
          <Target size={24} />
        </div>
        <div>
          <p className="text-3xl font-black text-slate-800">Lvl {level}</p>
          <p className="text-sm font-bold text-slate-400 mt-1">Current Level</p>
        </div>
      </div>
    </div>
  );
}
