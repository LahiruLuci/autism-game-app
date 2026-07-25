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
import { StoryAtmosphere } from "@/components/games/emotion-story-choice/StoryAtmosphere";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";

import type { ChildProfile } from "@/types/child";
import type { Game } from "@/types/game";
import type { Story } from "@/types/games/emotion-story-choice";
import type { EmotionId } from "@/types/games/emotion-face-match";

const CORRECT_ENCOURAGEMENTS = [
  "Great Job!",
  "Amazing!",
  "Nice Thinking!",
  "Fantastic!",
  "Well Done!",
  "You got it!",
];

const SUPPORTIVE_ENCOURAGEMENTS = [
  "Let's try again.",
  "Take your time.",
  "You're doing great.",
  "Think carefully.",
  "Let's look again.",
];

function pickFeedbackMessage(messages: string[], seed: string) {
  const value = Array.from(seed).reduce((total, char) => total + char.charCodeAt(0), 0);
  return messages[value % messages.length];
}
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

  const mascotState = feedback.type === "correct"
    ? "correct"
    : feedback.type === "incorrect"
      ? "incorrect"
      : "normal";
  const feedbackSeed = `${story?.id ?? "story"}-${selectedEmotion ?? "none"}-${currentRound}`;
  const selectedFeedbackMessage = feedback.type === "correct"
    ? pickFeedbackMessage(CORRECT_ENCOURAGEMENTS, feedbackSeed)
    : feedback.type === "incorrect"
      ? pickFeedbackMessage(SUPPORTIVE_ENCOURAGEMENTS, feedbackSeed)
      : "";
  const mascotMessage = !feedback.visible
    ? `Hi ${childFirstName}! Let's choose the feeling together.`
    : selectedFeedbackMessage;
  const compactMascotMessage = !feedback.visible
    ? "Let's think together"
    : selectedFeedbackMessage;

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
        {story ? <StoryAtmosphere story={story} /> : <CalmBackground />}
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
    <main className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-gradient-to-br from-[#FEF9F3] via-orange-50/20 to-sky-50 px-2 py-3 sm:px-5 xl:py-6">
      {story ? <StoryAtmosphere story={story} /> : <CalmBackground />}

      {story && (
        <section className="relative z-10 mx-auto flex w-full max-w-[1300px] flex-col overflow-hidden rounded-[2rem] border border-white bg-white/92 shadow-[0_22px_70px_rgba(251,146,60,0.14)] ring-1 ring-white/70 backdrop-blur-sm lg:min-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-1.5rem)] xl:max-w-[1460px] xl:rounded-[2.5rem] xl:shadow-[0_30px_90px_rgba(251,146,60,0.16)]">
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

          <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 overflow-y-auto p-3 sm:p-5 xl:gap-7 xl:p-7">
            <div className="relative overflow-hidden rounded-[1.9rem] border border-orange-100 bg-gradient-to-br from-orange-50/70 via-white to-white p-4 shadow-sm sm:p-5 xl:rounded-[2.25rem] xl:p-6 xl:shadow-[0_18px_55px_rgba(251,146,60,0.10)]">
              <div className="pointer-events-none absolute left-10 top-8 size-24 rounded-full bg-orange-100/35 blur-3xl" />
              <div className="pointer-events-none absolute bottom-4 right-10 size-28 rounded-full bg-sky-100/35 blur-3xl" />
              <StoryCard story={story} />
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
        <div className="fixed bottom-4 right-4 z-30 min-[728px]:bottom-auto min-[728px]:right-6 min-[728px]:top-28 xl:right-8 xl:top-24">
          <div className="relative flex items-end justify-end gap-3 min-[728px]:items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${story.id}-${feedback.type ?? "ready"}-mascot-message`}
                initial={{ opacity: 0, scale: 0.94, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 8 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-24 right-0 w-[190px] rounded-[2rem] bg-[#FFF9F2] px-4 py-3 text-sm font-black leading-snug text-slate-800 shadow-[0_16px_36px_rgba(15,23,42,0.16)] ring-1 ring-orange-100 min-[728px]:bottom-auto min-[728px]:right-24 min-[728px]:top-2 min-[728px]:w-[270px] min-[728px]:rounded-[2.25rem] min-[728px]:px-5 min-[728px]:py-4 min-[728px]:text-base xl:right-32 xl:top-5 xl:w-[330px] xl:px-6 xl:py-5 xl:text-lg xl:shadow-[0_24px_60px_rgba(251,146,60,0.18)]"
              >
                <span className="pointer-events-none absolute -right-2 bottom-5 size-5 rounded-full bg-[#FFF9F2] ring-1 ring-orange-100 min-[728px]:-right-3 min-[728px]:bottom-6 min-[728px]:size-7" />
                <span className="pointer-events-none absolute -right-7 bottom-1 size-3 rounded-full bg-[#FFF9F2] ring-1 ring-orange-100 min-[728px]:-right-8 min-[728px]:bottom-2 min-[728px]:size-4" />
                <span className="pointer-events-none absolute -left-2 top-3 size-4 rounded-full bg-white/80 min-[728px]:size-5" />
                <span className="relative min-[728px]:hidden">{compactMascotMessage}</span>
                <span className="relative hidden min-[728px]:inline">{mascotMessage}</span>
              </motion.div>
            </AnimatePresence>

            <motion.div
              animate={feedback.type === "correct" ? { scale: [1, 1.08, 1.02, 1], y: [0, -7, 0, -3, 0] } : feedback.type === "incorrect" ? { scale: [1, 1.035, 1], y: [0, -3, 0] } : { scale: [1, 1.045, 1] }}
              transition={{ duration: feedback.visible ? 0.85 : 3.8, repeat: feedback.visible ? 0 : Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(186,230,253,0.95)_0%,rgba(255,255,255,0.85)_45%,rgba(254,215,170,0.62)_72%,transparent_100%)] opacity-95 blur-md scale-125" />
              <div className="relative flex size-24 items-center justify-center rounded-full bg-white/98 shadow-[0_18px_42px_rgba(15,23,42,0.22)] ring-4 ring-white backdrop-blur-sm min-[728px]:size-28 min-[728px]:shadow-[0_24px_58px_rgba(251,146,60,0.22)] xl:size-36 xl:ring-[6px] xl:shadow-[0_30px_78px_rgba(56,189,248,0.28)]">
                <div className="absolute inset-0 rounded-full ring-2 ring-sky-200/80" />
                <LumiMascot
                  state={mascotState}
                  size="sm"
                  className="[&>div:first-child]:!h-[4.5rem] [&>div:first-child]:!w-[4.5rem] min-[728px]:[&>div:first-child]:!h-[5.5rem] min-[728px]:[&>div:first-child]:!w-[5.5rem] xl:[&>div:first-child]:!h-[7rem] xl:[&>div:first-child]:!w-[7rem]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </main>
  );
}
