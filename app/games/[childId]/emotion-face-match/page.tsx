"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

// Backend Helpers
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";

// Game Logic & Config
import { EMOTION_FACE_MATCH_CONFIG } from "@/lib/games/emotion-face-match/config";
import { getEmotionFaceMatchLevel } from "@/lib/games/emotion-face-match/levels";
import { getQuestionsForEmotionLevel } from "@/lib/games/emotion-face-match/questions";
import { calculateEmotionFaceMatchScore } from "@/lib/games/emotion-face-match/scoring";
import { EMOTIONS } from "@/lib/games/emotion-face-match/emotions";

// UI Components
import { CalmBackground } from "@/components/ui/CalmBackground";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmotionGameHeader } from "@/components/games/emotion-face-match/EmotionGameHeader";
import { EmotionProgressBar } from "@/components/games/emotion-face-match/EmotionProgressBar";
import { EmotionPromptCard } from "@/components/games/emotion-face-match/EmotionPromptCard";
import { EmotionAnswerGrid } from "@/components/games/emotion-face-match/EmotionAnswerGrid";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";

// Types
import type { ChildProfile } from "@/types/child";
import type { Game } from "@/types/game";
import type { EmotionQuestion } from "@/types/games/emotion-face-match";

export default function EmotionFaceMatchGamePage() {
  const params = useParams<{ childId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Level Initialization
  const level = parseInt(searchParams.get("level") || "1");
  const levelConfig = getEmotionFaceMatchLevel(level);

  // 2. Main Game State
  const [gameState, setGameState] = useState<"loading" | "start" | "playing" | "saving" | "error">("loading");
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameRecord, setGameRecord] = useState<Game | null>(null);

  // 3. Gameplay State
  const [questions, setQuestions] = useState<EmotionQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [question, setQuestion] = useState<EmotionQuestion | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "info" | null; message: string }>({ type: null, message: "Choose the answer you think is correct." });

  // 4. Performance Metrics (Use refs for synchronous updates during game)
  const correctCountRef = useRef(0);
  const wrongCountRef = useRef(0);
  const attemptsRef = useRef(0);
  const startTimeRef = useRef<number>(0);

  // Local state for UI display only
  const [displayScore, setDisplayScore] = useState(0);

  // Initialize Data
  useEffect(() => {
    async function init() {
      try {
        const [c, g] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(EMOTION_FACE_MATCH_CONFIG.gameSlug, level),
        ]);

        const levelQuestions = getQuestionsForEmotionLevel(level);

        setChild(c.child);
        setGameRecord(g);
        setQuestions(levelQuestions);
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
    correctCountRef.current = 0;
    wrongCountRef.current = 0;
    attemptsRef.current = 0;
    startTimeRef.current = Date.now();

    setGameState("playing");
    nextRound(1);
  };

  const nextRound = useCallback((roundNumber: number) => {
    const nextQ = questions[roundNumber - 1];
    setQuestion(nextQ || null);
    setFeedback({ type: null, message: "Choose the answer you think is correct." });
  }, [questions]);

  const handleAnswer = async (selectedLabel: string) => {
    if (feedback.type || !question) return;

    attemptsRef.current += 1;

    const targetEmotionData = EMOTIONS[question.correctAnswer];

    if (selectedLabel === targetEmotionData.label) {
      // Correct Path
      correctCountRef.current += 1;

      // Update display score for header
      const currentResult = calculateEmotionFaceMatchScore(
        levelConfig,
        correctCountRef.current,
        wrongCountRef.current,
        Math.floor((Date.now() - startTimeRef.current) / 1000)
      );
      setDisplayScore(currentResult.finalScore);

      setFeedback({
        type: "success",
        message: "Great job! You got it right!"
      });

      setTimeout(() => {
        if (currentRound < levelConfig.rounds) {
          const nextR = currentRound + 1;
          setCurrentRound(nextR);
          nextRound(nextR);
        } else {
          finishGame();
        }
      }, 1800);
    } else {
      // Wrong Path
      wrongCountRef.current += 1;
      setFeedback({
        type: "info",
        message: "Good try! Let's try again together."
      });

      setTimeout(() => {
        setFeedback({ type: null, message: "Choose the answer you think is correct." });
      }, 1800);
    }
  };

  const finishGame = async () => {
    setGameState("saving");
    const endTime = Date.now();
    const timeTaken = Math.max(Math.floor((endTime - startTimeRef.current) / 1000), 1);

    const result = calculateEmotionFaceMatchScore(
      levelConfig,
      correctCountRef.current,
      wrongCountRef.current,
      timeTaken
    );

    try {
      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameRecord?.id || "",
        area: "emotion",
        level,
        correct_answers: correctCountRef.current,
        wrong_answers: wrongCountRef.current,
        attempts: attemptsRef.current,
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
        <LoadingState message={`Preparing ${levelConfig.label} Level...`} />
      </main>
    );
  }

  if (gameState === "start") {
    return (
      <GameIntroScreen
        title="Emotion Face Match"
        description="Let's match faces to feelings together. We have fun rounds ahead!"
        level={level}
        levelLabel={levelConfig.label}
        mascotImage="/images/games/emotion-face-match.png"
        buttonText="Start Exploring"
        onStart={startGame}
        onBack={() => router.push(`/games/${params.childId}`)}
        accentColor="blue"
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
        <LoadingState message="Saving your wonderful progress..." />
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

      <EmotionGameHeader
        childName={child?.child_name || "Child"}
        levelConfig={levelConfig}
        currentRound={currentRound}
        childId={params.childId}
      />

      <EmotionProgressBar
        currentRound={currentRound}
        totalRounds={levelConfig.rounds}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 sm:space-y-12">
        {question && (
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-12">
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              {/* Left Side: Lumi feedback */}
              <div className="order-2 lg:order-1 w-full lg:w-1/3 flex justify-center">
                <LumiMascot
                  state={feedback.type === "success" ? "correct" : feedback.type === "info" ? "incorrect" : "normal"}
                  message={feedback.message}
                  size="md"
                />
              </div>

              {/* Center: Question Card */}
              <div className="order-1 lg:order-2 w-full lg:w-1/2">
                <div className="space-y-6 flex flex-col items-center w-full">
                  <EmotionPromptCard question={question} feedbackVisible={!!feedback.message} />
                </div>
              </div>
            </div>

            {/* Bottom: Answer Grid */}
            <div className="w-full space-y-8 pb-12">
              <div className="text-center">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                  {question.instruction}
                </h2>
              </div>

              <EmotionAnswerGrid
                options={question.options.map(id => EMOTIONS[id])}
                onAnswer={handleAnswer}
                disabled={!!feedback.type}
                level={level}
              />
            </div>
          </div>
        )}
      </div>

      {levelConfig.timerEnabled && (
        <div className="px-6 py-4 bg-white/40 backdrop-blur-md border-t border-white/60 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">Speed Challenge Active ⚡</p>
        </div>
      )}
    </main>
  );
}
