"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";

import { playGameSound } from "@/lib/game-sounds";

import { LoadingState } from "@/components/ui/LoadingState";

import { EMOTION_STORY_CHOICE_CONFIG } from "@/lib/games/emotion-story-choice/config";
import { getStoryLevelConfig } from "@/lib/games/emotion-story-choice/levels";
import { getStoriesForLevel } from "@/lib/games/emotion-story-choice/stories";
import { calculateStoryChoiceScore, shuffleStories } from "@/lib/games/emotion-story-choice/scoring";

import { CalmBackground } from "@/components/ui/CalmBackground";

import { CalmCompletionScreen } from "@/components/games/CalmCompletionScreen";
import { StoryProgressBar } from "@/components/games/emotion-story-choice/StoryProgressBar";
import { StoryCard } from "@/components/games/emotion-story-choice/StoryCard";
import { StoryAnswerGrid } from "@/components/games/emotion-story-choice/StoryAnswerGrid";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";

import type { ChildProfile } from "@/types/child";
import type { Game } from "@/types/game";
import type { Story } from "@/types/games/emotion-story-choice";
import type { EmotionId } from "@/types/games/emotion-face-match";

export default function EmotionStoryChoicePage() {
  const params = useParams<{ childId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const level = parseInt(searchParams.get("level") || "1");
  const levelConfig = getStoryLevelConfig(level);

  
  const [gameState, setGameState] = useState<"loading" | "start" | "playing" | "saving" | "error">("loading");
  const [resultHref, setResultHref] = useState<string | null>(null);
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameRecord, setGameRecord] = useState<Game | null>(null);

  const [stories, setStories] = useState<Story[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [story, setStory] = useState<Story | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "correct" | "incorrect" | null;
    visible: boolean;
  }>({ type: null, visible: false });
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionId | null>(null);
  const [uiStage, setUiStage] = useState({
    showMascot: false,
    showBubble: false,
    showAnswers: false,
  });

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

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

  useEffect(() => {
    if (gameState !== "playing" || !story) return;

    setUiStage({
      showMascot: true,
      showBubble: true,
      showAnswers: true,
    });
  }, [gameState, story?.id]);

  const startGame = () => {
    setGameState("playing");
    setStartTime(Date.now());
    setUiStage({
      showMascot: true,
      showBubble: true,
      showAnswers: true,
    });
    nextRound(1);
  };

  const nextRound = useCallback(
    (roundNumber: number) => {
      const nextStory = stories[roundNumber - 1];
      if (!nextStory) {
        console.error(
          `[BrightPath] Missing Emotion Story Choice content for level ${level}, round ${roundNumber}.`,
        );
        setGameState("error");
        return;
      }

      setStory(nextStory);
      setFeedback({ type: null, visible: false });
      setSelectedEmotion(null);
    },
    [level, stories],
  );

  const handleAnswer = async (selectedId: EmotionId) => {
    if (feedback.visible || !story) return;

    setSelectedEmotion(selectedId);
    setAttempts((prev) => prev + 1);

    if (selectedId === story.correctEmotion) {
      playGameSound("correct");
      setCorrectCount((prev) => prev + 1);
      setFeedback({ type: "correct", visible: true });

      setTimeout(() => {
        if (currentRound < levelConfig.rounds) {
          const nextRoundNumber = currentRound + 1;
          setCurrentRound(nextRoundNumber);
          nextRound(nextRoundNumber);
        } else {
          finishGame(correctCount + 1, wrongCount, attempts + 1);
        }
      }, 2500);
    } else {
      playGameSound("wrong");
      setWrongCount((prev) => prev + 1);
      setFeedback({ type: "incorrect", visible: true });

      setTimeout(() => {
        setFeedback({ type: null, visible: false });
      }, 2500);
    }
  };

  const finishGame = async (
    finalCorrect: number,
    finalWrong: number,
    finalAttempts: number,
  ) => {
    setGameState("saving");
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const result = calculateStoryChoiceScore(
      levelConfig,
      finalCorrect,
      finalWrong,
      timeTaken,
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
        final_score: result.finalScore,
      });

      playGameSound("levelWin");
      setResultHref(`/game-result/${sessionId}`);
    } catch (err) {
      setGameState("error");
    }
  };

  const childFirstName = child?.child_name?.trim().split(" ")[0] || "friend";

  const mascotMessage = !feedback.visible
    ? `Hi ${childFirstName}! Let's think together. How do you think they feel?`
    : feedback.type === "correct"
      ? "Great job! You understood the feeling."
      : "Good try. Let's think again.";
  const mobileMascotMessage = !feedback.visible
    ? "Let's think together"
    : feedback.type === "correct"
      ? "Great job!"
      : "Good try.";

  if (gameState === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <LoadingState message={`Opening Storybook Level ${level}...`} />
      </main>
    );
  }
  if (resultHref) {
    return (
      <CalmCompletionScreen
        onShowResults={() => router.push(resultHref)}
      />
    );
  }


  if (gameState === "start") {
    return (
      <GameIntroScreen
        title="Story Choice"
        description={`Hello ${child?.child_name ?? "friend"}! Let's read some short stories and find the feelings together.`}
        level={level}
        levelLabel={levelConfig.label}
        mascotImage="/images/games/emotion-story.png"
        buttonText="Open Storybook"
        onStart={startGame}
        onBack={() => router.push(`/games/${params.childId}`)}
        accentColor="orange"
        chips={[
          { icon: "⭐", text: "Earn Stars" },
          { icon: "📖", text: "Read Stories" },
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
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">
            Something went wrong
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-500 font-bold underline"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-gradient-to-br from-[#FEF9F3] via-orange-50/20 to-sky-50 px-2 py-3 sm:px-5">
      <CalmBackground />

      {story && (
        <section className="relative z-10 mx-auto flex w-full max-w-[1300px] flex-col overflow-hidden rounded-[2rem] border border-white bg-white/95 shadow-[0_22px_70px_rgba(251,146,60,0.14)] backdrop-blur-sm lg:max-h-[calc(100vh-1.5rem)]">
          <header className="border-b border-orange-100 px-4 py-4 sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <StoryProgressBar
                  currentRound={currentRound}
                  totalRounds={levelConfig.rounds}
                />
              </div>

              <button
                onClick={() => router.push(`/games/${params.childId}`)}
                className="group flex flex-shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500 shadow-sm ring-1 ring-orange-100 transition-all hover:bg-rose-50 hover:text-rose-600 hover:ring-rose-200"
              >
                <svg
                  className="size-3.5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 8.959 8.959 0 01-9 9"
                  />
                </svg>
                Exit
              </button>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3 sm:p-5">
            <div className="rounded-[1.9rem] border border-orange-100 bg-gradient-to-br from-orange-50/70 to-white p-4 shadow-sm sm:p-5">
              <StoryCard story={story} />
            </div>

            <div className="grid items-center gap-4 rounded-[1.75rem] border border-orange-100 bg-white p-4 shadow-sm sm:p-5 md:grid-cols-[110px_minmax(0,1fr)]">
              <AnimatePresence mode="wait">
                {uiStage.showMascot && (
                  <motion.div
                    key={`mascot-${story.id}-${feedback.type ?? "normal"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35 }}
                    className="hidden min-[679px]:flex min-[679px]:justify-center md:justify-start"
                  >
                    <LumiMascot
                      state={feedback.type === "correct" ? "correct" : feedback.type === "incorrect" ? "incorrect" : "normal"}
                      size="sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {uiStage.showBubble && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35 }}
                    className="w-full rounded-[2rem] bg-[#FFF9F2] px-4 py-3 text-center shadow-[0_14px_40px_rgba(251,146,60,0.08)] ring-1 ring-orange-100/70 md:px-5 md:py-4 md:text-left"
                  >
                    <p className="text-sm font-black leading-relaxed text-slate-800 sm:text-base min-[679px]:text-lg">
                      <span className="min-[679px]:hidden">{mobileMascotMessage}</span>
                      <span className="hidden min-[679px]:inline">{mascotMessage}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: uiStage.showAnswers ? 1 : 0,
                y: uiStage.showAnswers ? 0 : 12,
              }}
              transition={{ duration: 0.35 }}
              className="min-h-0"
            >
              <StoryAnswerGrid
                options={story.options}
                onAnswer={handleAnswer}
                disabled={feedback.visible}
                selectedEmotion={selectedEmotion}
                correctEmotion={story.correctEmotion}
                feedbackType={feedback.type}
              />
            </motion.div>
          </div>
        </section>
      )}

      {story && uiStage.showMascot && (
        <div className="fixed bottom-4 right-4 z-30 min-[679px]:hidden">
          <div className="relative">
            <AnimatePresence>
              {feedback.type === "incorrect" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-24 right-0 w-[180px] rounded-[1.5rem] bg-[#FFF9F2] px-4 py-3 text-sm font-black leading-snug text-slate-800 shadow-[0_16px_36px_rgba(15,23,42,0.16)] ring-1 ring-orange-100"
                >
                  Good try. Let's think again.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-200 via-white to-orange-100 blur-md opacity-90 scale-110" />
            <div className="relative flex size-24 items-center justify-center rounded-full bg-white/98 shadow-[0_18px_42px_rgba(15,23,42,0.22)] ring-4 ring-white backdrop-blur-sm">
              <div className="absolute inset-0 rounded-full ring-2 ring-sky-200/80" />
              <LumiMascot
                state={feedback.type === "correct" ? "correct" : feedback.type === "incorrect" ? "incorrect" : "normal"}
                size="sm"
                className="[&>div:first-child]:!h-[4.5rem] [&>div:first-child]:!w-[4.5rem]"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
