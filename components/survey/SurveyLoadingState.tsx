import { LoadingState } from "@/components/ui/LoadingState";

type SurveyLoadingStateProps = {
  message?: string;
};

export function SurveyLoadingState({
  message = "Loading survey...",
}: SurveyLoadingStateProps) {
  return (
    <div className="rounded-3xl border border-border-soft bg-white p-8 shadow-soft">
      <LoadingState message={message} />
    </div>
  );
}
