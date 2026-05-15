interface ScoringInput {
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: number;
  timePenaltyDivisor: number;
}

export function calculatePatternScore({
  correctAnswers,
  wrongAnswers,
  timeTaken,
  timePenaltyDivisor,
}: ScoringInput): number {
  const timePenalty = timePenaltyDivisor > 0 ? Math.floor(timeTaken / timePenaltyDivisor) : 0;
  
  // final_score = correct_answers * 12 - wrong_answers * 2 - time_penalty
  const rawScore = correctAnswers * 12 - wrongAnswers * 2 - timePenalty;
  
  return Math.max(rawScore, 0);
}
