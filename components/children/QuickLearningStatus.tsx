import type { AssessmentResult } from "@/types/survey";

type QuickLearningStatusProps = {
  assessment: AssessmentResult | null;
};

export function QuickLearningStatus({ assessment }: QuickLearningStatusProps) {
  const stats = [
    {
      label: "Current Level",
      value: assessment ? `Level ${assessment.predicted_level}` : "Pending",
      icon: "🎯",
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      label: "Survey Status",
      value: assessment ? "Completed" : "Pending",
      icon: "📋",
      bg: "bg-green-50",
      text: "text-green-700",
    },
    {
      label: "Games Played",
      value: "0", // Placeholder for now
      icon: "🎮",
      bg: "bg-violet-50",
      text: "text-violet-700",
    },
    {
      label: "Last Activity",
      value: assessment ? new Date(assessment.created_at).toLocaleDateString() : "Never",
      icon: "🕒",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className={`rounded-3xl ${stat.bg} p-5 flex flex-col items-center text-center gap-2 border border-white/50 shadow-sm transition-transform duration-300 hover:scale-[1.02]`}>
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg shadow-inner">
            {stat.icon}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
            <p className={`text-sm font-bold ${stat.text}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
