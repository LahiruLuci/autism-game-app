"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Backend Helpers
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";

// Game Logic & Config
import { EMOTION_STORY_CHOICE_CONFIG } from "@/lib/games/emotion-story-choice/config";
import { getStoryLevelConfig } from "@/lib/games/emotion-story-choice/levels";
import { getStoriesForLevel } from "@/lib/games/emotion-story-choice/stories";
import { calculateStoryChoiceScore, shuffleStories } from "@/lib/games/emotion-story-choice/scoring";
import { EMOTIONS } from "@/lib/games/emotion-face-match/emotions";

// UI Components
import { CalmBackground } from "@/components/ui/CalmBackground";
import { LoadingState } from "@/components/ui/LoadingState";
import { StoryHeader } from "@/components/games/emotion-story-choice/StoryHeader";
import { StoryProgressBar } from "@/components/games/emotion-story-choice/StoryProgressBar";
import { StoryCard } from "@/components/games/emotion-story-choice/StoryCard";
import { StoryAnswerGrid } from "@/components/games/emotion-story-choice/StoryAnswerGrid";
import { MascotFeedbackBar } from "@/components/games/redesign/MascotFeedbackBar";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";

// Types
import type { ChildProfile } from "@/types/child";
import type { Game } from "@/types/game";
import type { Story } from "@/types/games/emotion-story-choice";
import type { EmotionId } from "@/types/games/emotion-face-match";

export default function EmotionStoryChoicePage() {
  const params = useParams<{ childId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Level Initialization
  const level = parseInt(searchParams.get("level") || "1");
  const levelConfig = getStoryLevelConfig(level);

  // 2. Main Game State
  const [gameState, setGameState] = useState<"loading" | "start" | "playing" | "saving" | "error">("loading");
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameRecord, setGameRecord] = useState<Game | null>(null);

  // 3. Gameplay State
  const [stories, setStories] = useState<Story[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [story, setStory] = useState<Story | null>(null);
  const [feedback, setFeedback] = useState<{ type: "correct" | "incorrect" | null; visible: boolean }>({ type: null, visible: false });

  // 4. Performance State
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  // Initialize Data
  useEffect(() => {
    async function init() {
      try {
        const [c, g] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(EMOTION_STORY_CHOICE_CONFIG.gameSlug, level),
        ]);

        const levelStories = shuffleStories(getStoriesForLevel(level));

        setChild(c.child);
        setGameRecord(g);
        setStories(levelStories);
        setGameState("start");
      } catch (err) {
        console.error("[BrightPath] Initialization failed:", err);
        setGameState("error");
      }
    }
    init();
  }, [params.childId, level]);

  // Game Controllers
  const startGame = () => {
    setGameState("playing");
    setStartTime(Date.now());
    nextRound(1);
  };

  const nextRound = useCallback((roundNumber: number) => {
    const nextS = stories[roundNumber - 1];
    setStory(nextS || null);
    setFeedback({ type: null, visible: false });
  }, [stories]);

  const handleAnswer = async (selectedId: EmotionId) => {
    if (feedback.visible || !story) return;

    setAttempts(prev => prev + 1);

    if (selectedId === story.correctEmotion) {
      setCorrectCount(prev => prev + 1);
      setFeedback({ type: "correct", visible: true });

      setTimeout(() => {
        if (currentRound < levelConfig.rounds) {
          const nextR = currentRound + 1;
          setCurrentRound(nextR);
          nextRound(nextR);
        } else {
          finishGame(correctCount + 1, wrongCount, attempts + 1);
        }
      }, 2000);
    } else {
      setWrongCount(prev => prev + 1);
      setFeedback({ type: "incorrect", visible: true });

      setTimeout(() => {
        setFeedback({ type: null, visible: false });
      }, 2000);
    }
  };

  const finishGame = async (finalCorrect: number, finalWrong: number, finalAttempts: number) => {
    setGameState("saving");
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const result = calculateStoryChoiceScore(
      levelConfig,
      finalCorrect,
      finalWrong,
      timeTaken
    );

    try {
      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameRecord?.id || "",
        area: "emotion",
        level,
        correct_answers: finalCorrect,
        wrong_answers: finalWrong,
        attempts: finalAttempts,
        time_taken: timeTaken,
        final_score: result.finalScore
      });

      router.push(`/game-result/${sessionId}`);
    } catch (err) {
      setGameState("error");
    }
  };

  // Render Logic
  if (gameState === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <LoadingState message={`Opening Storybook Level ${level}...`} />
      </main>
    );
  }

  if (gameState === "start") {
    return (
      <GameIntroScreen
        title="Let's Read Together!"
        description="Read a short story and choose how the character feels."
        level={level}
        levelLabel={levelConfig.label}
        mascotImage="/images/games/emotion-story.png"
        buttonText="Start Story Adventure"
        onStart={startGame}
        onBack={() => router.push(`/games/${params.childId}`)}
        accentColor="orange"
        chips={[
          { icon: "⭐", text: "Earn Stars" },
          { icon: "😊", text: "Learn Feelings" }
        ]}
      />
    );
  }

  if (gameState === "saving") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <LoadingState message="Closing the storybook gently..." />
      </main>
    );
  }

  if (gameState === "error") {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-4">
        <CalmBackground />
        <div className="text-center space-y-4">
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Something went wrong</p>
          <button onClick={() => window.location.reload()} className="text-blue-500 font-bold underline">Try Again</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative flex flex-col overflow-hidden">
      <CalmBackground />

      <StoryHeader
        childName={child?.child_name || "Child"}
        levelConfig={levelConfig}
        currentRound={currentRound}
        childId={params.childId}
      />

      <StoryProgressBar
        currentRound={currentRound}
        totalRounds={levelConfig.rounds}
      />

      <div className="flex-1 flex flex-col items-center justify-start p-6 pt-12 space-y-12">
        {story && (
          <>
            <div className="w-full space-y-8 flex flex-col items-center">
              <MascotFeedbackBar feedbackType={feedback.type} />
              <StoryCard story={story} />
            </div>

            <div className="w-full space-y-8 pb-12">
              <StoryAnswerGrid
                options={story.options}
                onAnswer={handleAnswer}
                disabled={feedback.visible}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
