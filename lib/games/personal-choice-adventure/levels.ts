export interface ChoiceLevel {
  level: number;
  rounds: number;
  optionsPerRound: number;
  timePenaltyDivisor: number;
}

export const CHOICE_LEVELS: Record<number, ChoiceLevel> = {
  1: {
    level: 1,
    rounds: 5,
    optionsPerRound: 2,
    timePenaltyDivisor: 0, // No penalty for level 1
  },
  2: {
    level: 2,
    rounds: 8,
    optionsPerRound: 3,
    timePenaltyDivisor: 60,
  },
  3: {
    level: 3,
    rounds: 10,
    optionsPerRound: 4,
    timePenaltyDivisor: 45,
  },
};

export function getChoiceLevelConfig(level: number): ChoiceLevel {
  return CHOICE_LEVELS[level] || CHOICE_LEVELS[1];
}
