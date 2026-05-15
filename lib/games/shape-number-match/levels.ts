export interface ShapeMatchLevel {
  level: number;
  rounds: number;
  maxQuantity: number;
  optionsCount: number;
  timePenaltyDivisor: number;
}

export const SHAPE_MATCH_LEVELS: Record<number, ShapeMatchLevel> = {
  1: {
    level: 1,
    rounds: 5,
    maxQuantity: 5,
    optionsCount: 2,
    timePenaltyDivisor: 0,
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

export function getShapeMatchLevelConfig(level: number): ShapeMatchLevel {
  return SHAPE_MATCH_LEVELS[level] || SHAPE_MATCH_LEVELS[1];
}
