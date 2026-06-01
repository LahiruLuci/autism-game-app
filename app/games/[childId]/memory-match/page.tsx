"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";
import { LoadingState } from "@/components/ui/LoadingState";
import { CalmBackground } from "@/components/ui/CalmBackground";

// Memory Match Redesign Components
import { MemoryGameHeader } from "@/components/games/memory-match/MemoryGameHeader";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";
import { MemoryCardGrid } from "@/components/games/memory-match/MemoryCardGrid";
import { MemoryProgress } from "@/components/games/memory-match/MemoryProgress";
import { MascotFeedbackBar } from "@/components/games/redesign/MascotFeedbackBar";

// Logic & Helpers
import { getLevelConfig } from "@/lib/games/memory-match/levels";
import { calculateMemoryScore } from "@/lib/games/memory-match/scoring";
import { shuffleCards, getRandomFeedback, MemoryCardData } from "@/lib/games/memory-match/helpers";
import { MEMORY_MATCH_CONFIG } from "@/lib/games/memory-match/config";

// Types
import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function MemoryMatchPage() {
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

  // Game Logic State
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

  // Refs for timer and matching
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load Initial Data
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

  // Handle Card Click
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

  // Check for Match
  const checkForMatch = (flippedIds: string[]) => {
    const card1 = cards.find((c) => c.id === flippedIds[0]);
    const card2 = cards.find((c) => c.id === flippedIds[1]);

    if (card1?.icon === card2?.icon) {
      // MATCH
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

        // Update local score
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
      // NO MATCH
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

  // Show Feedback
  const showFeedback = (message: string, type: "correct" | "incorrect") => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback({ message, type });
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback({ message: "", type: null });
    }, 2000);
  };

  // Start Game
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

  // Handle Game Completion
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

      router.push(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[MemoryMatch] Failed to save score:", error);
      alert("We could not save your score. Please try again.");
    }
  };

  if (isLoading) return <LoadingState message="Preparing your memory journey..." />;

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50">
      <CalmBackground />

      {/* Header - Only show when playing */}
      {gameState !== "start" && (
        <MemoryGameHeader
          childId={params.childId}
          childName={child?.child_name || "Adventurer"}
          score={score}
          level={level}
        />
      )}

      <div className="relative z-10 w-full max-w-4xl mx-auto pb-20">
        {gameState === "start" && (
          <GameIntroScreen
            title="Ready to Match?"
            description="Find the matching cards to practice your memory and focus. Let's explore together!"
            level={level}
            levelLabel={levelConfig.pairsCount + " Pairs"}
            mascotImage="/images/games/memory-match.png"
            buttonText="Start Match Activity"
            onStart={startGame}
            onBack={() => router.push(`/games/${params.childId}`)}
            accentColor="blue"
            chips={[
              { icon: "🧠", text: "Boost Memory" },
              { icon: "🌟", text: "Practice Focus" }
            ]}
          />
        )}

        {gameState === "playing" && (
          <div className="space-y-8 py-10">
            <MascotFeedbackBar feedbackType={feedback.type} />

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
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <h2 className="text-4xl font-black text-slate-900">Wonderful Work! 🌟</h2>
            <p className="text-xl text-slate-600 font-medium">Saving your journey stats...</p>
          </div>
        )}
      </div>
    </main>
  );
}
