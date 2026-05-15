import { StoryLevelConfig } from "@/types/games/emotion-story-choice";

export function calculateStoryChoiceScore(
  levelConfig: StoryLevelConfig,
  correctAnswers: number,
  wrongAnswers: number,
  timeTaken: number
) {
  const timePenalty = levelConfig.timePenaltyDivisor 
    ? Math.floor(timeTaken / levelConfig.timePenaltyDivisor) 
    : 0;

  const finalScore = Math.max(correctAnswers * 10 - wrongAnswers * 3 - timePenalty, 0);
  const accuracy = Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100) || 0;

  return {
    finalScore,
    timePenalty,
    accuracy,
  };
}

export function shuffleStories<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
