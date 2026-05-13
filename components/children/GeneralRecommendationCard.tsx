import Link from "next/link";
import type { AssessmentResult } from "@/types/survey";

type GeneralRecommendationCardProps = {
  assessment: AssessmentResult;
  childId: string;
};

export function GeneralRecommendationCard({ assessment, childId }: GeneralRecommendationCardProps) {
  return (
    <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
        General Learning Recommendation
      </h2>

      <div className="flex items-start gap-5 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0 shadow-inner">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            {assessment.recommendation || `Based on the latest survey, Level ${assessment.predicted_level} activities are suggested for this child. The child can continue supportive games matched to this level.`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href={`/games/${childId}`}
          className="inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-500 text-white text-sm font-extrabold shadow-sm hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
        >
          Continue to Games
        </Link>
        <Link
          href={`/survey/${childId}`}
          className="inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-extrabold shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
        >
          Retake Survey
        </Link>
      </div>
    </div>
  );
}
