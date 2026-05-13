import { EmotionId, EmotionQuestion, EmotionLevelConfig } from "@/types/games/emotion-face-match";
import { EMOTIONS, getEmotionsByIds } from "./emotions";

export function generateEmotionQuestion(levelConfig: EmotionLevelConfig): EmotionQuestion {
  const availableEmotionIds = levelConfig.emotions;
  const targetEmotionId = availableEmotionIds[Math.floor(Math.random() * availableEmotionIds.length)];
  
  return {
    id: `gen-${Math.random().toString(36).substr(2, 9)}`,
    emotionId: targetEmotionId,
    promptType: "face",
    visual: EMOTIONS[targetEmotionId].emoji,
    correctAnswer: targetEmotionId,
    options: availableEmotionIds,
    instruction: "How does this face feel?"
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
