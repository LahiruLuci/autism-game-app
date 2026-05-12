type SurveyProgressBarProps = {
  current: number;
  total: number;
};

export function SurveyProgressBar({ current, total }: SurveyProgressBarProps) {
  const progress = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-container">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
