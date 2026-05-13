"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Backend Helpers
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";

// Game Logic & Config
import { EMOTION_FACE_MATCH_CONFIG } from "@/lib/games/emotion-face-match/config";
import { getEmotionFaceMatchLevel } from "@/lib/games/emotion-face-match/levels";
import { generateEmotionQuestion } from "@/lib/games/emotion-face-match/helpers";
import { calculateEmotionFaceMatchScore } from "@/lib/games/emotion-face-match/scoring";

// UI Components
import { CalmBackground } from "@/components/ui/CalmBackground";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmotionGameHeader } from "@/components/games/emotion-face-match/EmotionGameHeader";
import { EmotionProgressBar } from "@/components/games/emotion-face-match/EmotionProgressBar";
import { EmotionPromptCard } from "@/components/games/emotion-face-match/EmotionPromptCard";
import { EmotionFeedback } from "@/components/games/emotion-face-match/EmotionFeedback";
import { EmotionAnswerGrid } from "@/components/games/emotion-face-match/EmotionAnswerGrid";

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
  const [currentRound, setCurrentRound] = useState(1);
  const [question, setQuestion] = useState<EmotionQuestion | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "info" | null; message: string }>({ type: null, message: "" });
  
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
          getGameBySlugAndLevel(EMOTION_FACE_MATCH_CONFIG.gameSlug, level),
        ]);
        setChild(c.child);
        setGameRecord(g);
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
    const nextQuestion = generateEmotionQuestion(levelConfig);
    setQuestion(nextQuestion);
    setFeedback({ type: null, message: "" });
  }, [levelConfig]);

  const handleAnswer = async (selectedLabel: string) => {
    if (feedback.message || !question) return;

    setAttempts(prev => prev + 1);

    if (selectedLabel === question.targetEmotion.label) {
      // Correct Path
      setCorrectCount(prev => prev + 1);
      setFeedback({ 
        type: "success", 
        message: question.targetEmotion.supportiveText 
      });
      
      setTimeout(() => {
        if (currentRound < levelConfig.rounds) {
          const nextR = currentRound + 1;
          setCurrentRound(nextR);
          nextRound(nextR);
        } else {
          finishGame(correctCount + 1, wrongCount, attempts + 1);
        }
      }, 1500);
    } else {
      // Wrong Path (Supportive)
      setWrongCount(prev => prev + 1);
      setFeedback({ 
        type: "info", 
        message: "Good try! Let's practice again. 💛" 
      });
      
      setTimeout(() => {
        setFeedback({ type: null, message: "" });
      }, 1500);
    }
  };

  const finishGame = async (finalCorrect: number, finalWrong: number, finalAttempts: number) => {
    setGameState("saving");
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const result = calculateEmotionFaceMatchScore(
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
        <LoadingState message={`Preparing ${levelConfig.label} Level...`} />
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
          <div className="w-20 h-20 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">🎭</div>
          <div className="space-y-3 mb-8">
            <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
              Level {level} — {levelConfig.label}
            </span>
            <h1 className="font-display text-3xl font-bold text-slate-900 leading-tight">Emotion Face Match</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Hello {child?.child_name}! Can you help us find the face that matches the emotion?
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={startGame}
              className="inline-flex items-center justify-center py-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-extrabold shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Start Game
            </button>
            <button
              onClick={() => router.push(`/games/${params.childId}`)}
              className="inline-flex items-center justify-center py-5 rounded-full bg-white/80 text-slate-600 text-sm font-bold hover:bg-white transition-all"
            >
              Not Now
            </button>
          </div>
        </motion.div>
      </main>
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

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-12">
        {question && (
          <>
            <div className="space-y-8 flex flex-col items-center">
              <EmotionFeedback message={feedback.message} type={feedback.type} />
              <EmotionPromptCard emotion={question.targetEmotion} feedbackVisible={!!feedback.message} />
            </div>

            <div className="w-full space-y-8">
              <div className="text-center">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                  Which emotion is this?
                </h2>
              </div>

              <EmotionAnswerGrid 
                options={question.options} 
                onAnswer={handleAnswer} 
                disabled={!!feedback.message} 
                level={level} 
              />
            </div>
          </>
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
