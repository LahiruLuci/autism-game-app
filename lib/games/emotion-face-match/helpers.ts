import { EmotionId, EmotionQuestion, EmotionLevelConfig } from "@/types/games/emotion-face-match";
import { EMOTIONS, getEmotionsByIds } from "./emotions";

export function generateEmotionQuestion(levelConfig: EmotionLevelConfig): EmotionQuestion {
  const availableEmotions = getEmotionsByIds(levelConfig.emotions);
  const targetEmotion = availableEmotions[Math.floor(Math.random() * availableEmotions.length)];
  
  // For this specific game, we usually show all available emotions as options
  return {
    targetEmotion,
    options: availableEmotions
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
