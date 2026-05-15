"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Backend Helpers
import { getChildForCurrentParent } from "@/lib/children";
import { getGamesForChild } from "@/lib/games";
import { isGameDevModeEnabled } from "@/lib/game-unlock";

// UI Components
import { LoadingState } from "@/components/ui/LoadingState";
import { JourneyBackground } from "@/components/games/redesign/JourneyBackground";
import { LearningJourneyHero } from "@/components/games/redesign/LearningJourneyHero";
import { JourneyTimeline } from "@/components/games/redesign/JourneyTimeline";

// Types
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
        <LoadingState message="Creating your calm learning journey..." />
      </main>
    );
  }

  // Handle case where no assessment exists and dev mode is false
  if (!assessment && !devMode) {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        <JourneyBackground />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/60 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-white/80 text-center space-y-8 relative z-10"
        >
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
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden pb-32">
      <JourneyBackground />

      {/* Simplified Navigation (Not Redesigning Navbar, but placing a custom back link) */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-50">
        <Link
          href={`/children/${params.childId}`}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/50 backdrop-blur-md border border-white/80 text-sm font-bold text-slate-500 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Profile
        </Link>
      </div>

      <div className="relative z-10">
        <LearningJourneyHero 
          childName={child?.child_name || "your child"} 
          assessment={assessment} 
        />

        {/* The Guided Journey Timeline */}
        <JourneyTimeline 
          childId={params.childId} 
          games={games} 
        />

        {/* Supportive Footer Note */}
        <section className="mt-32 text-center max-w-2xl mx-auto px-6">
          <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/60 shadow-sm">
            <p className="text-slate-500 font-medium leading-relaxed italic">
              "Every small step in the journey is a moment of growth. We are here to support you at every turn."
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-30" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
