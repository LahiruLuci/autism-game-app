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

// Components
import { ChoiceAdventureHeader } from "@/components/games/personal-choice-adventure/ChoiceAdventureHeader";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";
import { ScenarioCard } from "@/components/games/personal-choice-adventure/ScenarioCard";
import { ChoiceCardGrid } from "@/components/games/personal-choice-adventure/ChoiceCardGrid";
import { ChoiceProgress } from "@/components/games/personal-choice-adventure/ChoiceProgress";
import { MascotFeedbackBar } from "@/components/games/redesign/MascotFeedbackBar";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";

// Logic
import { getChoiceLevelConfig } from "@/lib/games/personal-choice-adventure/levels";
import { getScenariosForLevel, ChoiceScenario, ChoiceOption } from "@/lib/games/personal-choice-adventure/scenarios";
import { calculateChoiceScore } from "@/lib/games/personal-choice-adventure/scoring";
import { getRandomChoiceFeedback, shuffleOptions } from "@/lib/games/personal-choice-adventure/helpers";
import { PERSONAL_CHOICE_CONFIG } from "@/lib/games/personal-choice-adventure/config";

// Types
import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function PersonalChoiceAdventurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ childId: string }>();
  const level = parseInt(searchParams?.get("level") || "1");
  const levelConfig = getChoiceLevelConfig(level);

  // Core State
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameData, setGameData] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [gameState, setGameState] = useState<"start" | "playing" | "saving" | "completed">("start");
  const [resultHref, setResultHref] = useState<string | null>(null);

  // Gameplay State
  const [scenarios, setScenarios] = useState<ChoiceScenario[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [mixedOptions, setMixedOptions] = useState<ChoiceOption[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "correct" | "incorrect" | null; helpfulTip?: string }>({
    message: "",
    type: null,
  });

  // Performance Metrics (Refs for sync updates)
  const correctCountRef = useRef(0);
  const wrongCountRef = useRef(0);
  const attemptsRef = useRef(0);
  const startTimeRef = useRef<number>(0);

  const [displayScore, setDisplayScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const mobileMascotState =
    feedback.type === "correct"
      ? "correct"
      : feedback.type === "incorrect"
        ? "incorrect"
        : "normal";
  const mobileMascotMessage =
    feedback.message || "Choose a helpful choice.";

  // Load Data
  useEffect(() => {
    async function init() {
      try {
        const [childRes, gameRes] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(PERSONAL_CHOICE_CONFIG.gameSlug, level),
        ]);

        setChild(childRes.child);
        setGameData(childRes.child ? gameRes : null);

        const levelScenarios = getScenariosForLevel(level, levelConfig.rounds);
        setScenarios(levelScenarios);
      } catch (error) {
        console.error("[ChoiceAdventure] Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [params.childId, level, levelConfig.rounds]);

  // Start Game
  const startGame = () => {
    correctCountRef.current = 0;
    wrongCountRef.current = 0;
    attemptsRef.current = 0;
    startTimeRef.current = Date.now();

    setGameState("playing");
    setCurrentRound(0);
    initRound(0);
  };

  const initRound = (index: number) => {
    if (!scenarios[index]) return;
    setMixedOptions(shuffleOptions(scenarios[index].options));
    setIsAnswered(false);
    setFeedback({ message: "", type: null });
  };

  // Interaction
  const handleSelectChoice = (option: ChoiceOption) => {
    if (isAnswered) return;
    setIsAnswered(true);
    attemptsRef.current += 1;

    if (option.isCorrect) {
      playGameSound("correct");
      correctCountRef.current += 1;
      setFeedback({
        message: getRandomChoiceFeedback("correct"),
        type: "correct"
      });

      // Update local score
      const newScore = calculateChoiceScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken: Math.floor((Date.now() - startTimeRef.current) / 1000),
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });
      setDisplayScore(newScore);

      // Next round after delay
      setTimeout(() => {
        if (currentRound + 1 < levelConfig.rounds) {
          const nextIndex = currentRound + 1;
          setCurrentRound(nextIndex);
          initRound(nextIndex);
        } else {
          finishGame();
        }
      }, 2500);
    } else {
      playGameSound("wrong");
      wrongCountRef.current += 1;
      const helpfulChoice = scenarios[currentRound].options.find(o => o.isCorrect);

      setFeedback({
        message: getRandomChoiceFeedback("incorrect"),
        type: "incorrect",
        helpfulTip: helpfulChoice?.text
      });

      // Allow retry (reset answered state) after delay
      setTimeout(() => {
        setIsAnswered(false);
        setFeedback({ message: "", type: null });
      }, 3000);
    }
  };

  const finishGame = async () => {
    setGameState("saving");
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
      const finalScore = calculateChoiceScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken,
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });

      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameData.id,
        area: "self_awareness",
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
      console.error("[ChoiceAdventure] Failed to save score:", error);
      setIsSaving(false);
      setSaveError(true);
      setGameState("completed"); // Show retry screen
    }
  };

  if (isLoading) return <LoadingState message="Preparing your adventure..." />;

  if (resultHref) {
    return (
      <CalmCompletionScreen
        onShowResults={() => router.push(resultHref)}
      />
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 flex flex-col pb-20">
      <CalmBackground />

      <ChoiceAdventureHeader
        childId={params.childId}
        score={displayScore}
        level={level}
      />

      <div className="relative z-10 flex-1 flex flex-col">
        {gameState === "start" && (
          <GameIntroScreen
            title="Your Adventure Choice!"
            description="Look at each situation and choose what you would do. You decide the path!"
            level={level}
            levelLabel={levelConfig.rounds + " Scenarios"}
            mascotImage="/images/games/personal-choice.png"
            buttonText="Start My Adventure"
            onStart={startGame}
            onBack={() => router.push(`/games/${params.childId}`)}
            accentColor="rose"
            chips={[
              { icon: "🌈", text: "Make Choices" },
              { icon: "✨", text: "Explore Life" }
            ]}
          />
        )}

        {gameState === "playing" && scenarios.length > 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 sm:gap-12">
            <div className="hidden sm:block">
              <MascotFeedbackBar feedbackType={feedback.type} />
            </div>

            <ScenarioCard
              emoji={scenarios[currentRound].emoji}
              situation={scenarios[currentRound].situation}
              question={scenarios[currentRound].question}
            />

            <div className="w-full space-y-12">
              <ChoiceCardGrid
                options={mixedOptions}
                onSelect={handleSelectChoice}
                disabled={isAnswered}
              />

              <ChoiceProgress
                current={currentRound + 1}
                total={levelConfig.rounds}
              />
            </div>

            <div className="fixed bottom-4 right-4 z-30 flex items-end gap-2 sm:hidden">
              <div className="mb-8 max-w-[180px] rounded-[1.5rem] border border-rose-100 bg-white px-4 py-3 text-center shadow-lg">
                <p className="text-sm font-black leading-snug text-slate-800">{mobileMascotMessage}</p>
              </div>
              <LumiMascot
                state={mobileMascotState}
                size="sm"
                className="items-end"
              />
            </div>
          </div>
        )}

        {gameState === "saving" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <LoadingState message="Saving your wonderful adventure..." />
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 p-12 sm:p-20 shadow-premium text-center space-y-10">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-5xl mx-auto shadow-sm">
                🌟
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 leading-tight">Adventure Complete!</h2>
                {saveError ? (
                  <div className="space-y-6 pt-4">
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                      Great choices today! We're having a little trouble saving your progress right now.
                    </p>
                    <button
                      onClick={handleSaveScore}
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-slate-900 text-white font-black uppercase tracking-widest text-xs shadow-xl hover:bg-slate-800 transition-all"
                    >
                      {isSaving ? "Trying again..." : "Try Saving Again"}
                    </button>
                  </div>
                ) : (
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                    Wonderful choices! We're preparing your result...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
