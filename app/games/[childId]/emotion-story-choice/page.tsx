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
      <main className="min-h-screen relative flex items-center justify-center p-4">
        <CalmBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/60 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-white/80 text-center"
        >
          <div className="w-20 h-20 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">📖</div>
          <div className="space-y-3 mb-8">
            <span className="px-4 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-widest border border-orange-100">
              Level {level} — {levelConfig.label}
            </span>
            <h1 className="font-display text-3xl font-bold text-slate-900 leading-tight">Story Choice</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Hello {child?.child_name}! Let's read some short stories and find the feelings together.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={startGame}
              className="inline-flex items-center justify-center py-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-extrabold shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Open Storybook
            </button>
            <button
              onClick={() => router.push(`/games/${params.childId}`)}
              className="inline-flex items-center justify-center py-5 rounded-full bg-white/80 text-slate-600 text-sm font-bold hover:bg-white transition-all"
            >
              Back to Games
            </button>
          </div>
        </motion.div>
      </main>
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
