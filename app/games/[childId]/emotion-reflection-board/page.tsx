"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";

import { playGameSound } from "@/lib/game-sounds";

import { LoadingState } from "@/components/ui/LoadingState";

import { CalmCompletionScreen } from "@/components/games/CalmCompletionScreen";
import { CalmBackground } from "@/components/ui/CalmBackground";

// Components
import { ReflectionGameHeader } from "@/components/games/emotion-reflection-board/ReflectionGameHeader";
import { ReflectionSituationCard } from "@/components/games/emotion-reflection-board/ReflectionSituationCard";
import { ReflectionEmotionGrid } from "@/components/games/emotion-reflection-board/ReflectionEmotionGrid";
import { ReflectionProgress } from "@/components/games/emotion-reflection-board/ReflectionProgress";
import { MascotFeedbackBar } from "@/components/games/redesign/MascotFeedbackBar";

// Logic
import { getLevelConfig } from "@/lib/games/emotion-reflection-board/levels";
import { getSituationsForLevel, ReflectionSituation } from "@/lib/games/emotion-reflection-board/situations";
import { calculateReflectionScore } from "@/lib/games/emotion-reflection-board/scoring";
import { getRandomFeedback } from "@/lib/games/emotion-reflection-board/helpers";
import { EMOTION_REFLECTION_CONFIG } from "@/lib/games/emotion-reflection-board/config";

// Types
import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function EmotionReflectionBoardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ childId: string }>();
  const level = parseInt(searchParams?.get("level") || "1");
  const levelConfig = getLevelConfig(level);

  // Core State
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameData, setGameData] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [gameState, setGameState] = useState<"start" | "playing" | "completed">("start");
  const [resultHref, setResultHref] = useState<string | null>(null);

  // Gameplay State
  const [situations, setSituations] = useState<ReflectionSituation[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  // Performance Metrics (Refs for sync updates)
  const completedRoundsRef = useRef(0);
  const attemptsRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Load Data
  useEffect(() => {
    async function init() {
      try {
        const [childRes, gameRes] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(EMOTION_REFLECTION_CONFIG.gameSlug, level),
        ]);

        setChild(childRes.child);
        setGameData(childRes.child ? gameRes : null);

        const roundSituations = getSituationsForLevel(level, levelConfig.rounds);
        setSituations(roundSituations);

        // Auto-start since this is a calm activity
        startTimeRef.current = Date.now();
        setGameState("playing");
      } catch (error) {
        console.error("[ReflectionBoard] Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [params.childId, level, levelConfig.rounds]);

  // Interaction
  const handleSelectEmotion = (selectedId: string) => {
    if (isAnswered) return;
    setIsAnswered(true);
    attemptsRef.current += 1;

    const situation = situations[currentRound];
    const isExpected = selectedId === situation.expectedEmotion;

    // Choose supportive feedback
    let msg = "";
    if (isExpected) {
      msg = getRandomFeedback("matching");
    } else {
      // Small chance to give "People feel differently" message
      msg = Math.random() > 0.5
        ? getRandomFeedback("differing")
        : getRandomFeedback("general");
    }

    setFeedback({ message: msg, visible: true });

    // Progress
    playGameSound("correct");
    completedRoundsRef.current += 1;

    setTimeout(() => {
      setFeedback({ message: "", visible: false });

      if (currentRound + 1 < levelConfig.rounds) {
        setCurrentRound(prev => prev + 1);
        setIsAnswered(false);
      } else {
        finishGame();
      }
    }, 3000);
  };

  const finishGame = async () => {
    setGameState("completed");
    if (!child || !gameData) return;
    await handleSaveScore();
  };

  const handleSaveScore = async () => {
    if (!gameData) return;

    setIsSaving(true);
    setSaveError(false);

    const endTime = Date.now();
    const timeTaken = Math.max(Math.floor((endTime - startTimeRef.current) / 1000), 1);

    try {
      const finalScore = calculateReflectionScore({
        completedRounds: completedRoundsRef.current,
        totalRounds: levelConfig.rounds,
        timeTaken,
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });

      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameData.id,
        area: "self_awareness",
        level,
        correct_answers: completedRoundsRef.current,
        wrong_answers: 0, // No "wrong" in reflection
        attempts: attemptsRef.current,
        time_taken: timeTaken,
        final_score: finalScore,
      });

      playGameSound("levelWin");
      setResultHref(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[ReflectionBoard] Failed to save score:", error);
      setIsSaving(false);
      setSaveError(true);
    }
  };

  if (isLoading) return <LoadingState message="Preparing your reflection board..." />;

  if (resultHref) {
    return (
      <CalmCompletionScreen
        onShowResults={() => router.push(resultHref)}
      />
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 flex flex-col">
      <CalmBackground />

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-rose-50 via-violet-50/20 to-blue-50/20 opacity-60" />

      <ReflectionGameHeader childId={params.childId} level={level} />

      <div className="relative z-10 flex-1 flex flex-col pb-20">
        {gameState === "playing" && situations.length > 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-12 sm:gap-16">
            {/* Reflection accepts all answers - mascot is always supportive after selection */}
            <MascotFeedbackBar feedbackType={feedback.visible ? "correct" : null} />

            <ReflectionSituationCard
              emoji={situations[currentRound].emoji}
              situation={situations[currentRound].situation}
            />

            <div className="w-full space-y-12">
              <ReflectionEmotionGrid
                emotions={levelConfig.emotions}
                onSelect={handleSelectEmotion}
                disabled={isAnswered}
              />

              <ReflectionProgress
                current={currentRound + 1}
                total={levelConfig.rounds}
              />
            </div>
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 p-12 sm:p-20 shadow-premium text-center space-y-10">
              <div className="w-24 h-24 rounded-full bg-rose-100 flex items-center justify-center text-5xl mx-auto shadow-sm">
                💖
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 leading-tight">Beautiful Reflection</h2>
                {saveError ? (
                  <div className="space-y-6 pt-4">
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                      Thank you for sharing your feelings today. We're having a tiny trouble saving your progress.
                    </p>
                    <button
                      onClick={handleSaveScore}
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-slate-900 text-white font-black uppercase tracking-widest text-xs shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50"
                    >
                      {isSaving ? "Trying again..." : "Try Saving Again"}
                    </button>
                  </div>
                ) : (
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you for sharing your feelings today. You are becoming very self-aware! 💛
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
