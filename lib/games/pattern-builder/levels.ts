export interface PatternLevelConfig {
  level: number;
  totalRounds: number;
  optionsCount: number;
  hasTimer: boolean;
  timePenaltyDivisor: number;
}

export const PATTERN_LEVELS: Record<number, PatternLevelConfig> = {
  1: {
    level: 1,
    totalRounds: 5,
    optionsCount: 2,
    hasTimer: false,
    timePenaltyDivisor: 0,
  },
  2: {
    level: 2,
    totalRounds: 8,
    optionsCount: 3,
    hasTimer: true,
    timePenaltyDivisor: 60,
  },
  3: {
    level: 3,
    totalRounds: 10,
    optionsCount: 4,
    hasTimer: true,
    timePenaltyDivisor: 45,
  },
};

export function getLevelConfig(level: number): PatternLevelConfig {
  return PATTERN_LEVELS[level] || PATTERN_LEVELS[1];
}
