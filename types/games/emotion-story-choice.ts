import { GameArea } from "../game";
import { EmotionId } from "./emotion-face-match";

export interface Story {
  id: string;
  level: number;
  situation: string;
  illustration: string;
  correctEmotion: EmotionId;
  options: EmotionId[];
  supportiveHint: string;
}

export interface StoryLevelConfig {
  level: number;
  label: string;
  rounds: number;
  emotions: EmotionId[];
  estimatedMinutes: number;
  timePenaltyDivisor: number | null;
}

export interface StoryGameConfig {
  gameSlug: string;
  gameName: string;
  area: GameArea;
  description: string;
  supportedLevels: number[];
  defaultLevel: number;
}
