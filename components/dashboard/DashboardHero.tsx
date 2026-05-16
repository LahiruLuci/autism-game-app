"use client";

import { ChildProfile } from "@/types/child";
import { formatDate } from "@/lib/dashboard";
import { User, Calendar, Activity } from "lucide-react";

interface DashboardHeroProps {
  child: ChildProfile;
  level: number;
  lastSurveyDate: string | null;
  totalActivities: number;
}

export function DashboardHero({ child, level, lastSurveyDate, totalActivities }: DashboardHeroProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50/50 rounded-[2rem] p-8 sm:p-10 shadow-sm border border-indigo-100/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-indigo-100/30 rounded-full blur-2xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-4xl shrink-0 overflow-hidden text-indigo-200">
          <User size={48} className="text-indigo-300" />
        </div>
        
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            {child.name}'s Learning Progress
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
            A calm summary of learning activities, progress, and recommended next steps to support {child.name}'s journey.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/50 text-indigo-700 text-xs font-bold border border-indigo-200/50">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Level {level}
            </div>
            
            {lastSurveyDate && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200/50">
                <Calendar size={14} />
                Last Survey: {formatDate(lastSurveyDate)}
              </div>
            )}
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/50">
              <Activity size={14} />
              {totalActivities} Activities Completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
