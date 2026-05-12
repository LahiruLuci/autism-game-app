import clsx from "clsx";
import type { SurveyAnswerOption as SurveyAnswerOptionType } from "@/types/survey";

type SurveyAnswerOptionProps = {
  option: SurveyAnswerOptionType;
  isSelected: boolean;
  onSelect: () => void;
};

export function SurveyAnswerOption({
  option,
  isSelected,
  onSelect,
}: SurveyAnswerOptionProps) {
  return (
    <button
      aria-pressed={isSelected}
      className={clsx(
        "flex min-h-12 w-full items-center justify-between rounded-2xl border-2 px-4 py-3 text-left text-base font-semibold transition active:scale-[0.99]",
        isSelected
          ? "border-primary-blue bg-blue-50 text-blue-800 ring-4 ring-blue-100"
          : "border-slate-100 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/60",
      )}
      onClick={onSelect}
      type="button"
    >
      <span>{option.label}</span>
      <span
        className={clsx(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs",
          isSelected
            ? "border-primary-blue bg-primary-blue text-white"
            : "border-slate-200 text-transparent",
        )}
      >
        OK
      </span>
    </button>
  );
}
