import { getAreaLabel } from "@/lib/area-recommendations";
import type { AssessmentResult } from "@/types/survey";
import { AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";

type AreaRecommendationCardProps = {
  assessment: AssessmentResult;
};

export function AreaRecommendationCard({ assessment }: AreaRecommendationCardProps) {
  const mainSupport = assessment.main_support_area;
  const strongestArea = assessment.strongest_area;

  if (!mainSupport || !strongestArea) return null;

  const mainLabel = getAreaLabel(mainSupport);
  const strongLabel = getAreaLabel(strongestArea);

  return (
    <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm space-y-8">
      <h2 className="font-display text-2xl font-bold text-slate-900">
        Learning Recommendation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Block 1: Needs More Practice */}
        <div className="p-6 rounded-3xl bg-rose-50 border border-rose-100 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-500" />
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Needs More Practice</p>
          </div>
          <div>
            <p className="text-xl font-black text-rose-700">{mainLabel}</p>
            <p className="text-xs font-bold text-rose-600/70 mt-1">Your child may need more guided practice in this area.</p>
          </div>
        </div>

        {/* Block 2: Doing Well */}
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Doing Well</p>
          </div>
          <div>
            <p className="text-xl font-black text-emerald-700">{strongLabel}</p>
            <p className="text-xs font-bold text-emerald-600/70 mt-1">Your child showed stronger performance here.</p>
          </div>
        </div>

        {/* Block 3: Suggested Focus */}
        <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-blue-500" />
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Suggested Focus</p>
          </div>
          <div>
            <p className="text-xl font-black text-blue-700">Start with {mainLabel} Level 1</p>
            <p className="text-xs font-bold text-blue-600/70 mt-1">Practice short activities regularly and review progress after each session.</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
        <p className="text-slate-600 text-base font-medium leading-relaxed">
          Based on the latest survey, <span className="text-slate-900 font-bold">{mainLabel}</span> is the main area to support.
          <span className="text-slate-900 font-bold ml-1">{strongLabel}</span> is currently stronger.
          We recommend starting with short Level 1 {mainLabel} activities and continuing {strongLabel} activities to maintain progress.
        </p>
      </div>
    </div>
  );
}
