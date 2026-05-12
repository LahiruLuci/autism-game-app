import { Button } from "@/components/ui/Button";

type SurveyIntroCardProps = {
  childName: string;
  onStart: () => void;
};

export function SurveyIntroCard({ childName, onStart }: SurveyIntroCardProps) {
  return (
    <section className="rounded-3xl border border-blue-100 bg-white p-6 text-center shadow-premium sm:p-8">
      <span className="mb-4 inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold uppercase text-green-700">
        Parent Survey
      </span>
      <h1 className="display-heading mb-4">Supportive Learning Survey</h1>
      <p className="body-text mx-auto mb-8 max-w-2xl">
        Answer a few questions to help us recommend supportive learning
        activities for {childName}.
      </p>
      <Button className="sm:w-auto" onClick={onStart} type="button">
        Start Survey
      </Button>
    </section>
  );
}
