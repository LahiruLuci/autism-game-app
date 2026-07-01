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

import { PatternGameHeader } from "@/components/games/pattern-builder/PatternGameHeader";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";
import { PatternSequenceCard } from "@/components/games/pattern-builder/PatternSequenceCard";
import { PatternAnswerGrid } from "@/components/games/pattern-builder/PatternAnswerGrid";
import { PatternProgress } from "@/components/games/pattern-builder/PatternProgress";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";

import { getLevelConfig } from "@/lib/games/pattern-builder/levels";
import { getQuestionsForLevel, PatternQuestion } from "@/lib/games/pattern-builder/patterns";
import { calculatePatternScore } from "@/lib/games/pattern-builder/scoring";
import { getRandomFeedback } from "@/lib/games/pattern-builder/helpers";
import { PATTERN_BUILDER_CONFIG } from "@/lib/games/pattern-builder/config";

import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function PatternBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ childId: string }>();
  const level = parseInt(searchParams?.get("level") || "1");
  const levelConfig = getLevelConfig(level);

  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameData, setGameData] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [gameState, setGameState] = useState<"start" | "playing" | "completed">("start");
  const [resultHref, setResultHref] = useState<string | null>(null);
  const [questions, setQuestions] = useState<PatternQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

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

  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    if (gameState === "start") {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [gameState]);

  const totalRounds = questions.length || levelConfig.totalRounds;
  const currentQuestion = questions[currentRound];

  const startGame = () => {
    correctCountRef.current = 0;
    wrongCountRef.current = 0;
    attemptsRef.current = 0;
    startTimeRef.current = Date.now();

    const levelQuestions = getQuestionsForLevel(level, levelConfig.totalRounds);
    if (levelQuestions.length === 0) {
      console.error(`[PatternBuilder] No questions found for level ${level}.`);
      setIsLoading(false);
      return;
    }

    setQuestions(levelQuestions);
    setGameState("playing");
    setCurrentRound(0);
    setCurrentScore(0);
    setIsAnswered(false);
    setFeedback({ message: "", type: null });
  };

  const handleAnswer = (selected: string) => {
    if (isAnswered || !currentQuestion) return;

    setIsAnswered(true);
    attemptsRef.current += 1;
    const isCorrect = selected === currentQuestion.correctAnswer;

    if (isCorrect) {
      correctCountRef.current += 1;
      showFeedback(getRandomFeedback("correct"), "correct");

      const newScore = calculatePatternScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken: Math.floor((Date.now() - startTimeRef.current) / 1000),
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });
      setCurrentScore(newScore);

      setTimeout(() => {
        if (currentRound + 1 < totalRounds) {
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

      setTimeout(() => {
        setIsAnswered(false);
        setFeedback({ message: "", type: null });
      }, 2000);
    }
  };

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
      const finalScore = calculatePatternScore({
        correctAnswers: totalRounds,
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

      playGameSound("levelWin");
      setResultHref(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[PatternBuilder] Failed to save score:", error);
      setIsSaving(false);
      setSaveError(true);
    }
  };

  if (isLoading) return <LoadingState message="Creating your patterns..." />;

  if (resultHref) {
    return (
      <CalmCompletionScreen
        onShowResults={() => router.push(resultHref)}
      />
    );
  }

  if (gameState === "start") {
    return (
      <main className="fixed inset-0 overflow-hidden bg-slate-50">
        <CalmBackground />
        <div className="flex h-full flex-col">
          <PatternGameHeader childId={params.childId} score={currentScore} level={level} />
          <div className="relative z-10 flex min-h-0 flex-1 items-start justify-center px-4 pb-4 sm:px-6 sm:pb-6">
            <GameIntroScreen
              title="Complete the Pattern!"
              description="Look at the sequence and find what comes next. Let's build it together!"
              level={level}
              levelLabel={levelConfig.totalRounds + " Rounds"}
              mascotImage="/images/games/pattern-builder.png"
              buttonText="Start Building Patterns"
              onStart={startGame}
              onBack={() => router.push(`/games/${params.childId}`)}
              accentColor="blue"
              chips={[
                { icon: "🧩", text: "Solve Puzzles" },
                { icon: "🎨", text: "Match Patterns" },
              ]}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-50 pb-20 sm:pb-8">
      <CalmBackground />
      <PatternGameHeader childId={params.childId} score={currentScore} level={level} />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6">
        {gameState === "playing" && currentQuestion && (
          <div className="space-y-8 py-6 sm:space-y-12 sm:py-10">
            <PatternSequenceCard
              pattern={currentQuestion.pattern}
              instruction={currentQuestion.instruction}
            />

            <PatternAnswerGrid
              options={currentQuestion.options}
              onSelect={handleAnswer}
              disabled={isAnswered}
            />

            <PatternProgress current={currentRound + 1} total={totalRounds} />

            <div className="fixed bottom-4 right-4 z-30 flex items-end gap-2 sm:bottom-7 sm:right-7 lg:bottom-10 lg:right-10">
              <div className="mb-8 max-w-[190px] rounded-[1.5rem] border border-blue-100 bg-white px-4 py-3 text-center shadow-lg sm:mb-10 sm:max-w-[230px] sm:px-5 sm:py-4 lg:mb-12 lg:max-w-[250px]">
                <p className="text-sm font-black leading-snug text-slate-800 sm:text-base">{mobileMascotMessage}</p>
              </div>
              <LumiMascot
                state={mobileMascotState}
                size="float"
                className="items-end"
              />
            </div>
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex flex-col items-center justify-center space-y-8 rounded-[3rem] border border-white/80 bg-white/40 py-20 text-center shadow-premium backdrop-blur-xl sm:py-32">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-4xl">🌟</div>
            <div className="mx-auto max-w-md space-y-4">
              <h2 className="text-4xl font-black text-slate-900">Pattern Complete!</h2>
              {saveError ? (
                <div className="space-y-6">
                  <p className="text-lg font-medium leading-relaxed text-slate-500">
                    You've solved every sequence, but we're having a little trouble saving your score right now.
                  </p>
                  <button
                    onClick={handleSaveScore}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-blue-700"
                  >
                    {isSaving ? "Trying again..." : "Try Saving Again"}
                  </button>
                </div>
              ) : (
                <p className="text-xl font-medium leading-relaxed text-slate-500">
                  You've solved every sequence! <br />
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
