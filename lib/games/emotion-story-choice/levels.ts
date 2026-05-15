import { StoryLevelConfig } from "@/types/games/emotion-story-choice";

export const EMOTION_STORY_CHOICE_LEVELS: Record<number, StoryLevelConfig> = {
  1: {
    level: 1,
    label: "Beginner",
    rounds: 5,
    emotions: ["happy", "sad"],
    estimatedMinutes: 3,
    timePenaltyDivisor: null,
  },
  2: {
    level: 2,
    label: "Growing",
    rounds: 8,
    emotions: ["happy", "sad", "angry", "surprised"],
    estimatedMinutes: 5,
    timePenaltyDivisor: 45,
  },
  3: {
    level: 3,
    label: "Challenge",
    rounds: 10,
    emotions: ["happy", "sad", "angry", "surprised", "scared"],
    estimatedMinutes: 7,
    timePenaltyDivisor: 30,
  },
};

export function getStoryLevelConfig(level: number): StoryLevelConfig {
  return EMOTION_STORY_CHOICE_LEVELS[level] || EMOTION_STORY_CHOICE_LEVELS[1];
}
