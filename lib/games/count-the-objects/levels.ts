export interface CountingLevel {
  level: number;
  rounds: number;
  maxQuantity: number;
  optionsCount: number;
  timePenaltyDivisor: number;
}

export const COUNTING_LEVELS: Record<number, CountingLevel> = {
  1: {
    level: 1,
    rounds: 5,
    maxQuantity: 5,
    optionsCount: 2,
    timePenaltyDivisor: 0, // No penalty for level 1
  },
  2: {
    level: 2,
    rounds: 8,
    maxQuantity: 10,
    optionsCount: 3,
    timePenaltyDivisor: 60,
  },
  3: {
    level: 3,
    rounds: 10,
    maxQuantity: 15,
    optionsCount: 4,
    timePenaltyDivisor: 45,
  },
};

export function getCountingLevelConfig(level: number): CountingLevel {
  return COUNTING_LEVELS[level] || COUNTING_LEVELS[1];
}
