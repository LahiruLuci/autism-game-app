export type QuestionMode = "COUNT_TO_NUMBER" | "NUMBER_TO_GROUP";

export interface ShapeMatchOption {
  id: string;
  value: number; // The quantity
  isCorrect: boolean;
}

export interface ShapeMatchQuestion {
  id: string;
  mode: QuestionMode;
  emoji: string;
  count: number; // The correct quantity
  options: ShapeMatchOption[];
}

export const SHAPE_EMOJIS = ["🔺", "⭐", "🔵", "🟦", "🟨", "🌸", "🐢", "🌙", "🦋", "🍓"];

export function generateShapeMatchQuestions(level: number, rounds: number, maxQuantity: number, optionsCount: number): ShapeMatchQuestion[] {
  const questions: ShapeMatchQuestion[] = [];
  
  for (let i = 0; i < rounds; i++) {
    const count = Math.floor(Math.random() * maxQuantity) + 1;
    const emoji = SHAPE_EMOJIS[Math.floor(Math.random() * SHAPE_EMOJIS.length)];
    const mode: QuestionMode = Math.random() > 0.5 ? "COUNT_TO_NUMBER" : "NUMBER_TO_GROUP";
    
    const optionsSet = new Set<number>();
    optionsSet.add(count);
    
    while (optionsSet.size < optionsCount) {
      const wrong = Math.floor(Math.random() * (maxQuantity + 2)) + 1;
      if (wrong !== count && wrong > 0) {
        optionsSet.add(wrong);
      }
    }
    
    const shuffledValues = Array.from(optionsSet).sort(() => Math.random() - 0.5);
    const options: ShapeMatchOption[] = shuffledValues.map(v => ({
      id: `opt-${i}-${v}-${Date.now()}`,
      value: v,
      isCorrect: v === count,
    }));
    
    questions.push({
      id: `q-${level}-${i}-${Date.now()}`,
      mode,
      emoji,
      count,
      options,
    });
  }
  
  return questions;
}
