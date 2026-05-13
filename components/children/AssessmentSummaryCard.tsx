import Link from "next/link";
import type { AssessmentResult } from "@/types/survey";

type AssessmentSummaryCardProps = {
  assessment: AssessmentResult | null;
  childId: string;
};

export function AssessmentSummaryCard({ assessment, childId }: AssessmentSummaryCardProps) {
  if (!assessment) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50/50 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-3xl bg-white border border-slate-100 flex items-center justify-center text-2xl mx-auto mb-6 shadow-sm">
          📝
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">
          Survey not completed yet
        </h2>
        <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8 leading-relaxed">
          Complete the developmental support survey to unlock suitable learning games and get personalized recommendations.
        </p>
        <Link
          href={`/survey/${childId}`}
          className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-blue-500 text-white text-sm font-extrabold shadow-lg shadow-blue-200 hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300"
        >
          Start Survey
        </Link>
      </div>
    );
  }

  // Max score is 128 (8 questions * 4 areas * 4 max)
  const MAX_TOTAL = 128;

  return (
    <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm">
      <h2 className="font-display text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center text-sm">✓</span>
        Current Assessment Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
            Suggested Support Level
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-blue-700">
              {assessment.predicted_level}
            </span>
            <span className="text-sm font-bold text-blue-600/60 uppercase">
              {assessment.predicted_level === 1 ? "Foundational" : assessment.predicted_level === 2 ? "Developing" : "Advanced"}
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-violet-50/50 border border-violet-100">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
            Total Score
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-violet-700">
              {assessment.total_score}
            </span>
            <span className="text-sm font-bold text-violet-600/60 uppercase">
              out of {MAX_TOTAL}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
