export interface RoutineLevelConfig {
  level: number;
  totalRounds: number;
  stepsPerRoutine: number;
  hasTimer: boolean;
  timePenaltyDivisor: number;
}

export const ROUTINE_LEVELS: Record<number, RoutineLevelConfig> = {
  1: {
    level: 1,
    totalRounds: 4,
    stepsPerRoutine: 3,
    hasTimer: false,
    timePenaltyDivisor: 0,
  },
  2: {
    level: 2,
    totalRounds: 5,
    stepsPerRoutine: 4,
    hasTimer: true,
    timePenaltyDivisor: 60,
  },
  3: {
    level: 3,
    totalRounds: 6,
    stepsPerRoutine: 5,
    hasTimer: true,
    timePenaltyDivisor: 45,
  },
};

export function getLevelConfig(level: number): RoutineLevelConfig {
  return ROUTINE_LEVELS[level] || ROUTINE_LEVELS[1];
}
