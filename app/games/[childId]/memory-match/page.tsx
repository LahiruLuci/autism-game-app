"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";

import { playGameSound } from "@/lib/game-sounds";

import { LoadingState } from "@/components/ui/LoadingState";

import { CalmCompletionScreen } from "@/components/games/CalmCompletionScreen";
import { CalmBackground } from "@/components/ui/CalmBackground";

import { MemoryGameHeader } from "@/components/games/memory-match/MemoryGameHeader";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";
import { MemoryCardGrid } from "@/components/games/memory-match/MemoryCardGrid";
import { MemoryProgress } from "@/components/games/memory-match/MemoryProgress";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";

import { getLevelConfig } from "@/lib/games/memory-match/levels";
import { calculateMemoryScore } from "@/lib/games/memory-match/scoring";
import { shuffleCards, getRandomFeedback, MemoryCardData } from "@/lib/games/memory-match/helpers";
import { MEMORY_MATCH_CONFIG } from "@/lib/games/memory-match/config";

import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function MemoryMatchPage() {
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

  const [cards, setCards] = useState<MemoryCardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; type: "correct" | "incorrect" | null }>({
    message: "",
    type: null,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const [childRes, gameRes] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(MEMORY_MATCH_CONFIG.gameSlug, level),
        ]);

        setChild(childRes.child);
        setGameData(gameRes);
      } catch (error) {
        console.error("[MemoryMatch] Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [params.childId, level]);

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;

    const newCards = [...cards];
    const cardIndex = newCards.findIndex((c) => c.id === cardId);
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts((prev) => prev + 1);
      checkForMatch(newFlipped);
    }
  };

  const checkForMatch = (flippedIds: string[]) => {
    const card1 = cards.find((c) => c.id === flippedIds[0]);
    const card2 = cards.find((c) => c.id === flippedIds[1]);

    if (card1?.icon === card2?.icon) {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === flippedIds[0] || c.id === flippedIds[1]
              ? { ...c, isMatched: true, isFlipped: true }
              : c
          )
        );
        setMatchedPairs((prev) => prev + 1);
        setFlippedCards([]);
        showFeedback(getRandomFeedback("correct"), "correct");

        const newScore = calculateMemoryScore({
          correctAnswers: matchedPairs + 1,
          wrongAnswers,
          timeTaken,
          level,
          timePenaltyDivisor: levelConfig.timePenaltyDivisor,
        });
        setScore(newScore);
      }, 600);
    } else {
      setWrongAnswers((prev) => prev + 1);
      showFeedback(getRandomFeedback("incorrect"), "incorrect");

      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            flippedIds.includes(c.id) ? { ...c, isFlipped: false } : c
          )
        );
        setFlippedCards([]);
      }, 1500);
    }
  };

  const showFeedback = (message: string, type: "correct" | "incorrect") => {
    playGameSound(type === "correct" ? "correct" : "wrong");
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback({ message, type });
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback({ message: "", type: null });
    }, 2000);
  };

  const startGame = () => {
    setCards(shuffleCards(levelConfig.icons));
    setGameState("playing");
    setMatchedPairs(0);
    setScore(0);
    setWrongAnswers(0);
    setAttempts(0);
    setTimeTaken(0);

    if (levelConfig.hasTimer) {
      timerRef.current = setInterval(() => {
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    if (gameState === "playing" && matchedPairs === levelConfig.pairsCount) {
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState("completed");
      completeGame();
    }
  }, [matchedPairs, gameState, levelConfig.pairsCount]);

  const completeGame = async () => {
    if (!child || !gameData) return;

    try {
      const finalScore = calculateMemoryScore({
        correctAnswers: matchedPairs,
        wrongAnswers,
        timeTaken,
        level,
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });

      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameData.id,
        area: "cognitive",
        level,
        correct_answers: matchedPairs,
        wrong_answers: wrongAnswers,
        attempts: attempts,
        time_taken: timeTaken,
        final_score: finalScore,
      });

      playGameSound("levelWin");
      setResultHref(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[MemoryMatch] Failed to save score:", error);
      alert("We could not save your score. Please try again.");
    }
  };

  const floatingMessage = feedback.type === "correct"
    ? "Nice match!"
    : feedback.type === "incorrect"
      ? "Try again."
      : "Find the match.";

  if (isLoading) return <LoadingState message="Preparing your memory journey..." />;

  if (resultHref) {
    return (
      <CalmCompletionScreen
        onShowResults={() => router.push(resultHref)}
      />
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      <CalmBackground />

      {gameState !== "start" && (
        <MemoryGameHeader
          childId={params.childId}
          childName={child?.child_name || "Adventurer"}
          score={score}
          level={level}
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        {gameState === "start" && (
          <GameIntroScreen
            title="Ready to Match?"
            description="Find the matching cards to practice your memory and focus. Let's explore together!"
            level={level}
            levelLabel={levelConfig.pairsCount + " Pairs"}
            mascotImage="/images/games/emotion-story.png"
            buttonText="Start Match Activity"
            onStart={startGame}
            onBack={() => router.push(`/games/${params.childId}`)}
            accentColor="orange"
            chips={[
              { icon: "🧠", text: "Boost Memory" },
              { icon: "🌟", text: "Practice Focus" }
            ]}
          />
        )}

        {gameState === "playing" && (
          <div className="space-y-6 py-6 lg:space-y-8 lg:py-8">
            <MemoryCardGrid
              cards={cards}
              onCardClick={handleCardClick}
              disabled={flippedCards.length === 2}
              gridCols={levelConfig.gridCols}
            />

            <MemoryProgress
              matchedPairs={matchedPairs}
              totalPairs={levelConfig.pairsCount}
            />
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
            <h2 className="text-4xl font-black text-slate-900">Wonderful Work! 🌟</h2>
            <p className="text-xl font-medium text-slate-600">Saving your journey stats...</p>
          </div>
        )}
      </div>

      {gameState === "playing" && (
        <div className="fixed bottom-4 right-4 z-30 lg:bottom-8 lg:right-8">
          <div className="relative">
            <AnimatePresence>
              <motion.div
                key={feedback.type ?? "normal"}
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 8 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-24 right-0 w-[170px] rounded-[1.5rem] bg-[#EFF6FF] px-4 py-3 text-sm font-black leading-snug text-slate-800 shadow-[0_16px_36px_rgba(15,23,42,0.16)] ring-1 ring-blue-100 lg:bottom-32 lg:w-[210px] lg:text-base"
              >
                {floatingMessage}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-sky-200 via-white to-cyan-100 opacity-90 blur-md lg:scale-[1.25] lg:opacity-100 lg:blur-lg" />
            <div className="relative flex size-24 items-center justify-center rounded-full bg-white/98 shadow-[0_18px_42px_rgba(15,23,42,0.22)] ring-4 ring-white backdrop-blur-sm lg:size-28 lg:shadow-[0_24px_54px_rgba(15,23,42,0.26)]">
              <div className="absolute inset-0 rounded-full ring-2 ring-sky-200/80" />
              <LumiMascot
                state={feedback.type === "correct" ? "correct" : feedback.type === "incorrect" ? "incorrect" : "normal"}
                size="sm"
                className="[&>div:first-child]:!h-[4.5rem] [&>div:first-child]:!w-[4.5rem] lg:[&>div:first-child]:!h-[5.25rem] lg:[&>div:first-child]:!w-[5.25rem]"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


