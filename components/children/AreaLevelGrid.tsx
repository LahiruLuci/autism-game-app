import { getAreaLabel } from "@/lib/area-recommendations";
import type { AssessmentResult } from "@/types/survey";

type AreaLevelGridProps = {
  assessment: AssessmentResult;
};

type AreaItemProps = {
  label: string;
  score: number;
  level: number;
  bg: string;
  border: string;
  text: string;
  bar: string;
};

function AreaItem({ label, score, level, bg, border, text, bar }: AreaItemProps) {
  const percent = Math.min(100, Math.round((score / 32) * 100));

  const getStatus = (lvl: number) => {
    if (lvl >= 3) return "Doing Well";
    if (lvl === 2) return "Good Progress";
    return "Needs More Practice";
  };

  return (
    <div className={`rounded-[2rem] ${bg} border ${border} p-6 flex flex-col gap-4 shadow-sm transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-black uppercase tracking-widest ${text}`}>{label}</span>
        <span className={`font-display text-xl font-black ${text}`}>Level {level}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Score</span>
          <span className="text-lg font-black text-slate-800 leading-none">{score} / 32</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/60 border border-white ${text}`}>
          {getStatus(level)}
        </div>
      </div>

      <div className="h-2 rounded-full bg-white/60 overflow-hidden shadow-inner mt-2">
        <div
          className={`h-full rounded-full ${bar} transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function AreaLevelGrid({ assessment }: AreaLevelGridProps) {
  return (
    <div className="space-y-4">
      <div className="px-2">
        <p className="text-sm text-slate-500 font-bold mb-4">
          These scores come from the parent survey. Lower scores mean the child may need more guided support.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        <AreaItem
          label="Emotion Skills"
          score={assessment.emotion_score}
          level={assessment.emotion_level || 1}
          bg="bg-indigo-50"
          border="border-indigo-100"
          text="text-indigo-700"
          bar="bg-indigo-400"
        />
        <AreaItem
          label="Cognitive Skills"
          score={assessment.cognitive_score}
          level={assessment.cognitive_level || 1}
          bg="bg-blue-50"
          border="border-blue-100"
          text="text-blue-700"
          bar="bg-blue-400"
        />
        <AreaItem
          label="Self-awareness"
          score={assessment.self_awareness_score}
          level={assessment.self_awareness_level || 1}
          bg="bg-emerald-50"
          border="border-emerald-100"
          text="text-emerald-700"
          bar="bg-emerald-400"
        />
        <AreaItem
          label="Mathematical Skills"
          score={assessment.math_score}
          level={assessment.math_level || 1}
          bg="bg-violet-50"
          border="border-violet-100"
          text="text-violet-700"
          bar="bg-violet-400"
        />
      </div>
    </div>
  );
}
