import { EmotionLevelConfig } from "@/types/games/emotion-face-match";

export const EMOTION_FACE_MATCH_LEVELS: Record<number, EmotionLevelConfig> = {
  1: {
    level: 1,
    label: "Beginner",
    rounds: 5,
    emotions: ["happy", "sad"],
    timerEnabled: false,
    answerCount: 2,
    estimatedMinutes: 3,
    timePenaltyDivisor: null,
  },
  2: {
    level: 2,
    label: "Growing",
    rounds: 8,
    emotions: ["happy", "sad", "angry", "surprised"],
    timerEnabled: false,
    answerCount: 4,
    estimatedMinutes: 5,
    timePenaltyDivisor: 45,
  },
  3: {
    level: 3,
    label: "Challenge",
    rounds: 10,
    emotions: ["happy", "sad", "angry", "surprised", "scared"],
    timerEnabled: true,
    answerCount: 5,
    estimatedMinutes: 7,
    timePenaltyDivisor: 30,
  },
};

export function getEmotionFaceMatchLevel(level: number): EmotionLevelConfig {
  return EMOTION_FACE_MATCH_LEVELS[level] || EMOTION_FACE_MATCH_LEVELS[1];
}
