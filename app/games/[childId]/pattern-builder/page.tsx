"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";
import { LoadingState } from "@/components/ui/LoadingState";
import { CalmBackground } from "@/components/ui/CalmBackground";

// Pattern Builder Components
import { PatternGameHeader } from "@/components/games/pattern-builder/PatternGameHeader";
import { PatternStartScreen } from "@/components/games/pattern-builder/PatternStartScreen";
import { PatternSequenceCard } from "@/components/games/pattern-builder/PatternSequenceCard";
import { PatternAnswerGrid } from "@/components/games/pattern-builder/PatternAnswerGrid";
import { PatternFeedback } from "@/components/games/pattern-builder/PatternFeedback";
import { PatternProgress } from "@/components/games/pattern-builder/PatternProgress";

// Logic & Helpers
import { getLevelConfig } from "@/lib/games/pattern-builder/levels";
import { getQuestionsForLevel, PatternQuestion } from "@/lib/games/pattern-builder/patterns";
import { calculatePatternScore } from "@/lib/games/pattern-builder/scoring";
import { getRandomFeedback } from "@/lib/games/pattern-builder/helpers";
import { PATTERN_BUILDER_CONFIG } from "@/lib/games/pattern-builder/config";

// Types
import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function PatternBuilderPage() {
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
  const [questions, setQuestions] = useState<PatternQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
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

  // Refs
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load Data
  useEffect(() => {
    async function init() {
      try {
        const [childRes, gameRes] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(PATTERN_BUILDER_CONFIG.gameSlug, level),
        ]);

        setChild(childRes.child);
        setGameData(childRes.child ? gameRes : null);
      } catch (error) {
        console.error("[PatternBuilder] Initialization failed:", error);
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

    const levelQuestions = getQuestionsForLevel(level, levelConfig.totalRounds);
    setQuestions(levelQuestions);
    setGameState("playing");
    setCurrentRound(0);
    setCurrentScore(0);
  };

  // Handle Answer Selection
  const handleAnswer = (selected: string) => {
    if (isAnswered) return;
    setIsAnswered(true);
    attemptsRef.current += 1;

    const currentQuestion = questions[currentRound];
    const isCorrect = selected === currentQuestion.correctAnswer;

    if (isCorrect) {
      correctCountRef.current += 1;
      showFeedback(getRandomFeedback("correct"), "correct");
      
      // Update local score
      const newScore = calculatePatternScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken: Math.floor((Date.now() - startTimeRef.current) / 1000),
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });
      setCurrentScore(newScore);

      // Next round after delay
      setTimeout(() => {
        if (currentRound + 1 < levelConfig.totalRounds) {
          setCurrentRound((prev) => prev + 1);
          setIsAnswered(false);
          setFeedback({ message: "", type: null });
        } else {
          finishGame();
        }
      }, 2000);
    } else {
      wrongCountRef.current += 1;
      showFeedback(getRandomFeedback("incorrect"), "incorrect");
      
      // Allow retry after delay
      setTimeout(() => {
        setIsAnswered(false);
        setFeedback({ message: "", type: null });
      }, 2000);
    }
  };

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
      const finalScore = calculatePatternScore({
        correctAnswers: levelConfig.totalRounds,
        wrongAnswers: wrongCountRef.current,
        timeTaken,
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });

      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameData.id,
        area: "cognitive",
        level,
        correct_answers: correctCountRef.current,
        wrong_answers: wrongCountRef.current,
        attempts: attemptsRef.current,
        time_taken: timeTaken,
        final_score: finalScore,
      });

      router.push(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[PatternBuilder] Failed to save score:", error);
      setIsSaving(false);
      setSaveError(true);
    }
  };

  if (isLoading) return <LoadingState message="Creating your patterns..." />;

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 pb-20">
      <CalmBackground />

      {/* Header */}
      <PatternGameHeader
        childId={params.childId}
        score={currentScore}
        level={level}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {gameState === "start" && (
          <PatternStartScreen onStart={startGame} level={level} />
        )}

        {gameState === "playing" && questions.length > 0 && (
          <div className="space-y-12 py-10">
            <PatternFeedback message={feedback.message} type={feedback.type} />
            
            <PatternSequenceCard 
              pattern={questions[currentRound].pattern} 
              instruction={questions[currentRound].instruction} 
            />

            <PatternAnswerGrid 
              options={questions[currentRound].options} 
              onSelect={handleAnswer} 
              disabled={isAnswered} 
            />

            <PatternProgress 
              current={currentRound + 1} 
              total={levelConfig.totalRounds} 
            />
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 shadow-premium">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-4xl">🌟</div>
            <div className="space-y-4 max-w-md mx-auto">
              <h2 className="text-4xl font-black text-slate-900">Pattern Complete!</h2>
              {saveError ? (
                <div className="space-y-6">
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    You've solved every sequence, but we're having a little trouble saving your score right now. 
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
                  You've solved every sequence! <br/>
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
