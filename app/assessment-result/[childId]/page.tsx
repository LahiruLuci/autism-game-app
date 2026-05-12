"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getChildForCurrentParent } from "@/lib/children";
import { getLatestAssessmentForCurrentParent } from "@/lib/survey";
import type { ChildProfile } from "@/types/child";
import type { AssessmentResult } from "@/types/survey";

// ─── Area score card ────────────────────────────────────────────────────────

type AreaCardProps = {
  label: string;
  score: number;
  maxScore: number;
  emoji: string;
  bg: string;
  bar: string;
  text: string;
};

function AreaScoreCard({ label, score, maxScore, emoji, bg, bar, text }: AreaCardProps) {
  const percent = Math.min(100, Math.round((score / maxScore) * 100));
  return (
    <div className={`rounded-3xl ${bg} p-5 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <span className={`text-xs font-bold uppercase tracking-wider ${text}`}>{label}</span>
        </div>
        <span className={`font-display text-2xl font-bold ${text}`}>{score}</span>
      </div>
      {/* Progress bar */}
      <div className="h-2 rounded-full bg-white/60 overflow-hidden">
        <div
          className={`h-full rounded-full ${bar} transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs font-semibold text-slate-500">{percent}% of max {maxScore}</p>
    </div>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-[2rem] bg-slate-100 h-56" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => <div key={i} className="rounded-3xl bg-slate-100 h-28" />)}
      </div>
      <div className="rounded-3xl bg-slate-100 h-24" />
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-slate-100 h-14" />
        <div className="rounded-2xl bg-slate-100 h-14" />
      </div>
    </div>
  );
}

// ─── Level badge helper ──────────────────────────────────────────────────────

function levelConfig(level: number) {
  if (level === 1) return { label: "Level 1", color: "text-blue-700", bg: "bg-blue-100", desc: "Foundational Support" };
  if (level === 2) return { label: "Level 2", color: "text-violet-700", bg: "bg-violet-100", desc: "Developing Skills" };
  return { label: "Level 3", color: "text-green-700", bg: "bg-green-100", desc: "Advanced Activities" };
}

// ─── Page ───────────────────────────────────────────────────────────────────

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
        const [childResult, latestAssessment] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getLatestAssessmentForCurrentParent(params.childId),
        ]);

        if (!latestAssessment) throw new Error("assessment_not_found");

        if (isMounted) {
          setChild(childResult.child);
          setAssessment(latestAssessment);
        }
      } catch (error) {
        if (!isMounted) return;
        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }
        setErrorMessage("We could not load the result. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadResult();
    return () => { isMounted = false; };
  }, [params.childId, router]);

  const lvl = assessment ? levelConfig(assessment.predicted_level) : null;

  // Max scores — 5 questions per area × 4 max score = 20 per area
  const MAX_AREA = 20;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/30 pb-28 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">

        {/* Back link */}
        <Link
          href={`/children/${params.childId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-blue-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to child profile
        </Link>

        {/* Loading skeleton */}
        {isLoading && <Skeleton />}

        {/* Error */}
        {!isLoading && errorMessage && (
          <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-xl mx-auto mb-4">⚠️</div>
            <p className="font-display text-lg font-bold text-rose-700 mb-2">Something went wrong</p>
            <p className="text-sm text-rose-500 font-medium mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-2xl bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Main result */}
        {!isLoading && !errorMessage && child && assessment && lvl && (
          <>
            {/* ── Hero result card ── */}
            <div className="relative rounded-[2rem] bg-gradient-to-br from-blue-50 via-white to-violet-50 border border-blue-100 overflow-hidden p-8 sm:p-12">
              {/* Decorative blobs */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-violet-200/25 blur-3xl pointer-events-none" />

              <div className="relative text-center">
                {/* Completed badge */}
                <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-xs font-bold uppercase tracking-widest text-green-700">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Survey Completed
                </span>

                <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                  Great job, {child.child_name.split(" ")[0]}! 🌟
                </h1>
                <p className="text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
                  Here is the suggested activity level based on the supportive learning survey.
                </p>

                {/* Level + total score pills */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className={`${lvl.bg} rounded-3xl px-8 py-6 text-center min-w-[160px]`}>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Suggested Support Level</p>
                    <p className={`font-display text-5xl font-bold ${lvl.color}`}>{assessment.predicted_level}</p>
                    <p className={`text-sm font-bold mt-1 ${lvl.color}`}>{lvl.desc}</p>
                  </div>
                  <div className="bg-white rounded-3xl border border-slate-100 px-8 py-6 text-center min-w-[160px] shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Total Score</p>
                    <p className="font-display text-5xl font-bold text-slate-900">{assessment.total_score}</p>
                    <p className="text-sm font-semibold text-slate-400 mt-1">out of {MAX_AREA * 4}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Area scores ── */}
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center text-sm">📊</span>
                Area Scores
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AreaScoreCard
                  label="Emotion"
                  score={assessment.emotion_score}
                  maxScore={MAX_AREA}
                  emoji="💛"
                  bg="bg-amber-50 border border-amber-100"
                  bar="bg-amber-400"
                  text="text-amber-700"
                />
                <AreaScoreCard
                  label="Cognitive"
                  score={assessment.cognitive_score}
                  maxScore={MAX_AREA}
                  emoji="🧠"
                  bg="bg-blue-50 border border-blue-100"
                  bar="bg-blue-400"
                  text="text-blue-700"
                />
                <AreaScoreCard
                  label="Self-Awareness"
                  score={assessment.self_awareness_score}
                  maxScore={MAX_AREA}
                  emoji="🌟"
                  bg="bg-violet-50 border border-violet-100"
                  bar="bg-violet-400"
                  text="text-violet-700"
                />
                <AreaScoreCard
                  label="Mathematical Skills"
                  score={assessment.math_score}
                  maxScore={MAX_AREA}
                  emoji="🔢"
                  bg="bg-green-50 border border-green-100"
                  bar="bg-green-400"
                  text="text-green-700"
                />
              </div>
            </div>

            {/* ── Recommendation ── */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0 shadow-inner">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900 mb-2">Recommendation</h2>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {assessment.recommendation ||
                      `Based on the survey results, we suggest starting with Level ${assessment.predicted_level} activities. These are designed to be supportive, engaging, and suitable for ${child.child_name}'s current development stage.`}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Unlocked games note ── */}
            <div className="rounded-2xl bg-green-50 border border-green-100 px-5 py-4 flex items-center gap-4">
              <span className="text-xl">🎮</span>
              <p className="text-sm font-semibold text-green-800">
                <strong>Level {assessment.predicted_level} games are now unlocked</strong> for {child.child_name}.
                {assessment.predicted_level > 1 && ` All levels up to Level ${assessment.predicted_level} are available.`}
              </p>
            </div>

            {/* ── CTA buttons ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={`/games/${params.childId}`}
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-blue-500 text-white text-sm font-extrabold shadow-sm hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Continue to Games
              </Link>
              <Link
                href={`/survey/${params.childId}`}
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-extrabold shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retake Survey
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5 flex items-start gap-4">
              <span className="flex-shrink-0 text-amber-400 text-base">💛</span>
              <p className="text-xs font-medium text-amber-800 leading-relaxed">
                <strong className="font-bold">Note: </strong>
                This platform provides supportive learning activities and progress tracking. It is not a medical diagnosis tool. Results reflect a suggested activity level only.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
