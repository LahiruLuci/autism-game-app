import { EmotionGameResult, EmotionLevelConfig } from "@/types/games/emotion-face-match";

export function calculateEmotionFaceMatchScore(
  levelConfig: EmotionLevelConfig,
  correctAnswers: number,
  wrongAnswers: number,
  timeTaken: number
): EmotionGameResult {
  const timePenalty = levelConfig.timePenaltyDivisor 
    ? Math.floor(timeTaken / levelConfig.timePenaltyDivisor) 
    : 0;

  const finalScore = Math.max(correctAnswers * 10 - wrongAnswers * 3 - timePenalty, 0);
  const totalRounds = levelConfig.rounds;
  const accuracy = Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100) || 0;

  let performanceLevel: EmotionGameResult["performanceLevel"] = "Keep Practicing";
  
  if (accuracy >= 90) performanceLevel = "Excellent";
  else if (accuracy >= 75) performanceLevel = "Great Progress";
  else if (accuracy >= 50) performanceLevel = "Good Practice";

  return {
    finalScore,
    timePenalty,
    accuracy,
    performanceLevel
  };
}
