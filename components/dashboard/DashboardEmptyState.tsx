"use client";

import { Activity, ClipboardList } from "lucide-react";
import Link from "next/link";

interface DashboardEmptyStateProps {
  childId: string;
  type: "no_scores" | "no_assessment";
}

export function DashboardEmptyState({ childId, type }: DashboardEmptyStateProps) {
  if (type === "no_assessment") {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm min-h-[400px]">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mb-6">
          <ClipboardList size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Survey Not Completed</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Complete the initial survey to unlock personalized learning activities and full progress insights for your child.
        </p>
        <Link
          href={`/survey/${childId}`}
          className="px-8 py-3 rounded-full bg-indigo-600 text-white font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-indigo-700 transition-colors"
        >
          Start Survey
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm min-h-[400px]">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6">
        <Activity size={32} />
      </div>
      <h2 className="text-2xl font-black text-slate-800 mb-2">No Activities Yet</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        Your child hasn't completed any learning activities yet. Start a game to see progress appear here.
      </p>
      <Link
        href={`/games/${childId}`}
        className="px-8 py-3 rounded-full bg-emerald-600 text-white font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-emerald-700 transition-colors"
      >
        Go to Activities
      </Link>
    </div>
  );
}
