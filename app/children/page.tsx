"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getChildrenForCurrentParent,
  getLatestAssessmentForChild,
  type LatestAssessment,
  type ParentProfile,
} from "@/lib/children";
import type { ChildProfile } from "@/types/child";
import { supabase } from "@/lib/supabase";

import { WelcomeParentHero } from "@/components/children/WelcomeParentHero";
import { NextActionCard } from "@/components/children/NextActionCard";
import { QuickStatusCards } from "@/components/children/QuickStatusCards";
import { ChildProfileCard } from "@/components/children/ChildProfileCard";
import { ChildEmptyState } from "@/components/children/ChildEmptyState";
import { RecentActivity } from "@/components/children/RecentActivity";
import { SupportiveNote } from "@/components/children/SupportiveNote";
import { ChildrenPageSkeleton } from "@/components/children/ChildrenPageSkeleton";

export default function ChildrenPage() {
  const router = useRouter();

  const [parent, setParent] = useState<ParentProfile | null>(null);
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [assessments, setAssessments] = useState<Record<string, LatestAssessment | null>>({});
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const { parent: p, children: c } = await getChildrenForCurrentParent();

        if (!isMounted) return;

        setParent(p);
        setChildren(c);

        // Fetch assessments for each child in parallel
        const assessmentMap: Record<string, LatestAssessment | null> = {};
        await Promise.all(
          c.map(async (child) => {
            assessmentMap[child.id] = await getLatestAssessmentForChild(child.id);
          })
        );
        if (isMounted) setAssessments(assessmentMap);

        // Count total game scores for this parent's children
        if (c.length > 0) {
          const childIds = c.map((ch) => ch.id);
          const { count } = await supabase
            .from("game_scores")
            .select("*", { count: "exact", head: true })
            .in("child_id", childIds);
          if (isMounted) setGamesPlayed(count ?? 0);
        }
      } catch (error) {
        if (!isMounted) return;

        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }
        setErrorMessage("We could not load your child profiles. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [router]);

  const surveysCompleted = Object.values(assessments).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-green-50/30 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">

        {/* Loading */}
        {isLoading && <ChildrenPageSkeleton />}

        {/* Error */}
        {!isLoading && errorMessage && (
          <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-400 text-xl mx-auto mb-4">⚠️</div>
            <p className="font-display text-lg font-bold text-rose-700 mb-2">Something went wrong</p>
            <p className="text-sm text-rose-500 font-medium">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Main content */}
        {!isLoading && !errorMessage && (
          <>
            {/* 1. Welcome Hero */}
            <WelcomeParentHero parentName={parent?.full_name ?? ""} />

            {/* 2. Next Recommended Action */}
            <NextActionCard children={children} assessments={assessments} />

            {/* 3. Quick Stats */}
            <QuickStatusCards
              childCount={children.length}
              surveysCompleted={surveysCompleted}
              gamesPlayed={gamesPlayed}
            />

            {/* 4. Child Profile Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Child Profiles
                  {children.length > 0 && (
                    <span className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600 text-sm font-bold align-middle">
                      {children.length}
                    </span>
                  )}
                </h2>
              </div>

              {children.length === 0 ? (
                <ChildEmptyState />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {children.map((child) => (
                    <ChildProfileCard
                      key={child.id}
                      child={child}
                      assessment={assessments[child.id] ?? null}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 5. Recent Activity */}
            <RecentActivity
              children={children}
              surveysCompleted={surveysCompleted}
              gamesPlayed={gamesPlayed}
            />

            {/* 6. Supportive Note */}
            <SupportiveNote />
          </>
        )}
      </div>
    </main>
  );
}
