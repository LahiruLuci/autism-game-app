"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingState } from "@/components/ui/LoadingState";
import {
  getChildForCurrentParent,
  getLatestAssessmentForChild,
  type LatestAssessment,
} from "@/lib/children";
import type { ChildProfile } from "@/types/child";

export default function ChildDetailsPage() {
  const router = useRouter();
  const params = useParams<{ childId: string }>();
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [assessment, setAssessment] = useState<LatestAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadChild() {
      try {
        const result = await getChildForCurrentParent(params.childId);
        const latestAssessment = await getLatestAssessmentForChild(
          result.child.id,
        );

        if (isMounted) {
          setChild(result.child);
          setAssessment(latestAssessment);
        }
      } catch (error) {
        const message =
          error instanceof Error && error.message === "not_authenticated"
            ? "Please login again."
            : "This child profile could not be found.";

        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setErrorMessage(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadChild();

    return () => {
      isMounted = false;
    };
  }, [params.childId, router]);

  const supportLevel = assessment?.predicted_level ?? null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 px-4 py-8 sm:py-10">
      <section className="mx-auto w-full max-w-4xl">
        <Link
          className="mb-6 inline-flex text-sm font-semibold text-slate-500 transition hover:text-primary-blue"
          href="/children"
        >
          Back to child profiles
        </Link>

        <div className="rounded-3xl border border-border-soft bg-white p-6 shadow-premium sm:p-8">
          {isLoading ? <LoadingState message="Loading child details..." /> : null}

          {!isLoading && errorMessage ? (
            <div
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-semibold text-rose-700"
              role="alert"
            >
              {errorMessage}
            </div>
          ) : null}

          {!isLoading && child && !errorMessage ? (
            <>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase text-blue-600">
                    Child Profile
                  </span>
                  <h1 className="display-heading mb-3">{child.child_name}</h1>
                  <p className="body-text">
                    Review the profile and continue with supportive activities.
                  </p>
                </div>
                <span className="badge-level">Age {child.age}</span>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-blue-50 p-5">
                  <span className="block text-xs font-bold uppercase text-blue-600">
                    Age
                  </span>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {child.age}
                  </p>
                </div>
                <div className="rounded-3xl bg-green-50 p-5">
                  <span className="block text-xs font-bold uppercase text-green-700">
                    Gender
                  </span>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {child.gender || "Not selected"}
                  </p>
                </div>
                <div className="rounded-3xl bg-violet-50 p-5">
                  <span className="block text-xs font-bold uppercase text-violet-700">
                    Support Level
                  </span>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {supportLevel ? `Level ${supportLevel}` : "Survey not completed yet."}
                  </p>
                </div>
              </div>

              <div className="mb-8 rounded-3xl border border-border-soft bg-slate-50 p-5">
                <h2 className="mb-2 font-display text-xl font-bold text-slate-900">
                  Notes
                </h2>
                <p className="body-text">
                  {child.notes || "No notes added yet."}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  className="button-primary min-h-12 w-full"
                  href={`/survey/${child.id}`}
                >
                  {assessment ? "Retake Survey" : "Start Survey"}
                </Link>
                {assessment ? (
                  <Link
                    className="button-secondary inline-flex min-h-12 w-full items-center justify-center"
                    href={`/games/${child.id}`}
                  >
                    Continue to Games
                  </Link>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
