"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getChildForCurrentParent } from "@/lib/children";
import { getGamesForChild } from "@/lib/games";
import { LoadingState } from "@/components/ui/LoadingState";
import { CalmBackground } from "@/components/ui/CalmBackground";
import { GamesHero } from "@/components/games/GamesHero";
import { ChildProgressSummary } from "@/components/games/ChildProgressSummary";
import { EmotionJourneySection } from "@/components/games/EmotionJourneySection";
import { LockedFutureAreas } from "@/components/games/LockedFutureAreas";
import { CalmFooterMessage } from "@/components/games/CalmFooterMessage";
import { isGameDevModeEnabled } from "@/lib/game-unlock";

import type { ChildProfile } from "@/types/child";
import type { AssessmentResult } from "@/types/survey";
import type { GameWithUnlockState } from "@/types/game";

export default function GamesPage() {
  const router = useRouter();
  const params = useParams<{ childId: string }>();

  const [child, setChild] = useState<ChildProfile | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [games, setGames] = useState<GameWithUnlockState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const devMode = isGameDevModeEnabled();

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [childData, gamesData] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGamesForChild(params.childId),
        ]);

        if (isMounted) {
          setChild(childData.child);
          setGames(gamesData.games);
          setAssessment(gamesData.assessment);
        }
      } catch (error) {
        if (!isMounted) return;
        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }
        setErrorMessage("We could not load the games page. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [params.childId, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <LoadingState message="Creating your calm learning space..." />
      </main>
    );
  }

  // Handle case where no assessment exists and dev mode is false
  if (!assessment && !devMode) {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-4">
        <CalmBackground />
        <div className="max-w-md w-full bg-white/60 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-white/80 text-center space-y-8">
          <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center text-4xl mx-auto shadow-sm">📋</div>
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-bold text-slate-900 leading-tight">Survey Required</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              To provide the best supportive activities for {child?.child_name}, please complete the developmental support survey first.
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href={`/survey/${params.childId}`}
              className="inline-flex items-center justify-center py-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-extrabold shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Start Survey
            </Link>
            <Link
              href={`/children/${params.childId}`}
              className="inline-flex items-center justify-center py-5 rounded-full bg-white/80 text-slate-600 text-sm font-bold hover:bg-white transition-all"
            >
              Back to Profile
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Filter only Emotion games for the primary journey
  const emotionGames = games.filter(g => g.area === "emotion");

  return (
    <main className="min-h-screen relative">
      <CalmBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Navigation Bar */}
        <nav className="py-8 flex items-center justify-between">
          <Link
            href={`/children/${params.childId}`}
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-sm font-bold text-slate-500 hover:text-blue-600 transition-all"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Profile
          </Link>

          {devMode && (
            <div className="px-5 py-2.5 rounded-full bg-amber-50/50 backdrop-blur-md border border-amber-100 flex items-center gap-2">
              <span className="text-xs">🛠️</span>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.15em]">Dev Mode Active</span>
            </div>
          )}
        </nav>

        <GamesHero child={child} assessment={assessment} />

        <ChildProgressSummary assessment={assessment} />

        <EmotionJourneySection childId={params.childId} games={emotionGames} />

        <LockedFutureAreas />

        <CalmFooterMessage />

      </div>
    </main>
  );
}
