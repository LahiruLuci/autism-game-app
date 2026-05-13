import { getAreaLabel } from "@/lib/area-recommendations";
import type { AssessmentResult } from "@/types/survey";

type AreaRecommendationCardProps = {
  assessment: AssessmentResult;
};

export function AreaRecommendationCard({ assessment }: AreaRecommendationCardProps) {
  const mainSupport = assessment.main_support_area;
  const strongestArea = assessment.strongest_area;

  if (!mainSupport || !strongestArea) return null;

  return (
    <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
        Personalized Area Recommendation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 rounded-3xl bg-pink-50 border border-pink-100">
          <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2">Main Support Area</p>
          <p className="text-xl font-bold text-pink-700">{getAreaLabel(mainSupport)}</p>
          <p className="text-xs font-semibold text-pink-600/70 mt-1 uppercase tracking-wider italic">Needs more guided practice</p>
        </div>
        <div className="p-6 rounded-3xl bg-green-50 border border-green-100">
          <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-2">Strongest Area</p>
          <p className="text-xl font-bold text-green-700">{getAreaLabel(strongestArea)}</p>
          <p className="text-xs font-semibold text-green-600/70 mt-1 uppercase tracking-wider italic">Stronger learning area</p>
        </div>
      </div>

      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0 shadow-inner">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="space-y-4">
          <p className="text-slate-600 text-lg font-medium leading-relaxed italic">
            "Based on the latest survey, {getAreaLabel(mainSupport)} may benefit from more guided practice, while {getAreaLabel(strongestArea)} appears to be a stronger area. We suggest starting with foundational activities in the support area and continuing suitable activities in the stronger area."
          </p>
        </div>
      </div>
    </div>
  );
}
