import { Button } from "@/components/ui/Button";

type SurveyNavigationProps = {
  canGoBack: boolean;
  isLastQuestion: boolean;
  isSaving: boolean;
  onBack: () => void;
  onNext: () => void;
};

export function SurveyNavigation({
  canGoBack,
  isLastQuestion,
  isSaving,
  onBack,
  onNext,
}: SurveyNavigationProps) {
  return (
    <div className="sticky bottom-0 -mx-4 mt-6 border-t border-blue-100 bg-white/90 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          disabled={!canGoBack || isSaving}
          onClick={onBack}
          type="button"
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          isLoading={isSaving}
          loadingText={
            isLastQuestion ? "Calculating result..." : "Saving responses..."
          }
          onClick={onNext}
          type="button"
        >
          {isLastQuestion ? "Submit Survey" : "Next"}
        </Button>
      </div>
    </div>
  );
}
