"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getGameScoreById, getPreviousGameScore } from "@/lib/game-scores";
import { LoadingState } from "@/components/ui/LoadingState";
import { CalmBackground } from "@/components/ui/CalmBackground";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Target,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Activity
} from "lucide-react";

export default function GameResultPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [prevSession, setPrevSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const current = await getGameScoreById(params.sessionId);
      if (current) {
        setSession(current);
        const previous = await getPreviousGameScore(current.child_id, current.game_id, current.id);
        setPrevSession(previous);
      }
      setIsLoading(false);
    }
    loadData();
  }, [params.sessionId]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <LoadingState message="Analyzing learning results..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-4">
        <CalmBackground />
        <div className="text-center space-y-4 bg-white/60 backdrop-blur-xl p-12 rounded-[3rem] border border-white/80 shadow-premium">
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Session not found</p>
          <button onClick={() => router.push('/children')} className="text-blue-500 font-bold underline">Back to home</button>
        </div>
      </main>
    );
  }

  // Calculations
  const accuracy = Math.round((session.correct_answers / (session.attempts || 1)) * 100);
  const prevAccuracy = prevSession ? Math.round((prevSession.correct_answers / (prevSession.attempts || 1)) * 100) : null;
  const accuracyDiff = (accuracy !== null && prevAccuracy !== null) ? accuracy - prevAccuracy : null;

  let performanceLabel = "";
  let performanceColor = "";
  if (accuracy >= 90) {
    performanceLabel = "Excellent performance";
    performanceColor = "text-emerald-600 bg-emerald-50 border-emerald-100";
  } else if (accuracy >= 70) {
    performanceLabel = "Good progress";
    performanceColor = "text-amber-600 bg-amber-50 border-amber-100";
  } else {
    performanceLabel = "Needs more practice";
    performanceColor = "text-rose-600 bg-rose-50 border-rose-100";
  }

  // Next Steps Logic
  let nextStep = "";
  if (accuracy >= 90) {
    nextStep = `Excellent! Your child has mastered this level. Suggested next step: Try Level ${session.level + 1} or explore a new activity.`;
  } else if (session.time_taken > 60 && accuracy >= 80) {
    nextStep = "Your child showed a strong understanding but took their time. Suggested next step: Practice this activity again to build confidence and speed.";
  } else {
    nextStep = "Steady progress! Suggested next step: Practice this activity once more to help your child master these core skills.";
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 px-4 pb-32 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
      <CalmBackground />

      <div className="relative z-10 mx-auto w-full max-w-4xl space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600">
              <Activity size={14} />
              <p className="font-black uppercase tracking-widest text-[10px]">Learning Progress Report</p>
            </div>
            <h1 className="max-w-sm text-3xl font-black leading-tight tracking-tight text-slate-800 sm:max-w-none sm:text-4xl">Today&apos;s Session Summary</h1>
            <p className="max-w-xs text-sm font-bold leading-relaxed text-slate-500 sm:max-w-none sm:text-base">
              Activity: <span className="text-slate-800">{session.games?.game_name}</span> (Level {session.level})
            </p>
          </div>
          <div className="w-full rounded-full border border-white/80 bg-white/50 px-4 py-3 text-center text-sm font-bold text-slate-500 shadow-sm backdrop-blur-md sm:w-fit sm:py-2">
            {new Date(session.played_at).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<CheckCircle2 className="text-emerald-500" />}
            label="Correct Answers"
            value={`${session.correct_answers} / ${session.attempts} Correct`}
          />
          <StatCard
            icon={<Target className="text-blue-500" />}
            label="Accuracy"
            value={`${accuracy}%`}
          />
          <StatCard
            icon={<Clock className="text-amber-500" />}
            label="Completion Time"
            value={`${Math.floor(session.time_taken / 60)}m ${session.time_taken % 60}s`}
          />
          <StatCard
            icon={<CheckCircle2 className="text-indigo-500" />}
            label="Questions Answered"
            value={`${session.attempts} Total`}
          />
        </div>

        {/* Insight Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section className="flex flex-col gap-6 rounded-[2rem] border border-slate-100 bg-white p-5 shadow-premium sm:p-8">
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600" />
                  Performance Analysis
                </h3>
                <div className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${performanceColor}`}>
                  {performanceLabel}
                </div>
                <p className="text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                  Your child answered <span className="font-bold text-slate-800">{session.correct_answers} out of {session.attempts}</span> questions correctly with <span className="font-bold text-slate-800">{accuracy}%</span> accuracy.
                </p>
              </div>

              {/* Trend Comparison */}
              <div className="pt-6 border-t border-slate-50">
                <h4 className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-4">Improvement Trend</h4>
                {prevSession ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Previous Session</p>
                      <p className="text-xl font-black text-slate-600">{prevAccuracy}% Accuracy</p>
                    </div>
                    <div className="hidden h-10 w-px bg-slate-100 sm:block" />
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Current Session</p>
                      <p className="text-xl font-black text-slate-800">{accuracy}% Accuracy</p>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-auto">
                      {accuracyDiff !== null && accuracyDiff > 0 ? (
                        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm font-black">
                          <ArrowUpRight size={16} />
                          +{accuracyDiff}%
                        </div>
                      ) : accuracyDiff !== null && accuracyDiff < 0 ? (
                        <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-sm font-black">
                          <ArrowDownRight size={16} />
                          {accuracyDiff}%
                        </div>
                      ) : (
                        <div className="text-slate-500 bg-slate-50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Stable</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 font-bold text-sm italic">First recorded session for this activity. A baseline has been established for tracking future growth.</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Next Steps */}
          <div className="space-y-6">
            <section className="flex flex-col gap-6 rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl sm:rounded-[2.5rem] sm:p-8">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-200">Suggested Next Step</h3>
                <p className="text-slate-400 font-medium leading-relaxed text-sm">
                  {nextStep}
                </p>
              </div>
              <button
                onClick={() => router.push(`/games/${session.child_id}`)}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
              >
                Open Learning Hub
                <ChevronRight size={18} />
              </button>
            </section>

            <button
              onClick={() => router.push(`/children/${session.child_id}`)}
              className="w-full bg-white text-slate-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-slate-100 hover:border-blue-200 transition-all shadow-sm"
            >
              View Progress Dashboard
            </button>
          </div>
        </div>

        <div className="pt-12 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] opacity-50">
            BrightPath Learning Systems — Analytical Report 💙
          </p>
        </div>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50">
        {icon}
      </div>
      <div>
        <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        <p className="break-words text-lg font-black leading-tight text-slate-800 sm:text-xl">{value}</p>
      </div>
    </motion.div>
  );
}
