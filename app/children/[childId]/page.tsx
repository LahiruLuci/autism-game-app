"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingState } from "@/components/ui/LoadingState";
import { getChildForCurrentParent } from "@/lib/children";
import { getLatestAssessmentForCurrentParent } from "@/lib/survey";
import { isAreaRecommendationsEnabled } from "@/lib/area-recommendations";
import { ChildProfileHero } from "@/components/children/ChildProfileHero";
import { AssessmentSummaryCard } from "@/components/children/AssessmentSummaryCard";
import { GeneralRecommendationCard } from "@/components/children/GeneralRecommendationCard";
import { AreaRecommendationCard } from "@/components/children/AreaRecommendationCard";
import { AreaLevelGrid } from "@/components/children/AreaLevelGrid";
import { QuickLearningStatus } from "@/components/children/QuickLearningStatus";
import { ChildNotesCard } from "@/components/children/ChildNotesCard";
import { ChildActionPanel } from "@/components/children/ChildActionPanel";
import { getChildGameSummary } from "@/lib/game-scores";

import type { ChildProfile } from "@/types/child";
import type { AssessmentResult } from "@/types/survey";

export default function ChildDetailsPage() {
  const router = useRouter();
  const params = useParams<{ childId: string }>();

  const [child, setChild] = useState<ChildProfile | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [gameSummary, setGameSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const areaRecommendationsEnabled = isAreaRecommendationsEnabled();

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [childResult, latestAssessment, summary] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getLatestAssessmentForCurrentParent(params.childId).catch(() => null),
          getChildGameSummary(params.childId).catch(() => null),
        ]);

        if (isMounted) {
          setChild(childResult.child);
          setAssessment(latestAssessment);
          setGameSummary(summary);
        }
      } catch (error) {
        if (!isMounted) return;

        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }

        setErrorMessage("This child profile could not be found or you don't have access.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [params.childId, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/40 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <LoadingState message="Loading child profile..." />
        </div>
      </main>
    );
  }

  if (errorMessage || !child) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/40 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-[2rem] bg-rose-50 border border-rose-100 flex items-center justify-center text-3xl mx-auto shadow-sm">
            ⚠️
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold text-slate-900">Oops! Profile not found</h1>
            <p className="text-slate-500 font-medium leading-relaxed">{errorMessage}</p>
          </div>
          <Link
            href="/children"
            className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all duration-300"
          >
            Back to Children
          </Link>
        </div>
      </main>
    );
  }

  // Determine if we should show area-wise mode
  // We show it if enabled AND the assessment has the required fields
  const showAreaWiseMode =
    areaRecommendationsEnabled &&
    assessment &&
    assessment.main_support_area &&
    assessment.strongest_area;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Navigation */}
        <nav className="mb-8">
          <Link
            href="/children"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-500 transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            Back to child profiles
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Profile & Assessment (Large) */}
          <div className="lg:col-span-8 space-y-8">
            <ChildProfileHero child={child} assessment={assessment} />

            <AssessmentSummaryCard assessment={assessment} childId={child.id} />

            {assessment && (
              <section className="space-y-8">
                {showAreaWiseMode ? (
                  <>
                    <AreaRecommendationCard assessment={assessment} />
                    <div className="space-y-4">
                      <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center text-sm">📊</span>
                        Skill Scores from Survey
                      </h2>
                      <AreaLevelGrid assessment={assessment} />
                    </div>
                  </>
                ) : (
                  <GeneralRecommendationCard assessment={assessment} childId={child.id} />
                )}
              </section>
            )}

            <ChildNotesCard notes={child.notes} />
          </div>

          {/* Right Column: Quick Stats & Actions (Small) */}
          <div className="lg:col-span-4 space-y-8">
            <section className="space-y-4">
              <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-sm">📊</span>
                Learning Overview
              </h2>
              <QuickLearningStatus assessment={assessment} gameSummary={gameSummary} />
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-sm">🚀</span>
                Next Actions
              </h2>
              <ChildActionPanel
                childId={child.id}
                hasAssessment={!!assessment}
                gameSummary={gameSummary}
              />
            </section>

            {/* Parent Tip Card */}
            <div className="rounded-[2rem] bg-blue-50 border border-blue-100 p-8 text-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-full -mr-8 -mt-8" />
              <div className="relative z-10">
                <p className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-3">Parent Tip</p>
                <h3 className="font-display text-xl font-bold mb-3 leading-tight">Short daily practice is better than long sessions</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                  Try 10–15 minutes of learning games and keep the experience calm and positive for your child.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-lg shadow-sm">💡</div>
                  <span className="text-xs font-bold text-blue-700">Consistency builds confidence</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
