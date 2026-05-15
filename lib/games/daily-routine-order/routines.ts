export interface RoutineStep {
  id: string;
  text: string;
  icon: string;
  order: number;
}

export interface RoutineQuestion {
  id: string;
  level: number;
  title: string;
  steps: RoutineStep[];
}

export const ROUTINE_BANK: RoutineQuestion[] = [
  // LEVEL 1 (3 steps)
  {
    id: "r1-1",
    level: 1,
    title: "Morning Routine",
    steps: [
      { id: "s1", text: "Wake up", icon: "🌞", order: 1 },
      { id: "s2", text: "Brush teeth", icon: "🪥", order: 2 },
      { id: "s3", text: "Eat breakfast", icon: "🍽️", order: 3 },
    ],
  },
  {
    id: "r1-2",
    level: 1,
    title: "Hand Washing",
    steps: [
      { id: "s4", text: "Turn on water", icon: "🚰", order: 1 },
      { id: "s5", text: "Wash hands", icon: "🧼", order: 2 },
      { id: "s6", text: "Dry hands", icon: "🙌", order: 3 },
    ],
  },
  {
    id: "r1-3",
    level: 1,
    title: "Bedtime",
    steps: [
      { id: "s7", text: "Put on pajamas", icon: "👕", order: 1 },
      { id: "s8", text: "Brush teeth", icon: "🪥", order: 2 },
      { id: "s9", text: "Sleep", icon: "🛏️", order: 3 },
    ],
  },
  {
    id: "r1-4",
    level: 1,
    title: "Getting Ready",
    steps: [
      { id: "s10", text: "Wear shoes", icon: "👟", order: 1 },
      { id: "s11", text: "Take bag", icon: "🎒", order: 2 },
      { id: "s12", text: "Go outside", icon: "🚶", order: 3 },
    ],
  },

  // LEVEL 2 (4 steps)
  {
    id: "r2-1",
    level: 2,
    title: "School Morning",
    steps: [
      { id: "s13", text: "Wake up", icon: "🌞", order: 1 },
      { id: "s14", text: "Brush teeth", icon: "🪥", order: 2 },
      { id: "s15", text: "Eat breakfast", icon: "🍽️", order: 3 },
      { id: "s16", text: "Go to school", icon: "🏫", order: 4 },
    ],
  },
  {
    id: "r2-2",
    level: 2,
    title: "Meal Time",
    steps: [
      { id: "s17", text: "Wash hands", icon: "🧼", order: 1 },
      { id: "s18", text: "Sit at table", icon: "🪑", order: 2 },
      { id: "s19", text: "Eat food", icon: "🍱", order: 3 },
      { id: "s20", text: "Clean plate", icon: "🧼", order: 4 },
    ],
  },
  {
    id: "r2-3",
    level: 2,
    title: "After Play",
    steps: [
      { id: "s21", text: "Stop playing", icon: "🛑", order: 1 },
      { id: "s22", text: "Pick up toys", icon: "🧸", order: 2 },
      { id: "s23", text: "Put toys away", icon: "📦", order: 3 },
      { id: "s24", text: "Wash hands", icon: "🧼", order: 4 },
    ],
  },
  {
    id: "r2-4",
    level: 2,
    title: "Going Outside",
    steps: [
      { id: "s25", text: "Wear shoes", icon: "👟", order: 1 },
      { id: "s26", text: "Take water bottle", icon: "🍼", order: 2 },
      { id: "s27", text: "Say goodbye", icon: "👋", order: 3 },
      { id: "s28", text: "Go outside", icon: "🚶", order: 4 },
    ],
  },

  // LEVEL 3 (5 steps)
  {
    id: "r3-1",
    level: 3,
    title: "Full Morning",
    steps: [
      { id: "s29", text: "Wake up", icon: "🌞", order: 1 },
      { id: "s30", text: "Brush teeth", icon: "🪥", order: 2 },
      { id: "s31", text: "Get dressed", icon: "👕", order: 3 },
      { id: "s32", text: "Eat breakfast", icon: "🍽️", order: 4 },
      { id: "s33", text: "Take school bag", icon: "🎒", order: 5 },
    ],
  },
  {
    id: "r3-2",
    level: 3,
    title: "After School",
    steps: [
      { id: "s34", text: "Come home", icon: "🏠", order: 1 },
      { id: "s35", text: "Wash hands", icon: "🧼", order: 2 },
      { id: "s36", text: "Eat snack", icon: "🍎", order: 3 },
      { id: "s37", text: "Do homework", icon: "📝", order: 4 },
      { id: "s38", text: "Play calmly", icon: "🧩", order: 5 },
    ],
  },
];

export function getRoutinesForLevel(level: number, count: number): RoutineQuestion[] {
  const levelQuestions = ROUTINE_BANK.filter((q) => q.level === level);
  return [...levelQuestions].sort(() => Math.random() - 0.5).slice(0, count);
}
