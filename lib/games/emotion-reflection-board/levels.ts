export interface ReflectionLevel {
  level: number;
  rounds: number;
  emotions: string[]; // Emotions available as options
  timePenaltyDivisor: number;
}

export const REFLECTION_LEVELS: Record<number, ReflectionLevel> = {
  1: {
    level: 1,
    rounds: 5,
    emotions: ["happy", "sad"],
    timePenaltyDivisor: 60,
  },
  2: {
    level: 2,
    rounds: 8,
    emotions: ["happy", "sad", "angry", "surprised"],
    timePenaltyDivisor: 45,
  },
  3: {
    level: 3,
    rounds: 10,
    emotions: ["happy", "sad", "angry", "surprised", "scared", "calm"],
    timePenaltyDivisor: 30,
  },
};

export function getLevelConfig(level: number): ReflectionLevel {
  return REFLECTION_LEVELS[level] || REFLECTION_LEVELS[1];
}
