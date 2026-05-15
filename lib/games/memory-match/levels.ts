export interface MemoryLevelConfig {
  level: number;
  pairsCount: number;
  gridCols: number;
  hasTimer: boolean;
  timePenaltyDivisor: number;
  icons: string[];
}

export const MEMORY_LEVELS: Record<number, MemoryLevelConfig> = {
  1: {
    level: 1,
    pairsCount: 2,
    gridCols: 2,
    hasTimer: false,
    timePenaltyDivisor: 0,
    icons: ["⭐", "🌙"],
  },
  2: {
    level: 2,
    pairsCount: 4,
    gridCols: 2, // 2x4 or 4x2
    hasTimer: true,
    timePenaltyDivisor: 60,
    icons: ["⭐", "🌙", "🌸", "🐢"],
  },
  3: {
    level: 3,
    pairsCount: 6,
    gridCols: 3, // 3x4 or 4x3
    hasTimer: true,
    timePenaltyDivisor: 45,
    icons: ["⭐", "🌙", "🌸", "🐢", "🍎", "🦋"],
  },
};

export function getLevelConfig(level: number): MemoryLevelConfig {
  return MEMORY_LEVELS[level] || MEMORY_LEVELS[1];
}
