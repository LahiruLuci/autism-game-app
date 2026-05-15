export interface CountingQuestion {
  id: string;
  emoji: string;
  count: number;
  options: number[];
}

export const COUNTING_EMOJIS = ["🍎", "⭐", "🌸", "🐢", "🌙", "🟦", "🟨", "🦋", "🍓", "🎈", "🧸", "🍪"];

export function generateCountingQuestions(level: number, rounds: number, maxQuantity: number, optionsCount: number): CountingQuestion[] {
  const questions: CountingQuestion[] = [];
  
  for (let i = 0; i < rounds; i++) {
    const count = Math.floor(Math.random() * maxQuantity) + 1;
    const emoji = COUNTING_EMOJIS[Math.floor(Math.random() * COUNTING_EMOJIS.length)];
    
    // Generate unique options including the correct one
    const optionsSet = new Set<number>();
    optionsSet.add(count);
    
    while (optionsSet.size < optionsCount) {
      const wrong = Math.floor(Math.random() * (maxQuantity + 2)) + 1;
      if (wrong !== count && wrong > 0) {
        optionsSet.add(wrong);
      }
    }
    
    questions.push({
      id: `q-${level}-${i}-${Date.now()}`,
      emoji,
      count,
      options: Array.from(optionsSet).sort((a, b) => a - b),
    });
  }
  
  return questions;
}
