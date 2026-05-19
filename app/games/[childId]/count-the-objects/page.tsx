"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";
import { LoadingState } from "@/components/ui/LoadingState";
import { CalmBackground } from "@/components/ui/CalmBackground";

// Components
import { CountingGameHeader } from "@/components/games/count-the-objects/CountingGameHeader";
import { CountingDisplayArea } from "@/components/games/count-the-objects/CountingDisplayArea";
import { NumberChoiceGrid } from "@/components/games/count-the-objects/NumberChoiceGrid";
import { CountingFeedback } from "@/components/games/count-the-objects/CountingFeedback";
import { CountingProgress } from "@/components/games/count-the-objects/CountingProgress";

// Logic
import { getCountingLevelConfig } from "@/lib/games/count-the-objects/levels";
import { generateCountingQuestions, CountingQuestion } from "@/lib/games/count-the-objects/questions";
import { calculateCountingScore } from "@/lib/games/count-the-objects/scoring";
import { getRandomCountingFeedback } from "@/lib/games/count-the-objects/helpers";
import { COUNT_OBJECTS_CONFIG } from "@/lib/games/count-the-objects/config";

// Types
import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function CountTheObjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ childId: string }>();
  const level = parseInt(searchParams?.get("level") || "1");
  const levelConfig = getCountingLevelConfig(level);

  // Core State
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameData, setGameData] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<"start" | "playing" | "saving" | "completed">("start");

  // Gameplay State
  const [questions, setQuestions] = useState<CountingQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "correct" | "incorrect" | null }>({
    message: "",
    type: null,
  });

  // Performance Metrics (Refs for sync updates)
  const correctCountRef = useRef(0);
  const wrongCountRef = useRef(0);
  const attemptsRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  
  const [displayScore, setDisplayScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Load Data
  useEffect(() => {
    async function init() {
      try {
        const [childRes, gameRes] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(COUNT_OBJECTS_CONFIG.gameSlug, level),
        ]);

        setChild(childRes.child);
        setGameData(childRes.child ? gameRes : null);
        
        const generatedQuestions = generateCountingQuestions(
          level, 
          levelConfig.rounds, 
          levelConfig.maxQuantity, 
          levelConfig.optionsCount
        );
        setQuestions(generatedQuestions);
        
        // Auto-start for counting
        startTimeRef.current = Date.now();
        setGameState("playing");
      } catch (error) {
        console.error("[CountObjects] Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [params.childId, level, levelConfig]);

  // Interaction
  const handleSelectAnswer = (value: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    attemptsRef.current += 1;

    const currentQuestion = questions[currentRound];
    const isCorrect = value === currentQuestion.count;

    if (isCorrect) {
      correctCountRef.current += 1;
      setFeedback({ 
        message: getRandomCountingFeedback("correct"), 
        type: "correct" 
      });
      
      // Update local score
      const newScore = calculateCountingScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken: Math.floor((Date.now() - startTimeRef.current) / 1000),
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });
      setDisplayScore(newScore);

      // Next round after delay
      setTimeout(() => {
        if (currentRound + 1 < levelConfig.rounds) {
          const nextIndex = currentRound + 1;
          setCurrentRound(nextIndex);
          setIsAnswered(false);
          setFeedback({ message: "", type: null });
        } else {
          finishGame();
        }
      }, 2000);
    } else {
      wrongCountRef.current += 1;
      setFeedback({ 
        message: getRandomCountingFeedback("incorrect"), 
        type: "incorrect" 
      });
      
      // Allow retry after delay
      setTimeout(() => {
        setIsAnswered(false);
        setFeedback({ message: "", type: null });
      }, 2000);
    }
  };

  const finishGame = async () => {
    setGameState("saving");
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
      const finalScore = calculateCountingScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken,
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });

      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameData.id,
        area: "mathematical",
        level,
        correct_answers: correctCountRef.current,
        wrong_answers: wrongCountRef.current,
        attempts: attemptsRef.current,
        time_taken: timeTaken,
        final_score: finalScore,
      });

      router.push(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[CountObjects] Failed to save score:", error);
      setIsSaving(false);
      setSaveError(true);
      setGameState("completed");
    }
  };

  if (isLoading) return <LoadingState message="Setting up your counting activity..." />;

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 flex flex-col pb-20">
      <CalmBackground />
      
      {/* Dynamic Themed Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyan-50 via-blue-50/20 to-violet-50/20 opacity-60" />

      <CountingGameHeader 
        childId={params.childId} 
        score={displayScore} 
        level={level} 
      />

      <div className="relative z-10 flex-1 flex flex-col">
        {gameState === "playing" && questions.length > 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 sm:gap-12">
            <CountingFeedback 
              message={feedback.message} 
              type={feedback.type} 
            />
            
            <CountingDisplayArea 
              emoji={questions[currentRound].emoji} 
              count={questions[currentRound].count} 
            />

            <div className="w-full space-y-12">
              <NumberChoiceGrid 
                options={questions[currentRound].options} 
                onSelect={handleSelectAnswer} 
                disabled={isAnswered} 
              />

              <CountingProgress 
                current={currentRound + 1} 
                total={levelConfig.rounds} 
              />
            </div>
          </div>
        )}

        {gameState === "saving" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <LoadingState message="Saving your wonderful counting progress..." />
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 p-12 sm:p-20 shadow-premium text-center space-y-10">
              <div className="w-24 h-24 rounded-full bg-cyan-100 flex items-center justify-center text-5xl mx-auto shadow-sm">
                🔢
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 leading-tight">Great Counting!</h2>
                {saveError ? (
                  <div className="space-y-6 pt-4">
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                      You did a wonderful job counting today. We're having a little trouble saving your score right now.
                    </p>
                    <button
                      onClick={handleSaveScore}
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-cyan-600 text-white font-black uppercase tracking-widest text-xs shadow-xl hover:bg-cyan-700 transition-all"
                    >
                      {isSaving ? "Trying again..." : "Try Saving Again"}
                    </button>
                  </div>
                ) : (
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                    Wonderful work! We're preparing your result...
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
