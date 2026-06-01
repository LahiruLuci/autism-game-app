"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [feedback, setFeedback] = useState<{ type: "success" | "info" | null; message: string }>({ type: null, message: "Let's think together!" });

  // 4. Performance Metrics
  const correctCountRef = useRef(0);
  const wrongCountRef = useRef(0);
  const attemptsRef = useRef(0);
  const startTimeRef = useRef<number>(0);

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
    setFeedback({ type: null, message: "Let's think together!" });
  }, [questions]);

  const handleAnswer = async (selectedLabel: string) => {
    if (feedback.type || !question) return;

    attemptsRef.current += 1;
    const targetEmotionData = EMOTIONS[question.correctAnswer];

    if (selectedLabel === targetEmotionData.label) {
      correctCountRef.current += 1;
      setFeedback({
        type: "success",
        message: "Great job! You got it!"
      });

      setTimeout(() => {
        if (currentRound < levelConfig.rounds) {
          const nextR = currentRound + 1;
          setCurrentRound(nextR);
          nextRound(nextR);
        } else {
          finishGame();
        }
      }, 2500);
    } else {
      wrongCountRef.current += 1;
      setFeedback({
        type: "info",
        message: "Nice try! Let's look again."
      });

      setTimeout(() => {
        setFeedback({ type: null, message: "Let's think together!" });
      }, 2500);
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
    <main className="min-h-screen relative flex flex-col overflow-y-auto bg-slate-50">
      <CalmBackground />

      {/* Progress Section */}
      <div className="relative z-10 pt-4 px-4">
        <EmotionProgressBar
          currentRound={currentRound}
          totalRounds={levelConfig.rounds}
        />
      </div>

      <div className="flex-1 py-12 px-6 flex flex-col items-center justify-center">
        {question && (
          <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

            {/* Left Column: Mascot Guide */}
            <div className="lg:w-5/12 flex flex-col items-center justify-center space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <LumiMascot
                state={feedback.type === "success" ? "correct" : feedback.type === "info" ? "incorrect" : "normal"}
                size="xl"
                className="scale-75 sm:scale-90 lg:scale-100 transition-transform duration-700"
              />
              <div className="bg-white/90 backdrop-blur-sm border-4 border-white px-6 lg:px-10 py-4 lg:py-6 rounded-[2.5rem] lg:rounded-[3rem] shadow-premium relative -mt-8 lg:mt-0">
                <p className="text-xl lg:text-3xl font-black text-slate-800 tracking-tight text-center">
                  {feedback.message}
                </p>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-l-4 border-t-4 border-white rotate-45" />
              </div>
            </div>

            {/* Right Column: Game Activity */}
            <div className="lg:w-7/12 flex flex-col gap-10 bg-white/40 backdrop-blur-lg p-8 sm:p-12 rounded-[4rem] border-8 border-white shadow-premium">
              {/* Question Header */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
                  {question.instruction}
                </h2>
              </div>

              <div className="flex flex-col items-center gap-6">
                <EmotionPromptCard question={question} feedbackVisible={!!feedback.type} />
              </div>

              <div className="w-full">
                <EmotionAnswerGrid
                  options={question.options.map(id => EMOTIONS[id])}
                  onAnswer={handleAnswer}
                  disabled={!!feedback.type}
                  level={level}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push(`/games/${params.childId}`)}
        className="absolute bottom-6 left-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all shadow-sm z-20"
      >
        <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {levelConfig.timerEnabled && (
        <div className="absolute bottom-4 right-20 px-4 py-2 bg-blue-500/10 backdrop-blur-md rounded-full border border-blue-200">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Speed Challenge Active ⚡</p>
        </div>
      )}
    </main>
  );
}
