"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";
import { LoadingState } from "@/components/ui/LoadingState";
import { CalmBackground } from "@/components/ui/CalmBackground";
import { Button } from "@/components/ui/Button";
import { Undo2, CheckCircle2 } from "lucide-react";

// Routine Order Components
import { RoutineGameHeader } from "@/components/games/daily-routine-order/RoutineGameHeader";
import { RoutineStartScreen } from "@/components/games/daily-routine-order/RoutineStartScreen";
import { RoutineMixedSteps } from "@/components/games/daily-routine-order/RoutineMixedSteps";
import { RoutineSelectedOrder } from "@/components/games/daily-routine-order/RoutineSelectedOrder";
import { RoutineFeedback } from "@/components/games/daily-routine-order/RoutineFeedback";
import { RoutineProgress } from "@/components/games/daily-routine-order/RoutineProgress";

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
    setRoutines(levelRoutines);
    setGameState("playing");
    initRound(levelRoutines[0]);
    setCurrentScore(0);
  };

  const initRound = (routine: RoutineQuestion) => {
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
    if (isAnswered || selectedSteps.length !== routines[currentRound].steps.length) return;
    
    setIsAnswered(true);
    attemptsRef.current += 1;

    const isCorrect = isOrderCorrect(selectedSteps, routines[currentRound].steps);

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
        if (currentRound + 1 < levelConfig.totalRounds) {
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
    setIsSaving(true);
    setSaveError(false);

    const endTime = Date.now();
    const timeTaken = Math.max(Math.floor((endTime - startTimeRef.current) / 1000), 1);

    try {
      const finalScore = calculateRoutineScore({
        correctAnswers: levelConfig.totalRounds,
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

      router.push(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[RoutineOrder] Failed to save score:", error);
      setIsSaving(false);
      setSaveError(true);
    }
  };

  if (isLoading) return <LoadingState message="Preparing your daily routines..." />;

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 pb-20">
      <CalmBackground />

      <RoutineGameHeader
        childId={params.childId}
        score={currentScore}
        level={level}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {gameState === "start" && (
          <RoutineStartScreen onStart={startGame} level={level} />
        )}

        {gameState === "playing" && routines.length > 0 && (
          <div className="space-y-12 py-6">
            <RoutineFeedback message={feedback.message} type={feedback.type} />
            
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {routines[currentRound].title}
              </h2>
              <p className="text-slate-500 font-medium">Tap the steps in the correct order.</p>
            </div>

            <RoutineSelectedOrder 
              selectedSteps={selectedSteps} 
              totalSteps={routines[currentRound].steps.length} 
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
                className="w-full sm:w-auto rounded-full px-8 py-6 h-auto font-black uppercase tracking-widest text-xs border-2 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <Undo2 size={18} />
                Undo Step
              </button>
              
              <button
                disabled={isAnswered || selectedSteps.length !== routines[currentRound].steps.length}
                onClick={handleCheckOrder}
                className="w-full sm:w-auto rounded-full px-10 py-6 h-auto font-black uppercase tracking-widest text-xs bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} />
                Check My Order
              </button>
            </div>

            <RoutineProgress 
              current={currentRound + 1} 
              total={levelConfig.totalRounds} 
            />
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 shadow-premium">
            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-4xl">🌞</div>
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
                  You've completed your daily routine practice. <br/>
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
