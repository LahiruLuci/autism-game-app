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
import { ShapeMatchHeader } from "@/components/games/shape-number-match/ShapeMatchHeader";
import { ShapeDisplayCard } from "@/components/games/shape-number-match/ShapeDisplayCard";
import { ShapeAnswerGrid } from "@/components/games/shape-number-match/ShapeAnswerGrid";
import { ShapeProgress } from "@/components/games/shape-number-match/ShapeProgress";
import { MascotFeedbackBar } from "@/components/games/redesign/MascotFeedbackBar";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";

// Logic
import { getShapeMatchLevelConfig } from "@/lib/games/shape-number-match/levels";
import { generateShapeMatchQuestions, ShapeMatchQuestion, ShapeMatchOption } from "@/lib/games/shape-number-match/questions";
import { calculateShapeMatchScore } from "@/lib/games/shape-number-match/scoring";
import { getRandomShapeFeedback } from "@/lib/games/shape-number-match/helpers";
import { SHAPE_MATCH_CONFIG } from "@/lib/games/shape-number-match/config";

// Types
import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function ShapeNumberMatchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ childId: string }>();
  const level = parseInt(searchParams?.get("level") || "1");
  const levelConfig = getShapeMatchLevelConfig(level);

  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameData, setGameData] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [gameState, setGameState] = useState<"start" | "playing" | "saving" | "completed">("start");
  const [resultHref, setResultHref] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ShapeMatchQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "correct" | "incorrect" | null }>({
    message: "",
    type: null,
  });

  const correctCountRef = useRef(0);
  const wrongCountRef = useRef(0);
  const attemptsRef = useRef(0);
  const startTimeRef = useRef<number>(0);

  const [displayScore, setDisplayScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const mobileMascotState =
    feedback.type === "correct"
      ? "correct"
      : feedback.type === "incorrect"
        ? "incorrect"
        : "normal";
  const mobileMascotMessage =
    feedback.type === "correct"
      ? "Great job!"
      : feedback.type === "incorrect"
        ? "Let's try again."
        : "Choose the answer.";

  useEffect(() => {
    async function init() {
      try {
        const [childRes, gameRes] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(SHAPE_MATCH_CONFIG.gameSlug, level),
        ]);

        setChild(childRes.child);
        setGameData(childRes.child ? gameRes : null);

        const generatedQuestions = generateShapeMatchQuestions(
          level,
          levelConfig.rounds,
          levelConfig.maxQuantity,
          levelConfig.optionsCount
        );
        setQuestions(generatedQuestions);

        startTimeRef.current = Date.now();
        setGameState("playing");
      } catch (error) {
        console.error("[ShapeMatch] Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [params.childId, level, levelConfig]);

  const handleSelectAnswer = (option: ShapeMatchOption) => {
    if (isAnswered) return;
    setIsAnswered(true);
    attemptsRef.current += 1;

    if (option.isCorrect) {
      playGameSound("correct");
      correctCountRef.current += 1;
      setFeedback({
        message: getRandomShapeFeedback("correct"),
        type: "correct"
      });

      const newScore = calculateShapeMatchScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken: Math.floor((Date.now() - startTimeRef.current) / 1000),
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });
      setDisplayScore(newScore);

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
      playGameSound("wrong");
      wrongCountRef.current += 1;
      setFeedback({
        message: getRandomShapeFeedback("incorrect"),
        type: "incorrect"
      });

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
      const finalScore = calculateShapeMatchScore({
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

      playGameSound("levelWin");
      setResultHref(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[ShapeMatch] Failed to save score:", error);
      setIsSaving(false);
      setSaveError(true);
      setGameState("completed");
    }
  };

  if (isLoading) return <LoadingState message="Preparing the final adventure..." />;

  if (resultHref) {
    return (
      <CalmCompletionScreen
        onShowResults={() => router.push(resultHref)}
      />
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 flex flex-col pb-20">
      <CalmBackground />

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-sky-50 via-cyan-50/20 to-violet-50/20 opacity-60" />

      <ShapeMatchHeader
        childId={params.childId}
        score={displayScore}
        level={level}
      />

      <div className="relative z-10 flex-1 flex flex-col">
        {gameState === "playing" && questions.length > 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 sm:gap-12">
            <div className="hidden w-full sm:block">
              <MascotFeedbackBar feedbackType={feedback.type} />
            </div>

            <ShapeDisplayCard
              mode={questions[currentRound].mode}
              emoji={questions[currentRound].emoji}
              count={questions[currentRound].count}
            />

            <div className="w-full space-y-12">
              <ShapeAnswerGrid
                mode={questions[currentRound].mode}
                emoji={questions[currentRound].emoji}
                options={questions[currentRound].options}
                onSelect={handleSelectAnswer}
                disabled={isAnswered}
              />

              <ShapeProgress
                current={currentRound + 1}
                total={levelConfig.rounds}
              />
            </div>

            <div className="fixed bottom-4 right-4 z-30 sm:hidden">
              <LumiMascot
                state={mobileMascotState}
                size="sm"
                message={mobileMascotMessage}
                className="items-end"
              />
            </div>
          </div>
        )}

        {gameState === "saving" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <LoadingState message="Saving your final achievement..." />
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 p-12 sm:p-20 shadow-premium text-center space-y-10">
              <div className="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center text-5xl mx-auto shadow-sm">
                🌟
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 leading-tight">Platform Complete!</h2>
                {saveError ? (
                  <div className="space-y-6 pt-4">
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                      You've done an amazing job today! We're having a little trouble saving your final score right now.
                    </p>
                    <button
                      onClick={handleSaveScore}
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-sky-600 text-white font-black uppercase tracking-widest text-xs shadow-xl hover:bg-sky-700 transition-all"
                    >
                      {isSaving ? "Trying again..." : "Try Saving Again"}
                    </button>
                  </div>
                ) : (
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                    Amazing work! We're preparing your final result...
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
