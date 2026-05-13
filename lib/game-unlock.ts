import { Game, GameWithUnlockState } from "@/types/game";
import { AssessmentResult } from "@/types/survey";

export function isGameDevModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_GAME_DEV_MODE === "true";
}

export function isGameUnlocked(
  game: Game,
  assessment: AssessmentResult | null
): { isUnlocked: boolean; message?: string } {
  // 1. Dev mode check
  if (isGameDevModeEnabled()) {
    return { isUnlocked: true, message: "Unlocked for testing" };
  }

  // 2. No assessment check
  if (!assessment) {
    return { isUnlocked: false, message: "Complete survey to unlock" };
  }

  // 3. Area-wise unlock logic (if fields exist)
  const areaLevel = getGameLevelForArea(game.area, assessment);
  
  if (game.level <= areaLevel) {
    return { isUnlocked: true };
  }

  return { 
    isUnlocked: false, 
    message: `Unlocks at Level ${game.level}` 
  };
}

export function getGameLevelForArea(
  gameArea: string,
  assessment: AssessmentResult | null
): number {
  if (!assessment) return 0;

  // Check if area-specific levels exist in the assessment (Step 2 feature)
  switch (gameArea) {
    case "emotion":
      return assessment.emotion_level ?? assessment.predicted_level;
    case "cognitive":
      return assessment.cognitive_level ?? assessment.predicted_level;
    case "self_awareness":
      return assessment.self_awareness_level ?? assessment.predicted_level;
    case "mathematical":
      return assessment.math_level ?? assessment.predicted_level;
    default:
      return assessment.predicted_level;
  }
}
