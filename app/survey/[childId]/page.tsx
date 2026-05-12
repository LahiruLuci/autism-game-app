"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SurveyIntroCard } from "@/components/survey/SurveyIntroCard";
import { SurveyLoadingState } from "@/components/survey/SurveyLoadingState";
import { SurveyNavigation } from "@/components/survey/SurveyNavigation";
import { SurveyProgressBar } from "@/components/survey/SurveyProgressBar";
import { SurveyQuestionCard } from "@/components/survey/SurveyQuestionCard";
import { SurveySectionTitle } from "@/components/survey/SurveySectionTitle";
import { getChildForCurrentParent } from "@/lib/children";
import { getSurveyQuestions, submitSurvey } from "@/lib/survey";
import type { ChildProfile } from "@/types/child";
import type {
  SurveyAnswerOption,
  SurveyAnswers,
  SurveyArea,
  SurveyQuestion,
} from "@/types/survey";

const answerOptions: SurveyAnswerOption[] = [
  { label: "Never", score: 0 },
  { label: "Rarely", score: 1 },
  { label: "Sometimes", score: 2 },
  { label: "Often", score: 3 },
  { label: "Always", score: 4 },
];

const areaOrder: SurveyArea[] = [
  "emotion",
  "cognitive",
  "self_awareness",
  "mathematical",
];

function sortQuestions(questions: SurveyQuestion[]) {
  return [...questions].sort((first, second) => {
    const areaDifference =
      areaOrder.indexOf(first.area) - areaOrder.indexOf(second.area);

    if (areaDifference !== 0) {
      return areaDifference;
    }

    return first.sort_order - second.sort_order;
  });
}

export default function SurveyPage() {
  const params = useParams<{ childId: string }>();
  const router = useRouter();
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savingStage, setSavingStage] = useState<"calculating" | "saving" | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSurvey() {
      try {
        const childResult = await getChildForCurrentParent(params.childId);
        const activeQuestions = await getSurveyQuestions();

        if (activeQuestions.length === 0) {
          throw new Error("empty_survey");
        }

        if (isMounted) {
          setChild(childResult.child);
          setQuestions(sortQuestions(activeQuestions));
        }
      } catch (error) {
        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setErrorMessage("We could not load the survey.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSurvey();

    return () => {
      isMounted = false;
    };
  }, [params.childId, router]);

  const currentQuestion = questions[currentIndex];
  const answeredCount = useMemo(
    () =>
      questions.filter((question) => answers[question.id] !== undefined)
        .length,
    [answers, questions],
  );
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleSelectAnswer(score: number) {
    if (!currentQuestion) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: score,
    }));
  }

  function handleBack() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  async function handleNext() {
    if (!currentQuestion || answers[currentQuestion.id] === undefined) {
      toast.error("Please answer this question before continuing.");
      return;
    }

    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    if (answeredCount !== questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setSavingStage("calculating");

    try {
      await submitSurvey({
        answers,
        childId: params.childId,
        questions,
      });
      setSavingStage("saving");
      toast.success("Survey completed! Great work!");
      router.push(`/assessment-result/${params.childId}`);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error && err.message === "prediction_failed"
          ? "We could not calculate the support level right now. Please try again."
          : err instanceof Error && err.message === "assessment_save_failed"
            ? "We could not save your survey result. Please try again."
            : "Something went wrong. Please try again.";
      toast.error(message);
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
      setSavingStage(null);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-8 sm:py-10">
      <Toaster position="top-center" />
      <section className="mx-auto w-full max-w-3xl">
        <Link
          className="mb-6 inline-flex text-sm font-semibold text-slate-500 transition hover:text-primary-blue"
          href={`/children/${params.childId}`}
        >
          Back to child profile
        </Link>

        {isLoading ? <SurveyLoadingState message="Loading survey..." /> : null}

        {!isLoading && errorMessage && !isSaving ? (
          <div
            className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-center text-sm font-semibold text-rose-700 shadow-soft"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}

        {!isLoading && child && !errorMessage && !hasStarted ? (
          <SurveyIntroCard
            childName={child.child_name}
            onStart={() => setHasStarted(true)}
          />
        ) : null}

        {!isLoading && child && currentQuestion && hasStarted ? (
          <div className="space-y-5">
            <SurveyProgressBar current={answeredCount} total={questions.length} />
            <SurveySectionTitle
              area={currentQuestion.area}
              current={currentIndex + 1}
              total={questions.length}
            />
            <SurveyQuestionCard
              answerOptions={answerOptions}
              onSelectAnswer={handleSelectAnswer}
              question={currentQuestion}
              selectedScore={answers[currentQuestion.id]}
            />

            {/* Staged saving indicator */}
            {isSaving && savingStage && (
              <div className="rounded-2xl bg-blue-50 border border-blue-200 px-5 py-4 flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
                <p className="text-sm font-bold text-blue-700">
                  {savingStage === "calculating"
                    ? "Calculating support level..."
                    : "Saving survey result..."}
                </p>
              </div>
            )}

            <SurveyNavigation
              canGoBack={currentIndex > 0 && !isSaving}
              isLastQuestion={isLastQuestion}
              isSaving={isSaving}
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        ) : null}
      </section>
    </main>
  );
}
