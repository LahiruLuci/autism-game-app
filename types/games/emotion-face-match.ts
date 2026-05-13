import { GameArea } from "../game";

export type EmotionId = "happy" | "sad" | "angry" | "surprised" | "scared";

export interface Emotion {
  id: EmotionId;
  label: string;
  emoji: string;
  color: string;
  supportiveText: string;
}

export interface EmotionLevelConfig {
  level: number;
  label: string;
  rounds: number;
  emotions: EmotionId[];
  timerEnabled: boolean;
  answerCount: number;
  estimatedMinutes: number;
  timePenaltyDivisor: number | null;
}

export interface EmotionGameConfig {
  gameSlug: string;
  gameName: string;
  area: GameArea;
  description: string;
  supportedLevels: number[];
  defaultLevel: number;
}

export interface EmotionGameResult {
  finalScore: number;
  timePenalty: number;
  accuracy: number;
  performanceLevel: "Excellent" | "Great Progress" | "Good Practice" | "Keep Practicing";
}

export type PromptType = "face" | "situation";

export interface EmotionQuestion {
  id: string;
  emotionId: EmotionId;
  promptType: PromptType;
  visual?: string;
  situation?: string;
  correctAnswer: EmotionId;
  options: EmotionId[];
  instruction: string;
}
