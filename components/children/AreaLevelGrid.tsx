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
  return (
    <div className={`rounded-3xl ${bg} border ${border} p-5 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${text}`}>{label}</span>
        <span className={`font-display text-xl font-bold ${text}`}>Lvl {level}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold text-slate-700">{score} / 32</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${text} opacity-70`}>
          {level === 3 ? "Strong area" : level === 2 ? "Developing" : "Needs support"}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/60 overflow-hidden shadow-inner">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AreaItem
        label="Emotion"
        score={assessment.emotion_score}
        level={assessment.emotion_level || 1}
        bg="bg-pink-50"
        border="border-pink-100"
        text="text-pink-700"
        bar="bg-pink-400"
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
        bg="bg-green-50"
        border="border-green-100"
        text="text-green-700"
        bar="bg-green-400"
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
  );
}
