"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGameScoreById } from "@/lib/game-scores";
import { LoadingState } from "@/components/ui/LoadingState";
import { CalmBackground } from "@/components/ui/CalmBackground";
import { ResultHero } from "@/components/games/results/ResultHero";
import { ResultAchievementCards } from "@/components/games/results/ResultAchievementCards";
import { ResultReflection } from "@/components/games/results/ResultReflection";
import { ResultActions } from "@/components/games/results/ResultActions";

export default function GameResultPage() {
  const params = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGameScoreById(params.sessionId).then(data => {
      setSession(data);
      setIsLoading(false);
    });
  }, [params.sessionId]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <LoadingState message="Finalizing your wonderful progress..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-4">
        <CalmBackground />
        <div className="text-center space-y-4 bg-white/60 backdrop-blur-xl p-12 rounded-[3rem] border border-white/80">
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Session not found</p>
          <button onClick={() => window.location.href = '/children'} className="text-blue-500 font-bold underline">Back to home</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative flex flex-col py-12 px-4 sm:px-6">
      <CalmBackground />
      
      <div className="max-w-2xl mx-auto w-full space-y-12 pb-12">
        
        <ResultHero />

        <ResultAchievementCards session={session} />

        <ResultReflection session={session} />

        <ResultActions childId={session.child_id} />

        {/* Gentle Footer */}
        <p className="text-center text-xs font-semibold text-slate-400 italic pt-8">
          "Every small step is a big discovery" 💛
        </p>
      </div>
    </main>
  );
}
