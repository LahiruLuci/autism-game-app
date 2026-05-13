"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getGameScoreById } from "@/lib/game-scores";
import { LoadingState } from "@/components/ui/LoadingState";

export default function GameResultPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();
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
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <LoadingState message="Finalizing results..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold">Session not found</h1>
          <Link href="/children" className="text-blue-500 underline">Back to home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-8 sm:p-12 shadow-xl shadow-blue-100/50 border border-blue-50 text-center space-y-8">
        
        {/* Success Header */}
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-[2.5rem] bg-green-100 flex items-center justify-center text-5xl mx-auto shadow-sm">
            🎉
          </div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Great Job!</h1>
          <p className="text-slate-500 font-medium">
            You completed <strong>{session.games?.game_name || "the game"}</strong>!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-blue-50 border border-blue-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">Final Score</p>
            <p className="font-display text-3xl font-bold text-blue-700">{session.final_score}</p>
          </div>
          <div className="p-5 rounded-3xl bg-violet-50 border border-violet-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-1">Accuracy</p>
            <p className="font-display text-3xl font-bold text-violet-700">
              {Math.round((session.correct_answers / session.attempts) * 100)}%
            </p>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="bg-slate-50 rounded-3xl p-6 space-y-4 text-left">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Correct Answers</span>
            <span className="font-bold text-slate-700">{session.correct_answers}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Time Taken</span>
            <span className="font-bold text-slate-700">{session.time_taken}s</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Total Attempts</span>
            <span className="font-bold text-slate-700">{session.attempts}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => router.push(`/games/${session.child_id}`)}
            className="w-full py-4 rounded-2xl bg-blue-500 text-white font-extrabold shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all active:scale-95"
          >
            Back to Games
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all"
          >
            Play Again
          </button>
        </div>

        {/* Supportive Footer */}
        <p className="text-xs font-semibold text-slate-400 italic">
          "Every session helps you grow stronger!" 💛
        </p>
      </div>
    </main>
  );
}
