import type { SurveyArea } from "@/types/survey";

const areaLabels: Record<SurveyArea, string> = {
  cognitive: "Cognitive Skills",
  emotion: "Emotion",
  mathematical: "Mathematical Skills",
  self_awareness: "Self-awareness",
};

type SurveySectionTitleProps = {
  area: SurveyArea;
  current: number;
  total: number;
};

export function SurveySectionTitle({
  area,
  current,
  total,
}: SurveySectionTitleProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="mb-2 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase text-blue-600">
          {areaLabels[area]}
        </span>
        <h1 className="section-heading">Supportive Learning Survey</h1>
      </div>
      <span className="text-sm font-bold text-slate-500">
        Question {current} of {total}
      </span>
    </div>
  );
}
