"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingState } from "@/components/ui/LoadingState";
import { getChildForCurrentParent } from "@/lib/children";
import { getLatestAssessmentForCurrentParent } from "@/lib/survey";
import type { ChildProfile } from "@/types/child";
import type { AssessmentResult } from "@/types/survey";

export default function AssessmentResultPage() {
  const params = useParams<{ childId: string }>();
  const router = useRouter();
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadResult() {
      try {
        const childResult = await getChildForCurrentParent(params.childId);
        const latestAssessment = await getLatestAssessmentForCurrentParent(
          params.childId,
        );

        if (!latestAssessment) {
          throw new Error("assessment_not_found");
        }

        if (isMounted) {
          setChild(childResult.child);
          setAssessment(latestAssessment);
        }
      } catch (error) {
        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setErrorMessage("Something went wrong. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadResult();

    return () => {
      isMounted = false;
    };
  }, [params.childId, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 px-4 py-8 sm:py-10">
      <section className="mx-auto w-full max-w-4xl">
        <Link
          className="mb-6 inline-flex text-sm font-semibold text-slate-500 transition hover:text-primary-blue"
          href={`/children/${params.childId}`}
        >
          Back to child profile
        </Link>

        <div className="rounded-3xl border border-border-soft bg-white p-6 shadow-premium sm:p-8">
          {isLoading ? <LoadingState message="Calculating result..." /> : null}

          {!isLoading && errorMessage ? (
            <div
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-semibold text-rose-700"
              role="alert"
            >
              {errorMessage}
            </div>
          ) : null}

          {!isLoading && child && assessment && !errorMessage ? (
            <>
              <div className="mb-8 text-center">
                <span className="mb-4 inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold uppercase text-green-700">
                  Screening Completed
                </span>
                <h1 className="display-heading mb-4">
                  Survey completed for {child.child_name}
                </h1>
                <p className="body-text mx-auto max-w-2xl">
                  Here is the suggested activity level based on the supportive
                  learning survey.
                </p>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-blue-50 p-5 text-center">
                  <span className="block text-xs font-bold uppercase text-blue-600">
                    Suggested Support Level
                  </span>
                  <p className="mt-3 font-display text-4xl font-bold text-blue-700">
                    {assessment.predicted_level}
                  </p>
                </div>
                <div className="rounded-3xl bg-green-50 p-5 text-center">
                  <span className="block text-xs font-bold uppercase text-green-700">
                    Total Score
                  </span>
                  <p className="mt-3 font-display text-4xl font-bold text-green-700">
                    {assessment.total_score}
                  </p>
                </div>
                <div className="rounded-3xl bg-violet-50 p-5 text-center">
                  <span className="block text-xs font-bold uppercase text-violet-700">
                    Recommended Learning Level
                  </span>
                  <p className="mt-3 font-display text-4xl font-bold text-violet-700">
                    {assessment.predicted_level}
                  </p>
                </div>
              </div>

              <div className="mb-8 rounded-3xl border border-border-soft bg-slate-50 p-5">
                <h2 className="mb-2 font-display text-xl font-bold text-slate-900">
                  Recommendation
                </h2>
                <p className="body-text">
                  {assessment.recommendation ||
                    `Unlock games up to level ${assessment.predicted_level}`}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  className="button-primary min-h-12 w-full"
                  href={`/games/${params.childId}`}
                >
                  Continue to Games
                </Link>
                <Link
                  className="button-secondary inline-flex min-h-12 w-full items-center justify-center"
                  href={`/survey/${params.childId}`}
                >
                  Retake Survey
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
