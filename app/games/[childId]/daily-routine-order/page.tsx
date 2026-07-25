"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";

import { playGameSound } from "@/lib/game-sounds";

import { LoadingState } from "@/components/ui/LoadingState";

import { CalmCompletionScreen } from "@/components/games/CalmCompletionScreen";
import { RoutineAtmosphere } from "@/components/games/daily-routine-order/RoutineAtmosphere";
import { Undo2, CheckCircle2 } from "lucide-react";

// Routine Order Components
import { RoutineGameHeader } from "@/components/games/daily-routine-order/RoutineGameHeader";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";
import { RoutineMixedSteps } from "@/components/games/daily-routine-order/RoutineMixedSteps";
import { RoutineSelectedOrder } from "@/components/games/daily-routine-order/RoutineSelectedOrder";
import { RoutineProgress } from "@/components/games/daily-routine-order/RoutineProgress";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";

// Logic & Helpers
import { getLevelConfig } from "@/lib/games/daily-routine-order/levels";
import { getRoutinesForLevel, RoutineQuestion, RoutineStep } from "@/lib/games/daily-routine-order/routines";
import { calculateRoutineScore } from "@/lib/games/daily-routine-order/scoring";
import { getRandomFeedback, shuffleSteps, isOrderCorrect } from "@/lib/games/daily-routine-order/helpers";
import { ROUTINE_ORDER_CONFIG } from "@/lib/games/daily-routine-order/config";

// Types
import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function DailyRoutineOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ childId: string }>();
  const level = parseInt(searchParams?.get("level") || "1");
  const levelConfig = getLevelConfig(level);

  // State
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameData, setGameData] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [gameState, setGameState] = useState<"start" | "playing" | "completed">("start");
  const [resultHref, setResultHref] = useState<string | null>(null);

  // Game Progress State
  const [routines, setRoutines] = useState<RoutineQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [mixedSteps, setMixedSteps] = useState<RoutineStep[]>([]);
  const [selectedSteps, setSelectedSteps] = useState<RoutineStep[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  // 4. Performance Metrics (Use refs for synchronous updates)
  const correctCountRef = useRef(0);
  const wrongCountRef = useRef(0);
  const attemptsRef = useRef(0);
  const startTimeRef = useRef<number>(0);

  const [currentScore, setCurrentScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "correct" | "incorrect" | null }>({
    message: "",
    type: null,
  });

  const totalRounds = routines.length || levelConfig.totalRounds;
  const currentRoutine = routines[currentRound];
  const floatingMascotState =
    feedback.type === "correct"
      ? "correct"
      : feedback.type === "incorrect"
        ? "incorrect"
        : "normal";
  const floatingMascotMessage = feedback.message || "Choose the order.";


  // Load Data
  useEffect(() => {
    async function init() {
      try {
        const [childRes, gameRes] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(ROUTINE_ORDER_CONFIG.gameSlug, level),
        ]);

        setChild(childRes.child);
        setGameData(gameRes);
      } catch (error) {
        console.error("[RoutineOrder] Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [params.childId, level]);

  // Start Game
  const startGame = () => {
    correctCountRef.current = 0;
    wrongCountRef.current = 0;
    attemptsRef.current = 0;
    startTimeRef.current = Date.now();

    const levelRoutines = getRoutinesForLevel(level, levelConfig.totalRounds);
    if (levelRoutines.length === 0) {
      console.error(`[RoutineOrder] No routines found for level ${level}.`);
      setIsLoading(false);
      return;
    }

    setRoutines(levelRoutines);
    setGameState("playing");
    initRound(levelRoutines[0]);
    setCurrentScore(0);
  };

  const initRound = (routine?: RoutineQuestion) => {
    if (!routine) return;
    setMixedSteps(shuffleSteps(routine.steps));
    setSelectedSteps([]);
    setIsAnswered(false);
  };

  // Step Selection
  const handleSelectStep = (step: RoutineStep) => {
    if (isAnswered || selectedSteps.some(s => s.id === step.id)) return;
    setSelectedSteps([...selectedSteps, step]);
  };

  const handleUndo = () => {
    if (isAnswered || selectedSteps.length === 0) return;
    setSelectedSteps(selectedSteps.slice(0, -1));
  };

  // Check Order
  const handleCheckOrder = () => {
    if (!currentRoutine || isAnswered || selectedSteps.length !== currentRoutine.steps.length) return;

    setIsAnswered(true);
    attemptsRef.current += 1;

    const isCorrect = isOrderCorrect(selectedSteps, currentRoutine.steps);

    if (isCorrect) {
      correctCountRef.current += 1;
      showFeedback(getRandomFeedback("correct"), "correct");

      // Update local score
      const newScore = calculateRoutineScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken: Math.floor((Date.now() - startTimeRef.current) / 1000),
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });
      setCurrentScore(newScore);

      // Next round after delay
      setTimeout(() => {
        if (currentRound + 1 < totalRounds) {
          const nextRound = currentRound + 1;
          setCurrentRound(nextRound);
          initRound(routines[nextRound]);
          setFeedback({ message: "", type: null });
        } else {
          finishGame();
        }
      }, 2500);
    } else {
      wrongCountRef.current += 1;
      showFeedback(getRandomFeedback("incorrect"), "incorrect");

      // Allow retry
      setTimeout(() => {
        setSelectedSteps([]);
        setIsAnswered(false);
        setFeedback({ message: "", type: null });
      }, 2500);
    }
  };

  // Refs
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showFeedback = (message: string, type: "correct" | "incorrect") => {
    playGameSound(type === "correct" ? "correct" : "wrong");
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback({ message, type });
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback({ message: "", type: null });
    }, 2500);
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
      const finalScore = calculateRoutineScore({
        correctAnswers: totalRounds,
        wrongAnswers: wrongCountRef.current,
        timeTaken,
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });

      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameData.id,
        area: "self_awareness",
        level,
        correct_answers: correctCountRef.current,
        wrong_answers: wrongCountRef.current,
        attempts: attemptsRef.current,
        time_taken: timeTaken,
        final_score: finalScore,
      });

      playGameSound("levelWin");
      setResultHref(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[RoutineOrder] Failed to save score:", error);
      setIsSaving(false);
      setSaveError(true);
    }
  };

  if (isLoading) return <LoadingState message="Preparing your daily routines..." />;

  if (resultHref) {
    return (
      <CalmCompletionScreen
        onShowResults={() => router.push(resultHref)}
      />
    );
  }

  return (
    <main className="daily-routine-page relative min-h-screen overflow-x-hidden bg-[#fffaf0] pb-24 sm:pb-10">
      <RoutineAtmosphere />

      <RoutineGameHeader
        childId={params.childId}
        score={currentScore}
        level={level}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {gameState === "start" && (
          <GameIntroScreen
            title="What Happens First?"
            description="Look at the mixed steps and tap them in the order they happen."
            level={level}
            levelLabel={levelConfig.stepsPerRoutine + " Steps"}
            mascotImage="/images/games/daily-routine.png"
            buttonText="Start Routine Adventure"
            onStart={startGame}
            onBack={() => router.push(`/games/${params.childId}`)}
            accentColor="orange"
            chips={[
              { icon: "\u2B50", text: "Learn Order" },
              { icon: "\uD83C\uDF1E", text: "Daily Skills" }
            ]}
          />
        )}

        {gameState === "playing" && currentRoutine && (
          <div className="mx-auto space-y-5 rounded-[2.75rem] border border-white/80 bg-white/75 p-4 shadow-[0_26px_74px_rgba(245,158,11,0.13)] backdrop-blur-xl sm:p-6 lg:space-y-6 lg:p-8">
            <div className="fixed bottom-4 right-4 z-30 flex items-end gap-2 sm:bottom-7 sm:right-7 lg:bottom-10 lg:right-10">
              <div className="mb-8 max-w-[190px] rounded-[1.5rem] border border-amber-100 bg-white/90 px-4 py-3 text-center shadow-[0_16px_36px_rgba(15,23,42,0.14)] backdrop-blur-md sm:mb-10 sm:max-w-[230px] sm:px-5 sm:py-4 lg:mb-12 lg:max-w-[250px]">
                <p className="text-sm font-black leading-snug text-slate-800 sm:text-base">{floatingMascotMessage}</p>
              </div>
              <LumiMascot
                state={floatingMascotState}
                size="float"
                className="items-end"
              />
            </div>

            <div className="mx-auto max-w-3xl space-y-2 rounded-[2rem] border border-white/70 bg-white/60 px-5 py-4 text-center shadow-[0_12px_32px_rgba(245,158,11,0.08)] backdrop-blur-md">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {currentRoutine.title}
              </h2>
              <p className="text-slate-500 font-medium">Tap the steps in the correct order.</p>
            </div>

            <RoutineSelectedOrder
              selectedSteps={selectedSteps}
              totalSteps={currentRoutine.steps.length}
            />

            <RoutineMixedSteps
              steps={mixedSteps}
              selectedIds={selectedSteps.map(s => s.id)}
              onSelect={handleSelectStep}
              disabled={isAnswered}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                disabled={isAnswered || selectedSteps.length === 0}
                onClick={handleUndo}
                className="flex h-auto w-full items-center justify-center gap-2 rounded-full border border-white/80 bg-white/90 px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-600 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:bg-amber-50 disabled:opacity-50 sm:w-auto"
              >
                <Undo2 size={18} />
                Undo Step
              </button>

              <button
                disabled={isAnswered || selectedSteps.length !== currentRoutine.steps.length}
                onClick={handleCheckOrder}
                className="flex h-auto w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-5 text-xs font-black uppercase tracking-widest text-white shadow-[0_16px_34px_rgba(245,158,11,0.22)] transition-all hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 sm:w-auto"
              >
                <CheckCircle2 size={18} />
                Check My Order
              </button>
            </div>

            <RoutineProgress
              current={currentRound + 1}
              total={totalRounds}
            />
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 shadow-premium">
            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-4xl">{"\uD83C\uDF1E"}</div>
            <div className="space-y-4 max-w-md mx-auto">
              <h2 className="text-4xl font-black text-slate-900">Great Job!</h2>
              {saveError ? (
                <div className="space-y-6">
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    You've completed your daily routine practice, but we're having a little trouble saving your score right now.
                  </p>
                  <button
                    onClick={handleSaveScore}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-lg hover:bg-blue-700 transition-all"
                  >
                    {isSaving ? "Trying again..." : "Try Saving Again"}
                  </button>
                </div>
              ) : (
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  You've completed your daily routine practice. <br />
                  {isSaving ? "Saving your progress now..." : "Success! Preparing your result..."}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
