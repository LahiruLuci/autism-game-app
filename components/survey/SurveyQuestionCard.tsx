import { SurveyAnswerOption } from "./SurveyAnswerOption";
import type {
  SurveyAnswerOption as SurveyAnswerOptionType,
  SurveyQuestion,
} from "@/types/survey";

type SurveyQuestionCardProps = {
  answerOptions: SurveyAnswerOptionType[];
  question: SurveyQuestion;
  selectedScore?: number;
  onSelectAnswer: (score: number) => void;
};

export function SurveyQuestionCard({
  answerOptions,
  question,
  selectedScore,
  onSelectAnswer,
}: SurveyQuestionCardProps) {
  return (
    <section className="rounded-3xl border border-border-soft bg-white p-5 shadow-premium sm:p-7">
      <p className="instruction-text mb-6">{question.question}</p>
      <div className="grid grid-cols-1 gap-3">
        {answerOptions.map((option) => (
          <SurveyAnswerOption
            isSelected={selectedScore === option.score}
            key={option.label}
            onSelect={() => onSelectAnswer(option.score)}
            option={option}
          />
        ))}
      </div>
    </section>
  );
}
